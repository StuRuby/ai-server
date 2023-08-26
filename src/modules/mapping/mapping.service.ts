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
  async saveStandardApi(schema: JSON) {
    const apiList = await this.flattenSchema(schema);
    const supabase = this.supabaseService.supabase;
    const { data, error } = await supabase.from('standardModel').insert(apiList);
    if (error) {
      this.logger.error(error);
      return { error };
    }
    return data;
  }

  /**
   * 对供应商api进行处理，并存储到数据库中
   */
  async saveMappingApi(schema: JSON) {
    const apiList = await this.flattenSchema(schema);
    const supabase = this.supabaseService.supabase;
    const { data, error } = await supabase.from('mappingModel').insert(apiList);
    if (error) {
      this.logger.error(error);
      return { error };
    }
    return data;
  }

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
        const isRequired = schema.required && schema.required.includes(key);
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
}
