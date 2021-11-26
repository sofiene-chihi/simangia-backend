import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plat } from './plat.entity';
import { PlatController } from './plat.controller';
import { PlatService } from './plat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plat])],
  controllers: [PlatController],
  providers: [PlatService],
  exports: [],
})
export class PlatModule {}
