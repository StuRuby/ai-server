import { Injectable, Logger, Inject } from '@nestjs/common';

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

import { SupabaseService } from '../../shared/service/supabase.service';

import { ApiModelItemDTO } from './dto';

@Injectable()
export class MappingService {
  @Inject() supabaseService: SupabaseService;
  private readonly logger = new Logger(MappingService.name);

  private readonly openAiEmbeddings = new OpenAIEmbeddings(
    {
      openAIApiKey: process.env.OPENAI_API_KEY,
    },
    {
      basePath: process.env.OPENAI_PROXY_URL,
    },
  );

  /**
   * 对标准api进行处理，并存储到数据库中
   */
  async saveStandardApi(schema: Record<string,any>) {
    const apiList = await this.flattenSchema(schema);
    const supabase = this.supabaseService.supabase;
    const { data, error } = await supabase
      .from('standardmodel')
      .insert(apiList);
    if (error) {
      this.logger.error(error);
      return { error };
    }
    return data;
  }

  /**
   * 对供应商api进行处理，并存储到数据库中
   */
  async saveMappingApi(schema: Record<string,any>) {
    const apiList = await this.flattenSchema(schema);
    const supabase = this.supabaseService.supabase;
    const { data, error } = await supabase.from('mappingmodel').insert(apiList);
    if (error) {
      this.logger.error(error);
      return { error };
    }
    return data;
  }

  /**
   * 将api schema进行扁平化处理，方便存储
   * @param schema
   * @param parentKey
   * @param result
   * @returns
   */
  async flattenSchema(schema, parentKey = '', result = []) {
    for (const key in schema.properties) {
      const property = schema.properties[key];
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      if (property.type === 'object') {
        this.flattenSchema(property, currentKey, result);
      } else if (
        property.type === 'array' &&
        property.items &&
        property.items.type === 'object'
      ) {
        this.flattenSchema(property.items, `${currentKey}.[]`, result);
      } else {
        const name = currentKey.split('.').pop();
        const fullName = currentKey;
        const type = property.type;
        const isRequired = schema.required && schema.required.includes(key) || false ;
        const description = property.description || '';
        const tips = '';

        const item = {
          name,
          fullName,
          type,
          isRequired,
          description,
          tips,
          embedding: [],
        };
        result.push(item);
      }
    }

    // Embedding 之后，分别插到各个item中
    const embeddings = this.openAiEmbeddings;

    const messages = result.map(
      (item) => `这条记录包含以下关键信息:
    name: ${item.name},
    fullName: ${item.fullName},
    type: ${item.type},
    description: ${item.description},
  `,
    );

    const embeddingsResult = await embeddings.embedDocuments(messages);

    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      item.embedding = embeddingsResult[i];
    }

    return result;
  }

  /**
   * 批量匹配，依据相似度
   */
  async bulkMapping() {
    const supabase = this.supabaseService.supabase;
    const resp = await supabase.from('standardmodel').select('*');
    const standardList = resp.data as ApiModelItemDTO[];

    // const result = [];

    // for (let i = 0; i < standardList.length; i++) { 
    //   const item = standardList[i];
    //   const { data } = await this.matchRecord(item);
    //   const mappingResult = data[0];
    //   const ans = {
    //     fullName: item.fullName,
    //     mappingFullName: mappingResult.fullname,
    //     score: mappingResult.similarity,
    //   };
    //   result.push(ans);
    // }

    const result = await this.bulkMatchRecord(standardList);


    return result;
  }

  async bulkMatchRecord(list: ApiModelItemDTO[]) { 
    const query_embeddings = list.map((item) => item.embedding);
    const supabase = this.supabaseService.supabase;
    const ans = await supabase.rpc('bulk_match_records', {
      query_embeddings: query_embeddings,
      match_threshold: 0.78, // Choose an appropriate threshold for your data
      match_count: list.length,
    });
    // return ans;
    const result = [];
    for (let i = 0; i < list.length; i++) { 
      const item = list[i];
      result.push({
        fullName: item.fullName,
        mappingFullName: ans.data[i].fullname,
        score: ans.data[i].similarity,
      })
    }
    return result;
  }


  async matchRecord(item: ApiModelItemDTO) { 
    const supabase = this.supabaseService.supabase;
    const ans = await supabase.rpc('match_records', {
      query_embedding: item.embedding, // Pass the embedding you want to compare
      match_threshold: 0.78, // Choose an appropriate threshold for your data
      match_count: 1,
    });
    return ans;
  }

  

}
