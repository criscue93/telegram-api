import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TelegramDocument = Telegram & Document;

@Schema()
export class Telegram {
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Number })
  number: number;

  @Prop({ type: Object })
  sms: string;

  @Prop({ type: Number })
  funcionarioId: number;

  @Prop({ type: Object })
  aplicacion: string;

  @Prop({ type: Object })
  origen: any;
}

export const TelegramSchema = SchemaFactory.createForClass(Telegram);
