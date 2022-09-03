import {
  Controller,
  Get,
  Res,
  Inject,
  CACHE_MANAGER,
  Body,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { validate } from 'class-validator';
import { codigoDTO } from './dto/telegram.dto';

@ApiTags('SERVICIOS')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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

  @Get('/loginCode')
  @ApiOperation({
    summary: 'Servicio para enviar el código de autenticación a Telegram',
  })
  async loginCode(@Res() res: Response) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador loginCode',
      response: {},
      status: 422,
    };

    try {
      response = await this.appService.loginCode();
      await this.cacheManager.set(
        'hash_code',
        response.response['phone_code_hash'],
      );
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return res.status(response.status).json(response);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Servicio para iniciar sesión con el código enviado a Telegram',
  })
  async login(@Res() res: Response, @Body() body: codigoDTO) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador login',
      response: {},
      status: 422,
    };

    const data = new codigoDTO();
    data.codigo = body.codigo;

    const valid = await validate(data);
    if (valid.length > 0) {
      const errorArray = valid.map((o) => ({
        [o.property]: Object.values(o.constraints),
      }));

      response.error = true;
      response.message = 'Error de valicación';
      response.response = errorArray;
      response.status = 406;
    } else {
      const hash_code = await this.cacheManager.get('hash_code');
      try {
        response = await this.appService.login(data.codigo, hash_code);
      } catch (error) {
        response.response = error;
        response.status = 500;
      }
    }

    return res.status(response.status).json(response);
  }

  @Get('/logout')
  @ApiOperation({
    summary: 'Servicio para cerrar sesión a Telegram',
  })
  async logout(@Res() res: Response) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador logout',
      response: {},
      status: 422,
    };

    try {
      response = await this.appService.logout();
      await this.cacheManager.reset();
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return res.status(response.status).json(response);
  }
}
