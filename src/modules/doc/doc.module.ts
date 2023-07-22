import { Module } from '@nestjs/common';

import { DocController } from './doc.controller';
import { DocService } from './doc.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
	imports: [ SharedModule ],
	controllers: [ DocController ],
	providers: [ DocService ]
})
export class DocModule {}
