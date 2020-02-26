/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： 程式進入點
 * @CREATE Sunday, 23rd February 2020 1:19:39 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/common/enums/transport.enum';

import { AppModule } from './app/app.module';

/**
 * 啟動程式
 */
async function bootstrap() {

  // 建立APP
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn'],
  });

  // 連接特定gRPC微服務
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:3001',
      package: ['hero'],
      protoPath: ['protobuf/hero.proto'],
    },
  });

  // 等待所有微服務啟動
  await app.startAllMicroservicesAsync();

  app.listen(3000);
}

// 啟動程式
bootstrap();
