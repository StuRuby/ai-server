import { Injectable, Logger, Inject } from '@nestjs/common';

import { SupabaseService } from '../../shared/service/supabase.service';
import { CreateRepoDTO } from './dto';

@Injectable()
export class RepoService {
	@Inject() supabaseService: SupabaseService;
	private readonly logger = new Logger(RepoService.name);
	async uploadRepo(params?: CreateRepoDTO) {
		const supabase = this.supabaseService.supabase;
		const { data, error } = await supabase
			.from('docrepo')
			.insert({
				...params,
				createdAt: new Date()
			})
			.single();
		if (error) {
			this.logger.error(error);
			return { error };
		}
		return data;
	}
}
