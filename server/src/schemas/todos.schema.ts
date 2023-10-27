import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ToDosDocument = ToDo & Document;

@Schema()
export class ToDo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  text: string;

  @Prop({ required: true, default: '1' })
  userId: string;
}

export const ToDosSchema = SchemaFactory.createForClass(ToDo);
