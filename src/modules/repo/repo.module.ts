import { Module } from '@nestjs/common';

import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
	imports: [ SharedModule ],
	controllers: [ RepoController ],
	providers: [ RepoService ]
})
export class RepoModule {}
