import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangeProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly dob: string;
}
