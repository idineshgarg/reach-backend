import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationMember } from '../entities/conversation-member.entity';

export class ConversationMemberRepository {
  constructor(
    @InjectRepository(ConversationMember)
    private conversationMemberRepository: Repository<ConversationMember>,
  ) {}

  findConversationsForUser(userId) {
    return this.conversationMemberRepository.find({
      where: {
        userId,
      },
      relations: ['conversation'],
    });
  }

  addFriend(userId, conversationId) {
    return this.conversationMemberRepository.save({
      userId: userId,
      conversationId: conversationId,
    });
  }

  findCommonCoversation(userId, friendsUserId) {
    return this.conversationMemberRepository
      .createQueryBuilder('cm')
      .select('cm2.user_id', 'userId')
      .addSelect('cm2.conversation_id', 'conversationId')
      .leftJoinAndSelect(
        ConversationMember,
        'cm2',
        'cm2.conversation_id = cm.conversation_id',
      )
      .where(
        `cm.user_id = ${userId} and cm2.user_id = ${friendsUserId} and  cm.id != cm2.id`,
      )
      .getRawOne();
  }
}
