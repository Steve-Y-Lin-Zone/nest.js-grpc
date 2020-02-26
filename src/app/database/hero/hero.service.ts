/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： 英雄服務
 * @CREATE Sunday, 23rd February 2020 3:48:11 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, Subject } from 'rxjs';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { hero } from './hero';
import { Hero } from './hero.entity';

/**
 * 英雄服務
 *
 * @param logger LOG紀錄
 */
@Injectable()
export class HeroService extends TypeOrmCrudService<Hero> {

  private readonly logger = new Logger(HeroService.name);

  /**
   * @param repo 英雄實體庫
   */
  constructor(@InjectRepository(Hero) public readonly repo: Repository<Hero>) {
    super(repo);
  }

  /**
   * 新增英雄
   *
   * @method public
   * @param heros 英雄資料
   * @return 回傳一個Promise，讓呼叫者可以新增英雄
   */
  public insert(heros: Observable<hero.Hero>): Promise<hero.Heros> {
    return new Promise<hero.Heros>(resolve => {
      const heroList: hero.Heros = { list: [] };
      heros.subscribe(h => {
        heroList.list.push(h);
      }, error => {
        this.logger.error(error);
        resolve(heroList);
      }, async () => {
        // await this.createMany(null, heroList.list);
        resolve(heroList);
      });
    });
  }

  /**
   * 查詢特定英雄透過英雄編號
   *
   * @method public
   * @param heroById 英雄編號
   * @return 回傳特定英雄
   */
  public findById(heroById: hero.HeroById): Promise<hero.Hero> {
    return this.findOne(heroById.id);
  }

  /**
   * 英雄發動攻擊
   *
   * @method pubilc
   * @param heroById 英雄編號
   * @return 回傳一個Observable，讓呼叫者可以取得英雄攻擊招式資訊
   */
  public attack(heroById: hero.HeroById): Observable<hero.HeroAttack> {
    const subject = new Subject<hero.HeroAttack>();

    this.findById(heroById)
      .then(existHero => {
        const heroAttack: hero.HeroAttack = {
          hero: existHero.name,
          name: 'Smash',
          demage: 0,
        };
        const timer = setInterval(() => {
          if (heroAttack.demage > 300) {
            clearInterval(timer);
            subject.complete();
          } else {
            heroAttack.demage += 100;
            subject.next(heroAttack);
          }
        }, 500);
      });

    return subject.asObservable();
  }

  /**
   * 英雄打招呼
   *
   * @method public
   * @param greetSub 招呼訊息佇列
   * @return 回傳一個Promise，讓呼叫者可以蒐集英雄的招呼訊息並回傳
   */
  public greet(greetSub: Observable<hero.HeroGreeting>): Promise<hero.HeroGreetingGroup> {
    return new Promise<hero.HeroGreetingGroup>((resolve, reject) => {
      const greetingGroup: hero.HeroGreetingGroup = { greet: [] };
      greetSub.subscribe(greet => {
        greetingGroup.greet.push(greet);
      }, error => {
        this.logger.error(error);
        reject(error);
      }, () => {
        resolve(greetingGroup);
      });
    });
  }

  /**
   * 英雄戰鬥
   *
   * @method public
   * @param heroAttack 英雄攻擊參數
   * @return 回傳一個Observable，讓呼叫者可以取得英雄所受的傷害
   */
  public combat(
    heroAttack: Observable<hero.HeroAttack>,
  ): Observable<hero.HeroInjured> {
    const subject = new Subject<hero.HeroInjured>();
    const accumulationAttack: hero.HeroAttack[] = [];

    // 累計傷害
    heroAttack.subscribe(attack => {
      accumulationAttack.push(attack);
    }, error => {
      this.logger.error(error);
    }, () => {
      accumulationAttack.forEach((attack, index) => {
        subject.next({ hero: attack.hero, demage: 100 });
        if (index === accumulationAttack.length - 1) {
          subject.complete();
        }
      });
    });

    return subject.asObservable();
  }

}
