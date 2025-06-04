// src/models/userModel.ts
import { Schema, model, Types } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema = new Schema<IUser>({
  nombres: { type: String, required: true, trim: true },
  apellidos: { type: String, required: true, trim: true },
  identificacion: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  rolId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
}, {
  timestamps: true,
});

export const UserModel = model<IUser>('User', UserSchema);