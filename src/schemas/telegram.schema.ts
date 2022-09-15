import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TelegramDocument = Telegram & Document;

@Schema()
export class Telegram {
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Object })
  origen: any;

  @Prop({ type: Object })
  destino: any;

  @Prop({ type: Boolean })
  enviado: boolean;
}

export const TelegramSchema = SchemaFactory.createForClass(Telegram);
