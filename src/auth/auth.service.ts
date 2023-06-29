import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {};

  async register(dto: RegisterUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = new CreateUserDto();
    newUser.email = dto.email;
    newUser.hash = hash;
    newUser.firstName = dto.firstName;
    newUser.lastName = dto.lastName;
    await this.userService.create(newUser);
    return newUser;
  };

};
