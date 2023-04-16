import { Conversation } from './conversation.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';

@Entity('chat')
export class Chat extends BaseEntity {
  @Column({ name: 'text', type: 'text', nullable: false, unique: false })
  text: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.chat)
  @JoinColumn({ name: 'conversation_id' })
  public conversation: Conversation;
  @Column({ name: 'conversation_id', nullable: false })
  public conversationId: string;

  @ManyToOne(() => User, (user) => user.chat)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column({ name: 'user_id', nullable: false })
  public userId: string;
}
