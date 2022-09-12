import { IResponse } from 'src/interfaces/IResponse';

export const userExists = (users: any[]): IResponse => {
  const response: IResponse = {
    error: true,
    message: 'El usuario no tiene una cuenta en Telegram',
    response: {},
    status: 422,
  };
  if (users.length > 0) {
    response.error = false;
    response.message = 'El usuario tiene una cuenta en Telegram';
    response.response = users;
    response.status = 200;

    return response;
  }
  return response;
};
