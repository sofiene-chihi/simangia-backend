import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async userProfile(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = this.userProfile(id);
    if (await this.userRepository.delete(id)) {
      return user;
    }
    throw new BadRequestException("product doesn't exist in the database");
  }

  async updateUser(data: RegisterDto, id: number): Promise<User> {

    if (await this.userRepository.findOne(id)) {
      await this.userRepository.update(id, data);
      return await this.userRepository.findOne(id);
    }

    throw new BadRequestException('product not found !');

  }

  async getUserCredentials(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user != undefined) {
      return user;
    } else {
      return null;
    }
  }

  async createUser(data: RegisterDto): Promise<User> {
    if (this.getUserCredentials(data.email) != null) {
      return null;
    }
    const newUser: User = this.userRepository.create(data);

    await this.userRepository.save(newUser);
    return newUser;
  }
}
