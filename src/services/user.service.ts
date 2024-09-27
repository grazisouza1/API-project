//Camada service pega os dados que o usuário inseriu, e criptografa, ou traduz para enviar para a camada repository
import { createUser, findUserByEmail } from "../repositories/user.repository";

interface CreateUserDTO {
    name: string
    email: string
    password: string
}

export const createUserService = async (data:CreateUserDTO) => {
    const user = await findUserByEmail(data.email) //Tem usuário com esse email? Se sim, joga nessa pasta

    if (user) throw new Error('E-mail já cadastrado!') //Se tem algum email em user, a mensagem será mostrada, já que existe um usuário com o mesmo email

    return await createUser(data) //Se não tiver usuário com esse email, crie um
}