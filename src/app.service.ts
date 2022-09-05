import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import { IResponse } from './interfaces/IResponse';
import { MtProtoService } from './mt-proto/mt-proto.service';
import { Telegram, TelegramDocument } from './schemas/telegram.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @Inject(forwardRef(() => MtProtoService))
    private mtProto: MtProtoService,
    @InjectModel(Telegram.name, 'telegram')
    private telegramDocument: Model<TelegramDocument>,
  ) {}

  getPing(): IResponse {
    return {
      error: false,
      message:
        'Bienvenido a TELEGRAM - API, basado ​​en principios REST, devuelve metadatos JSON - Copyright © Ministerio Público.',
      response: {
        nameApp: 'TELEGRAM - API',
        version: '0.0.1',
        dateTimeServer: DateTime.now().toISO(),
      },
      status: 200,
    };
  }

  async loginCode(): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de loginCode',
      response: {},
      status: 422,
    };

    try {
      const resp = await this.mtProto.mtProtoInstance.call('auth.sendCode', {
        phone_number: `${process.env.APP_PHONE}`,
        settings: {
          _: 'codeSettings',
        },
      });

      response.error = false;
      response.message = 'Se logró enviar el código correctamente';
      response.response = resp;
      response.status = 200;
    } catch (error) {
      const { error_code, error_message } = error;
      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_');
        const dcId = Number(dcIdAsString);

        if (type === 'PHONE') {
          await this.mtProto.mtProtoInstance.setDefaultDc(dcId);
        }

        const resp = await this.mtProto.mtProtoInstance.call('auth.sendCode', {
          phone_number: `${process.env.APP_PHONE}`,
          settings: {
            _: 'codeSettings',
          },
        });

        response.error = false;
        response.message = 'Se logró enviar el código correctamente';
        response.response = resp;
        response.status = 200;
      }
    }

    return response;
  }

  async logout(): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de logout',
      response: {},
      status: 422,
    };

    try {
      const resp = await this.mtProto.mtProtoInstance.call('auth.logOut', {});

      response.error = false;
      response.message = 'Se logró cerrar sesión correctamente';
      response.response = resp;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async login(phone_code, phone_code_hash): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de login',
      response: {},
      status: 422,
    };

    try {
      const resp = await this.mtProto.mtProtoInstance.call('auth.signIn', {
        phone_number: process.env.APP_PHONE,
        phone_code_hash,
        phone_code,
      });

      response.error = false;
      response.message = 'Se logró iniciar sesión correctamente';
      response.response = resp;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async addContact(
    phone: string,
    first_name: 'temporal',
    second_name: 'temporal',
  ): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de addContact',
      response: {},
      status: 422,
    };

    try {
      const resp = await this.mtProto.mtProtoInstance.call(
        'contacts.importContacts',
        {
          contacts: [
            {
              _: 'inputPhoneContact',
              client_id:
                1 + Math.floor(Math.random() * (100000000 - 1000000) + 1000000),
              phone,
              first_name,
              second_name,
            },
          ],
        },
      );

      response.error = false;
      response.message = 'Se logró añadir al usuario correctamente';
      response.response = resp;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async removeContact(user_id, access_hash: string): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de removeContact',
      response: {},
      status: 422,
    };

    try {
      const delUser = { _: 'inputUser', user_id, access_hash };
      const resp = await this.mtProto.mtProtoInstance.call(
        'contacts.deleteContacts',
        {
          id: [delUser],
        },
      );

      response.error = false;
      response.message = 'Se logró eliminar el usuario correctamente';
      response.response = resp;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async sendMessage(
    message: string,
    user_id: number,
    access_hash: string,
  ): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de sendMessage',
      response: {},
      status: 422,
    };

    try {
      const random_id = Math.floor(
        Math.random() * (100000000 - 1000000) + 1000000,
      );
      const resp = await this.mtProto.mtProtoInstance.call(
        'messages.sendMessage',
        {
          message,
          peer: {
            _: 'inputPeerUser',
            user_id,
            access_hash,
          },
          random_id,
        },
      );

      response.error = false;
      response.message = 'Se logró enviar el mensaje correctamente';
      response.response = resp;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async getChat(
    user_id: number,
    access_hash: number,
    limit: number,
  ): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de getChat',
      response: {},
      status: 422,
    };

    try {
      const resp = await this.mtProto.mtProtoInstance.call(
        'messages.getHistory',
        {
          peer: { _: 'inputPeerUser', user_id, access_hash },
          max_id: -1,
          limit,
        },
      );

      response.error = false;
      response.message = 'Se logró obtener el chat del usuario correctamente';
      response.response = resp;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async saveLogs(data: any): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existe problemas con el servicio saveLogs.',
      response: {},
      status: 422,
    };

    try {
      const loglink = new this.telegramDocument(data);
      const save = await loglink.save();

      response.error = false;
      response.message = 'Se registraron los logs correctamente';
      response.response = save;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }
}
