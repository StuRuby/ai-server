import { Module } from '@nestjs/common';

import { PrismaService } from './service/prisma.service';
import { SupabaseService } from './service/supabase.service';

@Module({
	imports: [],
	controllers: [],
	providers: [PrismaService, SupabaseService],
	exports: [PrismaService, SupabaseService]
})
export class SharedModule {}
