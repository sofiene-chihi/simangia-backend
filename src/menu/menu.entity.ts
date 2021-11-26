import { PlatEntity } from './plat.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany((type) => PlatEntity)
  @JoinTable()
  plats: PlatEntity[];
}
