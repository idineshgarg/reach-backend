import { IsNotEmpty, IsString } from 'class-validator';

export class GetChatDto {
  @IsString()
  @IsNotEmpty()
  conversatonId;
}
