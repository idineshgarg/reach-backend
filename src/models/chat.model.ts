import { Chat } from 'src/conversation/entities/chat.entity';
import { UserModel } from './user.model';

export class ChatModel {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserModel;
  conversationId: string;

  static from(chat: Chat): ChatModel {
    return {
      id: chat.id,
      text: chat.text,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      conversationId: chat.conversationId,
      user: UserModel.from(chat.user),
    };
  }
}
