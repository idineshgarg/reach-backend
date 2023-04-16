import { IsOptional, IsString, Max, Min } from 'class-validator';
export class UpdateCurrentUserDto {
  @IsString()
  @IsOptional()
  @Min(1)
  @Max(100)
  firstName: string;

  @IsString()
  @IsOptional()
  @Min(1)
  @Max(100)
  lastName: string;

  @IsString()
  @IsOptional()
  @Min(1)
  @Max(100)
  profilePhoto: string;
}
