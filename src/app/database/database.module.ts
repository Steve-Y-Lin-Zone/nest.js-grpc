/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： 資料庫Module
 * @CREATE Monday, 24th February 2020 9:34:20 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hero } from './hero/hero.entity';

/**
 * 資料庫Module
 */
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'configs/app.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mariadb',
          name: 'app-connection',
          host: configService.get('MARIADB_HOST'),
          port: configService.get('MARIADB_PORT'),
          username: configService.get('MARIADB_USERNAME'),
          password: configService.get('MARIADB_PASSWORD'),
          database: configService.get('MARIADB_DATABASE'),
          entities: [Hero],
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
