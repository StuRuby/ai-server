import { Module } from '@nestjs/common';

import { MappingController } from './mapping.controller';
import { MappingService } from './mapping.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [MappingController],
  providers: [MappingService],
})
export class MappingModule {}
