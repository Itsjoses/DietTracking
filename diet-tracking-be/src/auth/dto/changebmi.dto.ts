import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangeBmiDto {
  @IsNotEmpty()
  readonly tall: number;

  @IsNotEmpty()
  readonly weight: number;

  @IsNotEmpty()
  readonly plan: number;
}
