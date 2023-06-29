import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    })
  };

  async validate() {
    
  };

};