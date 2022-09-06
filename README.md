<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Telegram - API, microservicio para el envío de mensajes por telegram.

## Installation

```bash
$ npm install
```

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
}
Se mandan como datos, los mencionados anteriormente para el envío de los mensajes.
```

### Historial de mensajes enviados

```bash
EndPoint: GET - url/api/log/{number}
Se manda como dato el número del que se requiere saber el historial de sms enviados, además de un número como límite de mensajes a mostrar.
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Ing. Cristian Cueto.
- Desarrollador - Ing. Cristian Cueto.

## License

Telegram - API [MIT licensed](LICENSE).
