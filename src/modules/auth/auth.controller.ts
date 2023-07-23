import { Controller, Post, Body, HttpCode, HttpStatus, Inject } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './auth.utils';
import { SignInDTO, SignUpDTO } from './dto';

@Controller('/auth')
export class AuthController {
	@Inject() authService: AuthService;

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(@Body() signInDto: SignInDTO) {
		const { email, password } = signInDto;
		return await this.authService.signIn(email, password);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('register')
  async signUp(@Body() signUpDto: SignUpDTO) {
		const { email, password } = signUpDto;
    return await this.authService.signUp(email, password);
  }
}
