import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlatDto } from './dto/createPlat.dto';
import { Plat } from './plat.entity';

@Injectable()
export class PlatService {
  constructor(
    @InjectRepository(Plat) private platRepository: Repository<Plat>,
  ) {}

  async findAll(): Promise<Plat[]> {
    return await this.platRepository.find();
  }

  async getPlat(id: number): Promise<Plat> {
    return await this.platRepository.findOne({ id: id });
  }

  async createPlat(plat: CreatePlatDto): Promise<Plat> {
    const newPlat: Plat = this.platRepository.create(plat);

    return await this.platRepository.save(newPlat);
  }

  async removePlat(id: number) {
    const plat = await this.platRepository.findOne({ id: id });
    if (await this.platRepository.delete(id)) {
      return plat;
    }
    throw new BadRequestException("plat doesn't exist in the database");
  }

  async updatePlat(data: CreatePlatDto, id: number): Promise<Plat> {
    if (await this.platRepository.findOne(id)) {
      await this.platRepository.update(id, data);
      return await this.platRepository.findOne(id);
    }
    throw new BadRequestException('plat not found !');
  }

  async updatePlatImage(image: string, id: number): Promise<Plat> {
    if (await this.platRepository.findOne(id)) {
      await this.platRepository.update(id, { image });
      return await this.platRepository.findOne(id);
    }
    throw new BadRequestException('plat not found !');
  }
}
