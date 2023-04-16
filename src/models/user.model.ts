import { User } from 'src/user/entities/user.entity';

export class UserModel {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePhoto: string;

  static from(user: User): UserModel {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      profilePhoto: user.profilePhoto,
    };
  }
}
