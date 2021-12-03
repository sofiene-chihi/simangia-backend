import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePlatDto } from './dto/createPlat.dto';
import { Plat } from './plat.entity';
import { PlatService } from './plat.service';

@Controller('plat')
export class PlatController {
  constructor(private readonly platService: PlatService) {}

  @Get('all')
  all(): Promise<Plat[]> {
    return this.platService.findAll();
  }

  @Get(':id')
  getPlat(@Param('id') id): Promise<Plat> {
    return this.platService.getPlat(id);
  }

  @Post('create')
  createPlat(@Body() createPlatDto: CreatePlatDto): Promise<Plat> {
    return this.platService.createPlat(createPlatDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('platImage', { dest: 'uploads/plats/' }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id) {
    this.platService.updatePlatImage(file.filename, id);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.platService.removePlat(id);
  }

  @Put(':id')
  update(@Body() createPlatDto: CreatePlatDto, @Param('id') id): Promise<Plat> {
    return this.platService.updatePlat(createPlatDto, id);
  }
}
