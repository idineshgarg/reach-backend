import { ConversationModel } from './../../models/conversation.model';
import { User } from 'src/user/entities/user.entity';
import { CreateChatDto } from './../dtos/create-chat.sto';
import { ConversationService } from './../services/conversation.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { GetUser } from 'src/config/get-user.decorator';
import { CreateConversationDto } from '../dtos/create-conversation.dto';
import { GetConversationsDto } from '../dtos/get-conversation.dto';
import { GetChatDto } from '../dtos/get-chat.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ChatModel } from 'src/models/chat.model';

@UsePipes(ValidationPipe)
@UseGuards(AuthGuard)
@Controller({ path: 'conversation', version: 'v1' })
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @Post()
  async createConversation(
    @Body() body: CreateConversationDto,
    @GetUser() user,
  ) {
    const conversation = await this.conversationService.createConversation(
      user.id,
      body.userId,
    );
    return {
      conversation: ConversationModel.from(conversation),
    };
  }

  @Get()
  async getConversations(
    @Query() body: GetConversationsDto,
    @GetUser() user: User,
  ) {
    const conversations = await this.conversationService.getConversations(
      user.id,
    );
    return {
      conversations: conversations.map(ConversationModel.from),
    };
  }

  @Get('chat/:conversationId')
  async getChatsInConversation(
    @Param('conversationId') conversationId: string,
  ) {
    const chats = await this.conversationService.getChatsInConversation(
      conversationId,
    );
    return {
      chats: chats.map(ChatModel.from),
    };
  }

  @Post('chat/:conversationId')
  async addChatToConversation(
    @Param('conversationId') conversationId: string,
    @Body() body: CreateChatDto,
    @GetUser() user,
  ) {
    const chat = await this.conversationService.addChatToConversation(
      conversationId,
      user.id,
      body.text,
    );
    return {
      chat: ChatModel.from(chat),
    };
  }
}
