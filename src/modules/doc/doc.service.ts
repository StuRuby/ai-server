import { Logger, Injectable, Inject } from '@nestjs/common';

import { ConfluencePagesLoader, ConfluencePagesLoaderParams } from 'langchain/document_loaders/web/confluence';
import { OpenAI } from 'langchain/llms/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';

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
		return await this.queryEmbeddings({
			query: question,
			count: 10,
			threshold: 0.78
		});
	}
	/**
	 * 查询相似的向量
	 * PostgREST不支持`pgvector`相似性运算符，所以把它封装成了一个函数，并通过rpc进行调用
	 * @param params 
	 */
	async queryEmbeddings(params: { query: string; count: number; threshold: number }) {
		const { query, count, threshold } = params;
		const supabase = this.supabaseService.supabase;

		// Use rpc call to query similarity
		const queryEmbeddings = await this.openAiEmbeddings.embedQuery(query);
		const { data, error } = await supabase.rpc('query_match_documents', {
			query_embedding: queryEmbeddings, // Pass the embedding you want to compare
			match_threshold: threshold, // Choose an appropriate threshold for your data
			match_count: count
		});

		if (error) {
			throw new Error(error.message);
		}
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
	 * 创建OpenAI模型
	 * @returns 
	 */
	async createOpenAiModel() {
		const model = new OpenAI({
			modelName: 'Jedi-AI',
			temperature: 0.5,
			openAIApiKey: process.env.OPENAI_API_KEY
		});
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

		const {error,data  } = await supabase.from('documents').insert(insertDocs);
		if (error) {
			this.logger.error('Error inserting documents:', error);
			throw new Error(error.message);
		}
		return data;
	}
}
