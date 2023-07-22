import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { DocModule } from './modules/doc/doc.module';
import { RepoModule } from './modules/repo/repo.module';

@Module({
	imports: [ SharedModule, DocModule, RepoModule ],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
