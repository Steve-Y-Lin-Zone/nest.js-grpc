/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： APP服務
 * @CREATE Sunday, 23rd February 2020 1:19:39 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Injectable } from '@nestjs/common';

/**
 * APP服務
 */
@Injectable()
export class AppService {

  /**
   * Hello World範例
   *
   * @method public
   * @return 回傳Hello World
   */
  public getHello(): string {
    return 'Hello World!';
  }

}
