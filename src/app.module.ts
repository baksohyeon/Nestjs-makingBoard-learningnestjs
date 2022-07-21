import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { BoardsModule } from './boards/boards.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.LOCAL_DATABASE_USERNAME,
      password: process.env.LOCAL_DATABASE_PASSWORD,
      database: 'nest_db',
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      synchronize: true,
    }),
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
// TypeOrmModule.forRoot(typeORMConfig)
