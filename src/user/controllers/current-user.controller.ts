import { UserModel } from './../../models/user.model';
import { UserService } from './../services/user.service';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UpdateCurrentUserDto } from '../dtos/update-current-user.dto';
import { GetUser } from 'src/config/get-user.decorator';

@UseGuards(AuthGuard)
@Controller('current-user')
export class CurrentUserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@GetUser() user: User) {
    return UserModel.from(user);
  }

  @Put()
  async updateCurrentUser(
    @Body() body: UpdateCurrentUserDto,
    @GetUser() user: User,
  ) {
    const updatedUser = await this.userService.updateCurrentUser(
      user,
      body.firstName,
      body.lastName,
      body.profilePhoto,
    );
    return UserModel.from(updatedUser);
  }
}
