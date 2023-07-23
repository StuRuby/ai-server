import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { DocModule } from './modules/doc/doc.module';
import { RepoModule } from './modules/repo/repo.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [ SharedModule, DocModule, RepoModule, AuthModule, UserModule ],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
