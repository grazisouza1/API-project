import { Request, Response } from "express";
import { createUserService, deleteUserService, findAllUsersService, updateUserService } from "../services/user.service"; //Importante importar do service

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await createUserService(req.body)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({message: 'Erro ao cadastrar'})
    }
}

export const findAllUsers = async (req: Request, res: Response) => {
    const users = await findAllUsersService()
    return res.status(200).json(users)
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await deleteUserService(Number(req.params.id))
        return res.status(200).json({msg: 'Usuário removido com sucesso'})
        //status(204).send
    } catch (error) {

    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await updateUserService(Number(req.params.id), req.body)
        return res.status(200).json(user)
    } catch(error) {
        return res.status(400).json({error})
    }
}