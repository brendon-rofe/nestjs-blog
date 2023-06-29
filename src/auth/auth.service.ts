import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {};

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

  async login(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);
    if(!user) {
      throw new HttpException('Incorrect credentials', HttpStatus.BAD_REQUEST);
    };
    const passwordsMatch = await bcrypt.compare(dto.password, user.hash);
    if(!passwordsMatch) {
      throw new HttpException('Incorrect credentials', HttpStatus.BAD_REQUEST);
    };
    const payload = { sub: user.id, email: dto.email };
    return {
      access_token: this.jwtService.sign(payload)
    };
  };

};
