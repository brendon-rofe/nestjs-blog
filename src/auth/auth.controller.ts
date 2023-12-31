import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {};

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  };

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  };

};
