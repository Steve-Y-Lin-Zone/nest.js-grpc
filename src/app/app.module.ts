/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： APP Module
 * @CREATE Sunday, 23rd February 2020 1:19:39 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { HeroModule } from './database/hero/hero.module';
import { SharedModule } from './shared/shared.module';

/**
 * APP Module
 */
@Module({
  imports: [
    DatabaseModule,
    HeroModule,
    ...SharedModule.forRoot('configs/app.env'),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
