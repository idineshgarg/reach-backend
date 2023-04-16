import { User } from 'src/user/entities/user.entity';
import { AwsController } from './controllers/aws.controller';
import { AwsService } from './services/aws.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AwsController],
  providers: [AwsService, AuthGuard, UserRepository],
})
export class AwsModule {}
