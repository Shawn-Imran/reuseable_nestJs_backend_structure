import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/User.model';
import { ConfigModule } from '@nestjs/config';
import { ApiResponseMiddleware } from './config/middleware/apiResponse.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql'
      host: 'localhost',
      port: 5432, // or 3306 for MySQL
      username: 'postgres',
      password: 'admin',
      database: 'test_db',
      entities: [User],
      synchronize: true, // Only for development. Use migrations for production.
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiResponseMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}
