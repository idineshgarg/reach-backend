import { JwtService } from '@nestjs/jwt';
import { User } from './../entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(phoneNumber: string, deviceToken: string) {
    let user = await this.userRepository.findUserWhere({ phoneNumber });
    if (user) {
      throw new BadRequestException('User already exists.');
    }
    user = await this.userRepository.createUser(phoneNumber, deviceToken);
    return this.generateCredentials(user);
  }

  async loginUser(phoneNumber: string) {
    const user = await this.userRepository.findUserWhere({ phoneNumber });
    if (!user) {
      throw new BadRequestException('No User exists.');
    }
    return this.generateCredentials(user);
  }

  async generateNewCredentials(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_SECRET,
    });

    const userData: User = await this.userRepository.findUserWhere({
      id: payload.id,
    });

    if (!userData) {
      throw new BadRequestException('No User exists.');
    }
    return this.generateCredentials(userData);
  }

  async generateCredentials(user: User) {
    const userData = {
      id: user.id,
      phoneNumber: user.phoneNumber,
    };
    const accessToken = await this.jwtService.signAsync(userData, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(userData, {
      expiresIn: '2d',
    });
    return { accessToken, refreshToken };
  }
}
