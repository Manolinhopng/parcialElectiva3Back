import { IsNotEmpty, IsString, IsEmail, MaxLength, Matches } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString({ message: 'Los nombres deben ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Los nombres son requeridos.' })
  @MaxLength(100, { message: 'Los nombres no deben exceder los 100 caracteres.' })
  nombres!: string;

  @IsString({ message: 'Los apellidos deben ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Los apellidos son requeridos.' })
  @MaxLength(100, { message: 'Los apellidos no deben exceder los 100 caracteres.' })
  apellidos!: string;

  @IsString({ message: 'La identificación debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La identificación es requerida.' })
  @MaxLength(20, { message: 'La identificación no debe exceder los 20 caracteres.' })
  identificacion!: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser una dirección de correo válida.' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido.' })
  @MaxLength(100, { message: 'El correo electrónico no debe exceder los 100 caracteres.' })
  email!: string;

  @IsNotEmpty({ message: 'El ID del rol es requerido.' })
  @IsString({ message: 'El ID del rol debe ser una cadena de texto.' })
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'El ID del rol no es un ObjectId de MongoDB válido.' })
  rolId!: string;
}