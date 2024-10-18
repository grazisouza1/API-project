import { authUserService, createUserService, deleteUserService, findAllUsersService, findUserByIdWithTasksService, updateUserService } from '../services/user.service'
import { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await createUserService(req.body)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const findAllUsers = async (req: Request, res: Response) => {
    const users = await findAllUsersService()
    return res.status(200).json(users)
}

// export async function deleteUser(req: Request, res: Response){}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        await deleteUserService(Number(req.params.id))
        return res.status(200).json({msg: 'Usuário removido com sucesso'})
        // .status(204).send()
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await updateUserService(Number(req.params.id),req.body)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const findUserByIdWithTasks = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)){
        return res.status(400).json({message: "ID Inválido"})
    }

    const user = await findUserByIdWithTasksService(id)
    return res.status(200).json(user)
}

export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
          return res.status(400).json({ message: 'E-mail e senha são obrigatórios' })
        }
        const token = await authUserService(email, password)
        return res.status(200).json({ token })
      } catch (error) {
        return res.status(400).json({ message: error })
      }
}