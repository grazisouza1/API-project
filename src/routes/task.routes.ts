import { Router } from 'express'
import { createTask, findAllTasks, deleteTask, updateTask } from "../controllers/task.controller";
import { validate } from "../middlewares/validate.middleware";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/task.dto";

const router = Router()

router.post('/', validate(CreateTaskDTO), createTask)
router.get('/', findAllTasks)
router.delete('/:id', deleteTask)
router.patch('/:id', updateTask)

export default router