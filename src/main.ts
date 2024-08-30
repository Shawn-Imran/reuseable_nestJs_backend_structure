import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PlatformMiddleware } from './common/middlewares/platform.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new PlatformMiddleware().use);
  await app.listen(3000);
}
bootstrap();
