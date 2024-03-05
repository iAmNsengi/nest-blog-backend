import { ApiProperty } from '@nestjs/swagger';
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
import RegexCraft from 'regexcraft';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  @ApiProperty({ example: 'Nsengi' })
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  @ApiProperty({ example: 'Eliezer' })
  lastName: string;

  @IsEmail()
  @MaxLength(96)
  @ApiProperty({ example: 'iamnsengi@mail.com' })
  email: string;

  @IsString()
  @Length(8, 96)
  @Matches(
    new RegexCraft()
      .hasLengthBetween(8, 96)
      .hasLetter(1)
      .hasNumber(1)
      .hasSpecialCharacter(1)
      .build(),
    {
      message:
        'Password must be a minimum of eight characters, one letter, one number and one special character'
    }
  )
  @ApiProperty({ example: 'Strong$1234' })
  password: string;
}
