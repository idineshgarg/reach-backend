import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';

export class ConversationRepository {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async getConversations(userId: string) {
    const conversations = await this.conversationRepository.find({
      where: {
        conversationMembers: {
          userId: userId,
        },
      },
    });

    return this.conversationRepository.find({
      where: {
        id: In(conversations.map((el) => el.id)),
      },
      relations: ['conversationMembers', 'conversationMembers.users'],
    });
  }

  createConversation() {
    return this.conversationRepository.save({});
  }

  getConversation(id: string) {
    return this.conversationRepository.findOne({
      where: {
        id,
      },
      relations: ['conversationMembers', 'conversationMembers.users'],
    });
  }
}
