import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(phoneNumber: string, deviceToken: string) {
    return this.userRepository.save({
      phoneNumber: phoneNumber,
      // deviceToken: deviceToken,
    });
  }

  findUserWhere(obj: any) {
    return this.userRepository.findOne({
      where: {
        ...obj,
      },
    });
  }

  updateUser(id: string, { firstName, lastName, profilePhoto }) {
    return this.userRepository.update(id, {
      firstName,
      lastName,
      profilePhoto,
    });
  }
}
