
import { Router } from 'express';
import { getRoles, createRole } from '../controllers/role.controller';
import { validateBody } from '../middleware/validation.middleware';
import { CreateRoleDto } from '../validations/role.validation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getRoles));
router.post('/', validateBody(CreateRoleDto), asyncHandler(createRole));

export default router;
