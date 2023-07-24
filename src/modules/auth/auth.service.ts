import { Inject, Injectable, Logger } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { SupabaseService } from '../../shared/service/supabase.service';

@Injectable()
export class AuthService {
	@Inject() userService: UserService;
	@Inject() supabaseService: SupabaseService;
  private readonly logger = new Logger(AuthService.name);
  
	async signIn(email: string, pwd: string) {
    const supabase = this.supabaseService.supabase;
    return supabase.auth.signInWithPassword({
      email,
      password: pwd
    })
  }
  
  async signUp(email: string, pwd: string) { 
    const supabase = this.supabaseService.supabase;
    const { data,error } = await supabase.auth.signUp({
      email,
      password: pwd
    });
    if (error) { 
      throw new Error(error.message);
    }
    return data;
  }
}
