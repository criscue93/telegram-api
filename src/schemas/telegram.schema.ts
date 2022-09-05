import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TelegramDocument = Telegram & Document;

@Schema()
export class Telegram {
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Object })
  origenSms: any;

  @Prop({ type: Object })
  destinoSms: any;

  @Prop({ type: Object })
  origen: any;
}

export const TelegramSchema = SchemaFactory.createForClass(Telegram);
