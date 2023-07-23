import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	private readonly users = [
		{
			userId: 1,
			email: '937931249@qq.com',
			password: 'changeme'
		},
		{
			userId: 2,
			email: '937931248@qq.com',
			password: 'guess'
		}
	];

	async findUser(email: string): Promise<User | undefined> {
		return await this.users.find((user) => user.email === email);
	}
}

type User = {
	userId: number;
	email: string;
	password: string;
};
