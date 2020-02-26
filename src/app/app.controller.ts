/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： APP控制器
 * @CREATE Sunday, 23rd February 2020 1:19:39 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * APP控制器
 */
@Controller()
export class AppController {

  /**
   * @param appService APP服務
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Hello World範例
   *
   * @method public
   * @return 回傳Hello World
   */
  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

}
