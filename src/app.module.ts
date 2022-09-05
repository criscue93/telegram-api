import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Telegram, TelegramSchema } from './schemas/telegram.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MtProtoService } from './mt-proto/mt-proto.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.APP_MONGO_TELEGRAM, {
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
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, MtProtoService],
})
export class AppModule {}
