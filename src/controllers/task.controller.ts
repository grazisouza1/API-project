import { Response, Request } from 'express'
import { createTaskService, deleteTaskService, findTaskByIdService, updateTaskService } from '../services/task.service'
import { findTaskById } from '../repositories/task.repository'

//controller é o intermediário entre o usuário e minha regra

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = await createTaskService(req.body)
        return res.status(201).json(task)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const findAllTasks = async (req: Request, res: Response) => {
    const task = findTaskByIdService(Number(req.params.id))
    return res.status(200).json(task)
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await updateTaskService(Number(req.params.id), req.body)
        return res.status(200).json(task)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        await deleteTaskService(Number(req.params.id))
        return res.status(204).send()
    } catch (error) {
        return res.status(400).json(error)
    }
}