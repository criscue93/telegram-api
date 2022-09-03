import { HttpStatus } from '@nestjs/common';
import { IResponse } from 'src/interfaces/IResponse';

export const userExists = (users: any[]): IResponse => {
  const response: IResponse = {
    error: true,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'El usuario no tiene una cuenta en Telegram',
    response: {},
  };
  if (users.length > 0) {
    response.error = false;
    response.status = HttpStatus.OK;
    response.message = 'El usuario tiene una cuenta en Telegram';
    return response;
  }
  return response;
};
