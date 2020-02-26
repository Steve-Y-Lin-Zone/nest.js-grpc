/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： 英雄控制器
 * @CREATE Sunday, 23rd February 2020 2:07:37 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Crud, CrudController } from '@nestjsx/crud';
import { Controller, Logger, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { hero } from './hero';
import { Hero } from './hero.entity';
import { HeroService } from './hero.service';

/**
 * 英雄控制器
 *
 * @param logger LOG紀錄
 */
@Crud({
  model: { type: Hero },
})
@Controller('heros')
export class HeroController implements CrudController<Hero> {

  private readonly logger = new Logger(HeroController.name);

  /**
   * @param configService 設定檔載入服務
   * @param service   英雄服務
   */
  constructor(
    private readonly configService: ConfigService,
    public readonly service: HeroService,
  ) {}

  /**
   * 新增英雄
   *
   * @method public
   * @param heros 英雄資料
   * @return 回傳一個Promise，讓呼叫者可以新增英雄
   */
  @GrpcStreamMethod('HeroService', 'Insert')
  public insert(heros: Observable<hero.Hero>): Promise<hero.Heros> {
    return this.service.insert(heros);
  }

  /**
   * 查詢特定英雄透過英雄編號
   *
   * @method public
   * @param heroById 英雄編號
   * @return 回傳特定英雄
   */
  @GrpcMethod('HeroService', 'FindById')
  public findOne(heroById: hero.HeroById): Promise<hero.Hero> {
    return this.service.findById(heroById);
  }

  /**
   * 英雄發動攻擊
   *
   * @method pubilc
   * @param heroById 英雄編號
   * @return 回傳一個Observable，讓呼叫者可以取得英雄攻擊招式資訊
   */
  @GrpcMethod('HeroService', 'Attack')
  public attack(heroById: hero.HeroById): Observable<hero.HeroAttack> {
    return this.service.attack(heroById);
  }

  /**
   * 英雄打招呼
   *
   * @method public
   * @param greetSub 招呼訊息佇列
   * @return 回傳一個Promise，讓呼叫者可以蒐集英雄的招呼訊息並回傳
   */
  @GrpcStreamMethod('HeroService', 'Greet')
  public async greet(
    greetSub: Observable<hero.HeroGreeting>,
  ): Promise<hero.HeroGreetingGroup> {
    return await this.service.greet(greetSub);
  }

  /**
   * 英雄戰鬥
   *
   * @method public
   * @param heroAttack 英雄攻擊參數
   * @return 回傳一個Observable，讓呼叫者可以取得英雄所受的傷害
   */
  @GrpcStreamMethod('HeroService', 'Combat')
  public combat(
    heroAttack: Observable<hero.HeroAttack>,
  ): Observable<hero.HeroInjured> {
    return this.service.combat(heroAttack);
  }

}
