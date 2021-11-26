import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {


  async findAll(): Promise<User[]> {
    const allUsers = await User.find();
    return (allUsers); 
  }

  async userProfile(id : number): Promise<User>{
      const user= await User.findOne(id);
      return user;
  } 

  async deleteUser(id : number) :Promise<string> {
      const user = this.userProfile(id);
      (await user).remove();

      return ("user removed successfully");
  }

  async updateUser(data: RegisterDto, id:number): Promise<User>{
      const newUser = new User();
      newUser.id= id;
      newUser.firstName= data.firstName;
      newUser.lastName= data.lastName;
      newUser.email= data.email;
      newUser.password= data.password;
      await User.save(newUser);
      return newUser;

  }


  async getUserCredentials(email: string) {
    const user= await User.findOne({email});
    if(user != undefined){
      return user
    }else {
      return null;
    }
  }

  async createUser(data: RegisterDto): Promise<User>{
    if(this.getUserCredentials(data.email)!= null){
      return null;
    }
    const newUser:User = new User();
    newUser.firstName= data.firstName;
    newUser.lastName= data.lastName;
    newUser.email= data.email;
    newUser.password= data.password;
    await User.save(newUser);
    return newUser;
  }
}
