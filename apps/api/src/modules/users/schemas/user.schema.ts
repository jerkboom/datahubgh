import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false })
  name?: string;

  @Prop({ unique: true, sparse: true })
  username?: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop({ unique: true, required: true, index: true })
  phone: string;

  @Prop({ required: false })
  password?: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Prop({ type: [String], default: [] })
  savedNumbers: string[];

  @Prop({ default: 0.0 })
  walletBalance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
