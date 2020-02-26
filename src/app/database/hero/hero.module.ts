/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： 英雄Module
 * @CREATE Sunday, 23rd February 2020 3:58:03 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hero } from './hero.entity';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';

/**
 * 英雄Module
 */
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Hero]),
  ],
  controllers: [
    HeroController,
  ],
  providers: [
    HeroService,
  ],
  exports: [
    HeroModule,
  ],
})
export class HeroModule {}
