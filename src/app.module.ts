import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Telegram, TelegramSchema } from './schemas/telegram.schema';
import { MtProtoService } from './mt-proto/mt-proto.service';

@Module({
  imports: [
    CacheModule.register({ ttl: 120 }),
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
  providers: [AppService, MtProtoService],
})
export class AppModule {}
