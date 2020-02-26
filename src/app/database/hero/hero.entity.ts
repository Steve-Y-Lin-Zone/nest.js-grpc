/**
 * 專案名稱： nestjs-grpc
 * 部門代號： ML8100
 * 檔案說明： 英雄實體
 * @CREATE Monday, 24th February 2020 9:53:11 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 英雄實體
 *
 * @param id   英雄流水號
 * @param name 英雄名稱
 */
@Entity('hero')
export class Hero {

  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name', nullable: false })
  public name: string;

}
