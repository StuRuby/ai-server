import { Logger, Injectable, Inject } from '@nestjs/common';
import { z } from 'zod';

import { ConfluencePagesLoader, ConfluencePagesLoaderParams } from 'langchain/document_loaders/web/confluence';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { StructuredOutputParser } from 'langchain/output_parsers';

import { SupabaseService } from '../../shared/service/supabase.service';

import { DocDTO } from './dto';

@Injectable()
export class DocService {
	@Inject() supabaseService: SupabaseService;

	private readonly logger = new Logger(DocService.name);

	private readonly openAiEmbeddings = new OpenAIEmbeddings(
		{
			openAIApiKey: process.env.OPENAI_API_KEY
		},
		{
			basePath: process.env.OPENAI_PROXY_URL
		}
	);

	/**
	 * 像文档提问
	 * @param question 
	 * @returns 
	 */
	async chatDoc(question: string) {
		const chatModel = await this.createOpenAiChatModel();
		const store = new SupabaseVectorStore(this.openAiEmbeddings, {
			client: this.supabaseService.supabase,
			tableName: 'documents',
			queryName: 'query_match_documents'
		});
		const formatInstructions = this.setFormatInstructions();
		const prompt = new PromptTemplate({
			template: "Answer the users question as best as possible.\n{format_instructions}\n{question}",
			inputVariables: ["question"],
			partialVariables: {
				format_instructions: formatInstructions
			}
		});

		const input = await prompt.format({
			question: question,
		});



		const chain = RetrievalQAChain.fromLLM(chatModel, store.asRetriever(5), {
			prompt,
			returnSourceDocuments: true
		});

		const response = await chain.call({
			query: question
		});

		return {
			...response,
			input
		};
	}
	/**
	 * 查询相似的向量
	 * PostgREST不支持`pgvector`相似性运算符，所以把它封装成了一个函数，并通过rpc进行调用
	 * @param params 
	 */
	async queryEmbeddings(params: { query: string; count: number }) {
		const { query, count } = params;
		const supabase = this.supabaseService.supabase;

		// Use rpc call to query similarity
		// const queryEmbeddings = await this.openAiEmbeddings.embedQuery(query);
		// const { data, error } = await supabase.rpc('query_match_documents', {
		// 	query_embedding: queryEmbeddings, // Pass the embedding you want to compare
		// 	match_threshold: threshold, // Choose an appropriate threshold for your data
		// 	match_count: count
		// });

		// Use SupabaseVectorStore to query similarity
		const store = new SupabaseVectorStore(this.openAiEmbeddings, {
			client: supabase,
			tableName: 'documents',
			queryName: 'query_match_documents'
		});

		const data = await store.similaritySearch(query, count);
		return data;
	}

	/**
	 * 加载Confluence页面
	 * @param params 
	 * @returns 
	 */
	async loadConfluencePages(params: ConfluencePagesLoaderParams) {
		const { username, spaceKey, accessToken, baseUrl } = params;
		const loader = new ConfluencePagesLoader({
			baseUrl,
			spaceKey,
			username,
			accessToken
		});
		return await loader.load();
	}
	/**
	 * 创建OpenAI Chat模型
	 * @returns 
	 */
	async createOpenAiChatModel() {
		const model = new ChatOpenAI(
			{
				modelName: 'gpt-3.5-turbo-16k',
				temperature: 0.5,
				openAIApiKey: process.env.OPENAI_API_KEY
			},
			{
				basePath: process.env.OPENAI_PROXY_URL
			}
		);
		return model;
	}
	/**
	 * 进行文档embedding操作
	 * @param docRepoId 
	 * @returns 
	 */
	async embedDocuments(docRepoId: number) {
		const supabase = this.supabaseService.supabase;
		const docs = await this.loadConfluencePages({
			baseUrl: process.env.CONFLUENCE_URL,
			spaceKey: process.env.CONFLUENCE_SPACE_KEY,
			username: process.env.CONFLUENCE_USERNAME,
			accessToken: process.env.CONFLUENCE_TOKEN
		});
		const textSplitter = new RecursiveCharacterTextSplitter({
			chunkSize: 2000,
			chunkOverlap: 0
		});

		const chunks = await textSplitter.splitDocuments(docs);
		const embeddings = this.openAiEmbeddings;

		const pageContents = chunks.map((chunk) => chunk.pageContent);
		const embedDocuments = await embeddings.embedDocuments(pageContents);
		const insertDocs: DocDTO[] = [];

		for (let i = 0; i < chunks.length; i++) {
			const chunk = chunks[i];
			const { pageContent, metadata } = chunk;
			const { title } = metadata;
			const insertDoc: DocDTO = {
				name: title,
				content: pageContent,
				metaData: metadata as JSON,
				embedding: embedDocuments[i],
				docRepoId,
				createdAt: new Date()
			};
			insertDocs.push(insertDoc);
		}

		const { error, data } = await supabase.from('documents').insert(insertDocs);
		if (error) {
			this.logger.error('Error inserting documents:', error);
			throw new Error(error.message);
		}
		return data;
	}

	/**
	 * 设置输出格式
	 */
	setFormatInstructions() { 
		const zodSchema = z.object({
			apiName: z.string().describe('The name of the API'),
			method: z.string().describe('The HTTP method of the API'),
			path: z.string().describe('The path of the API'),
			description: z.string().describe('The description of the API'),
			request: z.unknown().describe('The structure of request params or request body for an API,the format is in JSON SCHEMA.But I\'m not sure what the final, specific real-world structure would look like. Based on your understanding and the information you can find from the documentation,complete it FULLY'),
			response: z.unknown().describe('The structure of response data for an API,the format is in JSON SCHEMA.But I\'m not sure what the final, specific real-world structure would look like. Based on your understanding and the information you can find from the documentation,complete it FULLY')
		});

		const parser = StructuredOutputParser.fromZodSchema(zodSchema);
		const formatInstructions = parser.getFormatInstructions();
		return formatInstructions;
	}
}