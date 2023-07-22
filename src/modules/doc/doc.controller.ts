import { Controller, Get, Inject, Post, Body, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { DocService } from './doc.service';
import { EmbedDocDTO } from './dto';

@Controller('/doc')
export class DocController {
	@Inject() docService: DocService;

	@ApiQuery({ name: 'question', type: 'string' })
	@Get('/chat')
	async chatDoc(@Query('question') question: string) {
		return await this.docService.chatDoc(question);
	}

	@Post('/embeddings')
	async embedRepo(@Body() body: EmbedDocDTO) {
		const { docRepoId } = body;
		return await this.docService.embedDocuments(docRepoId);
	}
}
