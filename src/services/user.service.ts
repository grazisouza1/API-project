//Camada service pega os dados que o usuário inseriu, e criptografa, ou traduz para enviar para a camada repository
import { createUser, deleteUser, findAllUsers, findUserByEmail, findUserById, updateUser, } from "../repositories/user.repository";
import { CreateUserDTO } from "../dtos/user.dto";

export const createUserService = async (data:CreateUserDTO) => {
    const user = await findUserByEmail(data.email) //Tem usuário com esse email? Se sim, joga nessa pasta

    if (user) throw new Error('E-mail já cadastrado!') //Se tem algum email em user, a mensagem será mostrada, já que existe um usuário com o mesmo email

    return await createUser(data) //Se não tiver usuário com esse email, crie um
}

export const findAllUsersService = async () => {
    return await findAllUsers()
}

export const deleteUserService = async (id: number) => {
    const user = await findUserById(id)

    if (!user) throw new Error('Usuário não encontrado')

    return await deleteUser(id)
}

export const updateUserService = async (id: number, data: CreateUserDTO) => {
    const user = await findUserById(id)

    if(!user) throw new Error('Uusário não encontrado')

    return await updateUser(user.id, data)
}