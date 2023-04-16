import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsE164PhoneNumber } from 'src/config/is-e164-phone-number.decorator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @IsE164PhoneNumber({ message: 'Enter a valid phone number' })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  deviceToken: string;
}
