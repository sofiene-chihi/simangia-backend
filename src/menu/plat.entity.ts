import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlatEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  imageUrl: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
}
