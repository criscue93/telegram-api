import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { MtProtoService } from './mt-proto/mt-proto.service';
import { IResponse } from 'src/interfaces/IResponse';

@Injectable()
export class AppService {
  constructor(
    @Inject(forwardRef(() => MtProtoService))
    private mtProto: MtProtoService,
  ) {}
  private origenPhone = process.env.APP_PHONE;

  async loginCode(): Promise<IResponse> {
    let response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de loginCode',
      response: {},
      status: 422,
    };

    try {
      response = await this.mtProto.mtProtoInstance.call('userx.getFullUser', {
        id: {
          _: 'ipuntUserSelf',
        },
      });
    } catch (error) {
      try {
        response = await this.mtProto.mtProtoInstance.call('auth.sendCode', {
          phone_number: this.origenPhone,
          settings: {
            _: 'codeSettings',
          },
        });
      } catch (error) {
        response.response = error;
        response.status = 500;
      }
    }

    return response;
  }

  async logout(): Promise<IResponse> {
    let response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de logout',
      response: {},
      status: 422,
    };

    try {
      response = await this.mtProto.mtProtoInstance.call('auth.logOut', {});
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async login(phone_code, phone_code_hash): Promise<IResponse> {
    let response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de login',
      response: {},
      status: 422,
    };

    try {
      response = await this.mtProto.mtProtoInstance.call('auth.signIn', {
        phone_code,
        phone_number: this.origenPhone,
        phone_code_hash,
      });
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }
}
