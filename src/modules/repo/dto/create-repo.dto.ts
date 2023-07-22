import { ApiProperty } from '@nestjs/swagger';

export class CreateRepoDTO {
	@ApiProperty({
		description: 'The name of the repo'
	})
	name: string;

	@ApiProperty({
		description: 'The url of the repo'
	})
	url: string;
}
