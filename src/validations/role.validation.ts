import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del rol es requerido.' })
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres.' })
  nombre!: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MaxLength(200, { message: 'La descripción no debe exceder los 200 caracteres.' })
  descripcion?: string;
}