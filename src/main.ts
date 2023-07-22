import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'isomorphic-fetch';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Use Swagger to generate API documentation
	const options = new DocumentBuilder()
		.setTitle('Ai-Server example')
		.setDescription('The Ai-Server API description')
		.setVersion('1.0')
		.addTag('ai-server')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	await app.listen(3030);
}
bootstrap();
