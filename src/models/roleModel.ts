import { Schema, model } from 'mongoose';
import { IRole } from '../interfaces/role.interface';

const RoleSchema = new Schema<IRole>({
  nombre: { type: String, required: true, unique: true, trim: true },
  descripcion: { type: String, trim: true, default: '' },
}, {
  timestamps: true, 
});

export const RoleModel = model<IRole>('Role', RoleSchema);