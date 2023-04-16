import { RefreshDto } from './../dtos/refresh.dto';
import { UserService } from './../../user/services/user.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupDto } from '../dtos/signup.dto';
import { LoginDto } from '../dtos/login.dto';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  createUser(@Body() body: SignupDto) {
    return this.userService.createUser(body.phoneNumber, body.deviceToken);
  }

  @Post('login')
  loginUser(@Body() body: LoginDto) {
    return this.userService.loginUser(body.phoneNumber);
  }

  @Post('refresh')
  generateNewCredentials(@Body() body: RefreshDto) {
    return this.userService.generateNewCredentials(body.refreshToken);
  }
}
