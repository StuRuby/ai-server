import { Logger, Injectable } from '@nestjs/common';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
	supabase: SupabaseClient;
	logger: Logger;
	constructor() {
		this.logger = new Logger(SupabaseService.name);
		this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
	}
}
