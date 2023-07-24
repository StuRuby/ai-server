import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseGuard } from './supabase.guard';
import { SupabaseStrategy } from './supabase.strategy';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
	imports: [
		SharedModule,
		UserModule,
		PassportModule
		// JwtModule.register({
		// 	global: true,
		// 	secret: process.env.JWT_CONSTANTS,
		// 	signOptions: { expiresIn: '60s' }
		// })
	],
	controllers: [ AuthController ],
	providers: [
		AuthService,
		SupabaseStrategy,
		{
			provide: APP_GUARD,
			useClass: SupabaseGuard
		}
	],
	exports: [ AuthService, SupabaseStrategy ]
})
export class AuthModule {}
