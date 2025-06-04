// src/interfaces/role.interface.ts
import { Document } from 'mongoose';

export interface IRole extends Document {
  nombre: string;
  descripcion?: string;
}