import { Router } from 'express';
import { createUser, getUsers, getUsersWithRoles } from '../controllers/user.controller';
import { validateBody } from '../middleware/validation.middleware';
import { CreateUserDto } from '../validations/user.validation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getUsers));
router.post('/', validateBody(CreateUserDto), asyncHandler(createUser));
router.get('/with-roles', asyncHandler(getUsersWithRoles));  

export default router;