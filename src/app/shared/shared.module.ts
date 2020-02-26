/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： 共享Module
 * @CREATE Sunday, 23rd February 2020 1:52:37 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ConfigModule } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common/interfaces';
import { Module } from '@nestjs/common';

/**
 * 共享Module
 */
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class SharedModule {

  /**
   * 預先載入
   *
   * @method public
   * @param envFilePath 設定檔路徑
   * @return 回傳Module import資料格式
   */
  public static forRoot(envFilePath?: string): DynamicModule[] {
    return [
      ConfigModule.forRoot({ envFilePath }),
    ];
  }

}
