import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/conversation/entities/chat.entity';
import { Repository } from 'typeorm';
export class ChatRepository {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  saveChat(conversationId, userId, text) {
    return this.chatRepository.save({
      conversationId,
      userId,
      text,
    });
  }

  getChat(id) {
    return this.chatRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
  }

  getChats(conversationId) {
    return this.chatRepository.find({
      where: {
        conversationId,
      },
      relations: ['user'],
      order: { createdAt: 'desc' },
    });
  }
}
