import { ChatRepository } from './repositories/chat.repository';
import { Chat } from 'src/conversation/entities/chat.entity';
import { ConversationMember } from 'src/conversation/entities/conversation-member.entity';
import { Conversation } from './entities/conversation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './../user/repositories/user.repository';
import { ConversationRepository } from './repositories/conversation.repository';
import { ConversationMemberRepository } from './repositories/conversation-member.repository';
import { ConversationService } from './services/conversation.service';
import { ConversationController } from './controllers/conversation.controller';
import { Module } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from './../auth/guard/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Conversation, ConversationMember, Chat]),
  ],
  controllers: [ConversationController],
  providers: [
    ConversationService,
    ConversationMemberRepository,
    ConversationRepository,
    UserRepository,
    ChatRepository,
    AuthGuard,
  ],
})
export class ConversationModule {}
