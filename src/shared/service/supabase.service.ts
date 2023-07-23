import { Logger, Injectable } from '@nestjs/common';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
	private readonly logger: Logger = new Logger(SupabaseService.name);
	supabase: SupabaseClient;
	constructor() {
		this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
	}
}
