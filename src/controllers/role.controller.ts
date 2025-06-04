import { Request, Response } from 'express';
import { RoleModel } from '../models/roleModel';
import { CreateRoleDto } from '../validations/role.validation';

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await RoleModel.find({});
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener roles.' });
  }
};

export const createRole = async (req: Request, res: Response) => {
  const { nombre, descripcion } = req.body as CreateRoleDto;

  try {
    const existingRole = await RoleModel.findOne({ nombre });
    if (existingRole) {
      return res.status(409).json({ message: `El rol con el nombre '${nombre}' ya existe.` });
    }

    const newRole = new RoleModel({ nombre, descripcion });
    await newRole.save();
    res.status(201).json({ message: 'Rol creado exitosamente.', role: newRole });
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear el rol.' });
  }
};
