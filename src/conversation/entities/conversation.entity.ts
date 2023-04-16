import { ConversationMember } from 'src/conversation/entities/conversation-member.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Chat } from './chat.entity';
import { BaseEntity } from 'src/config/base.entity';

@Entity('conversation')
export class Conversation extends BaseEntity {
  @Column({ name: 'name', unique: false, nullable: true, length: '100' })
  name: string;

  @Column({ name: 'image', unique: false, nullable: true, length: '150' })
  image: string;

  @OneToMany(
    () => ConversationMember,
    (conversationMember) => conversationMember.conversation,
  )
  public conversationMembers: ConversationMember[];

  @OneToMany(() => Chat, (chat) => chat.conversation)
  public chat: Chat[];
}
