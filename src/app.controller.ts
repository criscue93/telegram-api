import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('SERVICIOS')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Permite verificar si el microservicio esta funcionando',
  })
  getPing(@Res() res: Response) {
    const response = {
      error: false,
      message:
        'Bienvenido a los Microservicio TELEGRAM, basado en principios REST, devuelve metadatos JSON - Copyright © Ministerio Público.',
      response: {
        author: 'Ministerio Público',
        dateTimeServer: new Date().toLocaleString(),
        nameApp: 'TELEGRAM API',
        version: '0.0.1',
      },
      status: 200,
    };

    return res.status(response.status).json(response);
  }
}
