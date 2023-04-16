import { User } from 'src/user/entities/user.entity';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, context): User => {
  return context.switchToHttp().getRequest().user;
});
