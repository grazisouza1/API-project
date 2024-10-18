import { authenticateUser, createUser } from "../controllers/user.controller";
import { Router } from 'express'
import { deleteUser, findAllUsers, updateUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { CreateUserDTO } from "../dtos/user.dto";
import { findUserByIdWithTasks } from "../repositories/user.repository";


const router = Router()

router.post('/', validate(CreateUserDTO), createUser)
router.get('/', findAllUsers)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)
router.get('/:id/tasks', findUserByIdWithTasks)
router.post('/authenticate', authenticateUser)

export default router