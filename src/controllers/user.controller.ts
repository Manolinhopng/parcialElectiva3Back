import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { RoleModel } from "../models/roleModel";
import { CreateUserDto } from "../validations/user.validation";
import { IUser, IUserWithRoleName } from "../interfaces/user.interface";
import { Types } from "mongoose";

// GET /api/users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener usuarios." });
  }
};

// POST /api/users
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { nombres, apellidos, identificacion, email, rolId } = req.body as CreateUserDto;

  try {
    const rolesCount = await RoleModel.countDocuments();
    if (rolesCount === 0) {
      res.status(412).json({
        message: "No se pueden crear usuarios. Primero debe agregar al menos un rol.",
      });
      return;
    }

    const roleExists = await RoleModel.findById(rolId);
    if (!roleExists) {
      res.status(400).json({ message: "El ID de rol proporcionado no existe." });
      return;
    }

    const existingUserByIdent = await UserModel.findOne({ identificacion });
    if (existingUserByIdent) {
      res.status(409).json({
        message: `Ya existe un usuario con la identificación '${identificacion}'.`,
      });
      return;
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      res.status(409).json({
        message: `Ya existe un usuario con el correo electrónico '${email}'.`,
      });
      return;
    }

    const newUser = new UserModel({
      nombres,
      apellidos,
      identificacion,
      email,
      rolId: new Types.ObjectId(rolId),
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente.", user: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor al crear el usuario." });
  }
};

export const getUsersWithRoles = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}).populate("rolId", "nombre");

    const usersWithRoles: IUserWithRoleName[] = users.map((user) => {
      type PopulatedUser = Omit<IUser, "rolId"> & { rolId: { nombre: string } };

      const populatedUser = user.toObject() as unknown as PopulatedUser;
      return {
        id: String(populatedUser._id),
        fullName: `${populatedUser.nombres} ${populatedUser.apellidos}`,
        rolNombre: populatedUser.rolId?.nombre || "Rol no definido",
      };
    });

    res.status(200).json(usersWithRoles);
  } catch (error) {
    console.error("Error al obtener usuarios con roles:", error);
    res
      .status(500)
      .json({
        message: "Error interno del servidor al obtener usuarios con roles.",
      });
  }
};
