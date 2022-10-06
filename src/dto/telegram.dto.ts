import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsInt, IsString } from 'class-validator';

export class codigoDTO {
  @IsDefined({ message: 'El código es obligatorio' })
  @IsString({ message: 'El código tiene que ser una cadena' })
  @ApiProperty()
  codigo: string;
}
export class sendDTO {
  @IsDefined({ message: 'El número del destinatario es obligatorio' })
  @IsInt({ message: 'El número del destinatario tiene que ser un número' })
  @ApiProperty()
  celular: number;

  @IsDefined({ message: 'El sms es obligatorio' })
  @IsString({ message: 'El sms tiene que ser una cadena' })
  @ApiProperty()
  mensaje: string;

  @ApiProperty()
  adjuntos: any[];

  @ApiProperty()
  @IsBoolean()
  guardar: boolean;
}
