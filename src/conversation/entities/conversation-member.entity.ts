import { Conversation } from './conversation.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';

@Unique(['userId', 'conversationId'])
@Entity('conversation_member')
export class ConversationMember extends BaseEntity {
  @ManyToOne(() => User, (user) => user.conversationMembers)
  @JoinColumn({ name: 'user_id' })
  public users: User;
  @Column({ name: 'user_id', nullable: false })
  public userId: string;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.conversationMembers,
  )
  @JoinColumn({ name: 'conversation_id' })
  public conversation: Conversation;
  @Column({ name: 'conversation_id', nullable: false })
  public conversationId: string;
}
