import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { connectRedis } from './redis/redis.client';
import { registerInfoRequestListener } from './listeners/solicitud-info.listener';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule);

  await connectRedis();
  await registerInfoRequestListener();

  const config = new DocumentBuilder()
    .setTitle('Notifications Service')
    .setDescription('API documentations for the notifications service used for the CFI app')
    .setVersion('1.0')
    //.addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 5003);
  logger.log(`Server is running on port ${process.env.PORT}`);
}
bootstrap();
