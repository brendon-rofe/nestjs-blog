import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  constructor(private userService: UserService, private jwtService: JwtService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    })
  };

  async validate(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);
    const passwordsMatch = await bcrypt.compare(dto.password, user.hash);
    if(!user) {
      throw new UnauthorizedException();
    };
    if(!passwordsMatch) {
      throw new UnauthorizedException();
    };
    const payload = { email: dto.email, sub: user.id };
    return {
      access_token: await this.jwtService.sign(payload)
    };
  };

};