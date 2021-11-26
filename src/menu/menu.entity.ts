import { Plat } from '../plat/plat.entity';
import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany((type) => Plat)
  @JoinTable()
  plats: Plat[];
}
