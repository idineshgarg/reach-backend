import { Chat } from '../../conversation/entities/chat.entity';
import { ConversationMember } from '../../conversation/entities/conversation-member.entity';
import { Column, OneToMany, Entity } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ name: 'phone_number', unique: true, nullable: false, length: '15' })
  phoneNumber: string;

  @Column({ name: 'first_name', unique: false, nullable: true, length: '15' })
  firstName: string;

  @Column({ name: 'last_name', unique: false, nullable: true, length: '15' })
  lastName: string;

  @Column({ name: 'profile_photo', length: '500', nullable: true })
  profilePhoto: string;

  @OneToMany(
    () => ConversationMember,
    (conversationMember) => conversationMember.users,
  )
  conversationMembers: ConversationMember[];

  @OneToMany(() => Chat, (chat) => chat.user)
  public chat: [];
}
