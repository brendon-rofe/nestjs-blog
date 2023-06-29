import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {};

  async create(dto: CreateUserDto) {
    const newUser = this.userRepo.create(dto);
    await this.userRepo.save(newUser);
    return newUser;
  };

  async getByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  };

};
