import { ApiProperty } from '@nestjs/swagger';

export class DocDTO {
	@ApiProperty({
		description: 'The id of the doc'
	})
	id?: number;

	@ApiProperty({
		description: 'The name of the doc'
	})
	name: string;

	@ApiProperty({
		description: 'The content of the doc'
	})
	content: string;

	@ApiProperty({
		description: 'The metadata of the doc'
	})
	metaData: JSON;

	@ApiProperty({
		description: 'The embedding of the doc'
	})
	embedding?: number[];

	@ApiProperty({
		description: 'The repoId of the doc belongs to'
	})
	docRepoId: number;

	@ApiProperty({
		description: 'The created time of the doc'
	})
	createdAt?: Date;

	@ApiProperty({
		description: 'The updated time of the doc'
	})
	updatedAt?: Date;

	@ApiProperty({
		description: 'The deleted time of the doc'
	})
	deletedAt?: Date;
}

export class EmbedDocDTO {
	@ApiProperty({
		description: 'The docRepoId of the doc belongs to'
	})
	docRepoId: number;
}
