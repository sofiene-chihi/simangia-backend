import { Plat } from '../plat/plat.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name : string;

  @Column()
  price : string;
  
  @ManyToMany((type) => Plat, plat => plat.menus)
  @JoinTable()
  plats: Plat[];
}
