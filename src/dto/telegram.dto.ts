import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString } from 'class-validator';

export class codigoDTO {
  @IsDefined({ message: 'El código es obligatorio' })
  @IsInt({ message: 'El código tiene que ser un número entero' })
  @ApiProperty()
  codigo: string;
}
export class sendDTO {
  @IsDefined({ message: 'El número del destinatario es obligatorio' })
  @IsString({ message: 'El número del destinatario tiene que ser una cadena' })
  @ApiProperty()
  destino: string;

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
