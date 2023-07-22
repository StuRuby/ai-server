import { Controller, Get, Post, Inject, Body } from '@nestjs/common';

import { RepoService } from './repo.service';
import { CreateRepoDTO } from './dto';

@Controller('/repos')
export class RepoController {
	@Inject() repoService: RepoService;

	@Get('/')
	async getRepos() {}

	@Post('/')
	async uploadRepo(@Body() body: CreateRepoDTO) {
		const { url, name } = body;
		return await this.repoService.uploadRepo({ name, url });
	}
}
