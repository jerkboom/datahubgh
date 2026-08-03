import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BundleDocument = Bundle & Document;

@Schema({ timestamps: true })
export class Bundle {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Network', required: true })
  networkId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  validity: string;

  @Prop({ required: true })
  estimatedDeliveryTime: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ default: false })
  isPopular: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const BundleSchema = SchemaFactory.createForClass(Bundle);
