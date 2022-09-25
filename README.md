<p align="center">
  <a href="https://github.com/criscue93" target="blank"><img src="src/img/logo.png" width="200" alt="KodeMain Logo" /></a>
</p>

<p align="center"></p><p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Description

Telegram - API, microservice for sending telegram messages.

## Installation

```bash
$ npm install
```

## .ENV

In the .env.example file are the environment variables to be used to run the project.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Steps

### Conseguir las credenciales

Ingresar a: [Telegram](https://my.telegram.org)

#### Nota

Las credenciales junto al enlace a la base de datos en MongoDB se tienen que colocar en el .env, tal cual el ejemplo que se tiene.

### Envio del código para iniciar sesión

```bash
EndPoint: GET - url/api/sendCode
Envía un código al número de celular registrado, este código servirá para el inicio de sesión.
```

#### Nota

Si no se puede iniciar sesión, primero hacer un logout y después enviar utilizar el envió del código.

### Inicio de sesión

```bash
EndPoint: POST - url/api/login
{ "codigo": XXXXX }
Se envía el código como parámetro para el inicio de sesión.
```

### Cerrar sesión

```bash
EndPoint: GET - url/api/logout
Cierra la sesión del usuario registrado.
```

### Verificar si un número tiene cuenta en Telegram

```bash
EndPoint: GET - url/api/verify/{number}
Se manda como dato el número del que se quiere saber si esta o no registrado en Telegram
```

### Envío de mensajes

```bash
EndPoint: POST - url/api/send
{
    "destino": "numero de celular",
    "sms": "mensaje a enviar",
    "funcionarioId": id del funcionario que envia el sms,
    "aplicacion": "codigo de la aplicación de la que se envia el mensaje",
    "guardar": true or false,
}
Se mandan como datos, los mencionados anteriormente para el envío de los mensajes.
```

### Historial de mensajes enviados

```bash
EndPoint: GET - url/api/log/{number}
Se manda como dato el número del que se requiere saber el historial de sms enviados, además de un número como límite de mensajes a mostrar.
```

## Stay in touch

- Author - Ing. Cristian Cueto.
- Desarrollador - Ing. Cristian Cueto.

## License

Telegram - API [MIT licensed](LICENSE).
