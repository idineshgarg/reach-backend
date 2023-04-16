import { CurrentUserController } from './controllers/current-user.controller';
import { UserRepository } from './../user/repositories/user.repository';
import { Chat } from 'src/conversation/entities/chat.entity';
import { Conversation } from './../conversation/entities/conversation.entity';
import { ConversationMember } from 'src/conversation/entities/conversation-member.entity';
import { User } from './../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './../user/services/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ConversationMember, Conversation, Chat]),
  ],
  controllers: [CurrentUserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
