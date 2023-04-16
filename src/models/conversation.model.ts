import { UserModel } from './user.model';
import { Conversation } from './../conversation/entities/conversation.entity';
import { ConversationMember } from 'src/conversation/entities/conversation-member.entity';

export class ConversationModel {
  id: string;
  name: string;
  image: string;
  users: UserModel[] | [];

  static from(conversation: Conversation): ConversationModel {
    return {
      id: conversation.id,
      name: conversation.name,
      image: conversation.image,
      users: conversation.conversationMembers?.map((el: ConversationMember) =>
        UserModel.from(el.users),
      ),
    };
  }
}
