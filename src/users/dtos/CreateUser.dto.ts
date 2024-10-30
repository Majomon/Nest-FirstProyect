import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'El nombre del usuario debe tener mínimo 3 caracteres',
    example: 'Mauricio',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'El email del usuario debe ser un email valido',
    example: 'example@gmail.com',
  })
  email: string;
  
  /**
   * La contraseña debe ser una contraseña dificil de encontrar
   * @example Strong!(Password
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  // @ApiProperty({
  //   description: 'La contraseña debe ser una contraseña dificil de encontrar',
  //   example: 'Strong!(Password',
  // })
  password: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Asignada por default al momento de crear el usuario, no debe ser incluida en el body',
    example: true,
  })
  isAdmin: boolean;
}
