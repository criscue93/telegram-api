import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Telegram, TelegramSchema } from './schemas/telegram.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.APP_MONGO_SHORTLINK, {
      connectionName: 'telegram',
    }),
    MongooseModule.forFeature(
      [
        {
          name: Telegram.name,
          schema: TelegramSchema,
        },
      ],
      'telegram',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
