import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NetworkDocument = Network & Document;

@Schema({ timestamps: true })
export class Network {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  logo: string;
}

export const NetworkSchema = SchemaFactory.createForClass(Network);
