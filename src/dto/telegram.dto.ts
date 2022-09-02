import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString } from 'class-validator';

export class telegramDTO {
  @IsDefined({ message: 'El número del destinatario es obligatorio' })
  @IsString({ message: 'El número del destinatario tiene que ser una cadena' })
  @ApiProperty()
  number: string;

  @IsDefined({ message: 'El sms es obligatorio' })
  @IsString({ message: 'El sms tiene que ser una cadena' })
  @ApiProperty()
  sms: string;

  @IsDefined({ message: 'El id del funcionario es obligatorio' })
  @IsInt({ message: 'El id del funcionario tiene que ser un número' })
  @ApiProperty()
  funcionarioId: number;

  @IsDefined({ message: 'El nombre de la aplicación es obligatorio' })
  @IsString({ message: 'El nombre de la aplicación debe ser una cadena' })
  @ApiProperty()
  aplicacion: string;
}