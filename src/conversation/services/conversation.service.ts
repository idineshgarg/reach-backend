import { ChatRepository } from './../repositories/chat.repository';
import { ConversationRepository } from './../repositories/conversation.repository';
import { Injectable } from '@nestjs/common';
import { ConversationMemberRepository } from '../repositories/conversation-member.repository';

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationMemberRepository: ConversationMemberRepository,

    private readonly conversationRepository: ConversationRepository,

    private readonly chatRepository: ChatRepository,
  ) {}
  async createConversation(userId: string, friendsUserId: string) {
    const mapping =
      await this.conversationMemberRepository.findCommonCoversation(
        userId,
        friendsUserId,
      );
    if (mapping) {
      return mapping;
    }

    const conversation = await this.conversationRepository.createConversation();
    // add friend to conversation
    const conversationMember =
      await this.conversationMemberRepository.addFriend(
        friendsUserId,
        conversation.id,
      );

    // add Self to conversation
    const conversationMember2 =
      await this.conversationMemberRepository.addFriend(
        userId,
        conversation.id,
      );

    return this.conversationRepository.getConversation(conversation.id);
  }

  async getConversations(userId: string) {
    return this.conversationRepository.getConversations(userId);
  }

  async getChatsInConversation(conversationId: string) {
    return this.chatRepository.getChats(conversationId);
  }

  async addChatToConversation(
    conversationId: string,
    userId: string,
    text: string,
  ) {
    const chat = await this.chatRepository.saveChat(
      conversationId,
      userId,
      text,
    );
    return this.chatRepository.getChat(chat.id);
  }
}
