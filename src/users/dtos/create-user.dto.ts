import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName: string;

  @IsEmail()
  @MaxLength(96)
  email: string;

  @IsString()
  @Length(8, 96)
  @Matches(/^(?=.*[A-Zz-z])(?=.*\d)(?=.[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/, {
    message:
      'Password must be a minimum of eight characters, one letter, one number and one special character'
  })
  password: string;
}
