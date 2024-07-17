import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth/auth.module';
import { UserModule } from './auth/user/user.module';
import { User } from './auth/user/entities/User.model';

@Module({
  imports: [
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
export class AppModule {}
