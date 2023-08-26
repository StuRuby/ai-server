import { ApiProperty } from '@nestjs/swagger';

export class ApiSchemaDTO {
  @ApiProperty({
    description: 'The full schema of the api',
  })
  schema: string;
}

export class ApiModelItemDTO {
  @ApiProperty({
    description: 'The name of the api',
  })
  name: string;

  @ApiProperty({
    description: 'The full name of the api',
  })
  fullName: string;

  @ApiProperty({
    description:
      'The type of the api, such as "string", "number", "boolean", "object", "array"',
  })
  type: string;

  @ApiProperty({
    description: 'It is required or not',
  })
  isRequired: boolean;

  @ApiProperty({
    description: 'The description of the api,explain the api',
  })
  description: string;

  @ApiProperty({
    description: 'The tips of the api, explain the api',
  })
  tips: string;

  @ApiProperty({
    description: 'The embedding of the api',
  })
  embedding: number[];
}
