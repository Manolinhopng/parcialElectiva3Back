import { Document, Types } from 'mongoose';
import { IRole } from './role.interface';

export interface IUser extends Document {
  nombres: string;
  apellidos: string;
  identificacion: string;
  email: string;
  rolId: Types.ObjectId; 
  role?: IRole;
}

export interface IUserWithRoleName {
  id: string;
  fullName: string;
  rolNombre: string;
}