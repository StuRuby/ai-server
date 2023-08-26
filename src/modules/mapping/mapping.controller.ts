import { Controller, Post, Get, Body, Query, Inject } from '@nestjs/common';

import { MappingService } from './mapping.service';

import { ApiSchemaDTO } from './dto/api-schema.dto';

@Controller('/mapping')
export class MappingController {
  @Inject()
  mappingService: MappingService;

  @Post('/standard-api/save')
  async saveStandardApi(@Body() body: ApiSchemaDTO) {
    return await this.mappingService.saveStandardApi(JSON.parse(body.schema));
  }

  @Post('/mapping-api/save')
  saveMappingApi(@Body() body: ApiSchemaDTO) {}
}
