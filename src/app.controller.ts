import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Res,
  Version,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { codigoDTO, sendDTO } from './dto/telegram.dto';
import { validate } from 'class-validator';
import { userExists } from './helpers/userExists.helper';

@ApiTags('SERVICES TELEGRAM')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/')
  @ApiOperation({
    summary: 'Permite verificar si el servicio está funcionando.',
  })
  @ApiResponse({ status: 200, description: 'Ok' })
  getPing(@Res() res: Response) {
    const response = this.appService.getPing();

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Get('/sendCode')
  @ApiOperation({
    summary: 'Servicio para enviar el código de autenticación a Telegram',
  })
  async sendCode(@Res() res: Response) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador loginCode',
      response: {},
      status: 422,
    };

    try {
      response = await this.appService.loginCode();
      await this.cacheManager.reset();
      await this.cacheManager.set(
        'hash_code',
        response.response['phone_code_hash'],
        { ttl: 0 },
      );
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return res.status(response.status).json(response);
  }

  @Version('1')
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

  @Version('1')
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

  @Version('1')
  @Get('/verify/:number')
  @ApiOperation({
    summary: 'Servicio para si el número tiene cuenta en Telegram',
  })
  async verifyNumber(@Res() res: Response, @Param('number') number: number) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador logout',
      response: {},
      status: 422,
    };

    try {
      response = await this.appService.addContact(
        number,
        'temporal',
        'temporal',
      );
      response = userExists(response.response['users']);

      if (response.status === 200) {
        const user = response.response[0];
        const idHash = { user_id: user.id, hash: user.access_hash };
        await this.appService.removeContact(idHash.user_id, idHash.hash);
      }

      if (response.error === false) {
        response.response = {};
      }
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('/send')
  @ApiOperation({
    summary: 'Servicio enviar mensajes por Telegram',
  })
  async sendMessage(@Res() res: Response, @Body() body: sendDTO) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador logout',
      response: {},
      status: 422,
    };

    const data = new sendDTO();
    data.destino = body.destino;
    data.sms = body.sms;
    data.funcionarioId = body.funcionarioId;
    data.aplicacion = body.aplicacion;
    data.guardar = body.guardar;

    const valid = await validate(data);
    if (valid.length > 0) {
      const errorArray = valid.map((o) => ({
        [o.property]: Object.values(o.constraints),
      }));

      response.error = true;
      response.message = 'Error de validación';
      response.response = errorArray;
      response.status = 406;
    } else {
      try {
        response = await this.appService.addContact(
          data.destino,
          'temporal',
          'temporal',
        );
        userExists(response.response['users']);

        const user = response.response['users'][0];
        const idHash = { user_id: user.id, hash: user.access_hash };
        response = await this.appService.sendMessage(
          data.sms,
          idHash.user_id,
          idHash.hash,
        );

        let estadoEnvio = false;
        if (response.error === false) {
          estadoEnvio = true;
        }

        let myNumber = 0;
        const messages = await this.appService.getChat(
          idHash.user_id,
          idHash.hash,
          2,
        );
        const main = messages.response['users'].find(
          (user) => user.self == true,
        );
        myNumber = main.phone;
        await this.appService.removeContact(idHash.user_id, idHash.hash);

        if (data.guardar === true) {
          const logs = {
            origen: {
              numero: myNumber,
              app_nombre: data.aplicacion,
              funcionario: data.funcionarioId,
            },
            destino: {
              numero: user.phone,
              mensaje: data.sms,
              fichero: false,
            },
            enviado: estadoEnvio,
          };
          await this.appService.saveLogs(logs);
        }
      } catch (error) {
        response.response = error;
        response.status = 500;
      }
    }

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Get('/logs/:number')
  @ApiOperation({
    summary: 'Servicio para devolver el log de chat de Telegram',
  })
  async getLogsByNumber(
    @Res() res: Response,
    @Param('number') number: number,
    @Query('limit') limit: number,
  ) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador getLogsByNumber',
      response: {},
      status: 422,
    };

    try {
      limit = limit && limit <= 100 ? limit : 10;
      response = await this.appService.addContact(
        number,
        'temporal',
        'temporal',
      );
      response = userExists(response.response['users']);

      if (response.status === 200) {
        const user = response.response[0];
        const idHash = { user_id: user.id, hash: user.access_hash };
        await this.appService.removeContact(idHash.user_id, idHash.hash);

        const messages = await this.appService.getChat(
          idHash.user_id,
          idHash.hash,
          limit,
        );

        const msg = messages.response['messages'].map((msg) => {
          return {
            _: msg._,
            fecha: msg.date,
            enviado: msg.out,
            mensaje: msg.message,
          };
        });
        const userLog = messages.response['users'][0];

        response.error = false;
        response.message = 'Logs extraidos correctamente';
        response.response = {
          usuario: {
            nombre: userLog.first_name,
            apellido: userLog.last_name,
            numero: userLog.phone,
          },
          mensajes: msg,
        };
      }
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return res.status(response.status).json(response);
  }
}
