//Camada service pega os dados que o usuário inseriu, e criptografa, ou traduz para enviar para a camada repository
import { createUser, deleteUser, findAllUsers, findUserByIdWithTasks, findUserByEmail, findUserById, updateUser, } from "../repositories/user.repository";
import { CreateUserDTO } from "../dtos/user.dto";
import * as bcrypt from 'bcrypt'
import * as jose from 'jose'

export const createUserService = async (data:CreateUserDTO) => {
    const user = await findUserByEmail(data.email) //Tem usuário com esse email? Se sim, joga nessa pasta

    if (user) throw new Error('E-mail já cadastrado!') //Se tem algum email em user, a mensagem será mostrada, já que existe um usuário com o mesmo email

    const password = await bcrypt.hash(data.password, 10)

    return await createUser({...data, password}) //Se não tiver usuário com esse email, crie um
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

    if(!user) throw new Error('Usuário não encontrado')

    return await updateUser(user.id, data)
}

export const findUserByIdWithTasksService = async (id: number) => {
    return findUserByIdWithTasks(id)
}

export const authUserService = async (email: string, password: string) => {
    const user = await findUserByEmail(email)
    if (!user) throw new Error('Usuário não encontrado')

    const isValid = await bcrypt.compare(password, user.password) //Compara com a senha cadastrada com a senha digitada

    if (!isValid) throw new Error('Senha inválida')

    const payload = {id: user.id, email: user.email}
    const secret = new TextEncoder().encode('testechavesecretagrande0001')
    const alg = 'HS256'

    const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('http://localhost:3000')
    .setSubject('user')
    .setExpirationTime('1h')
    .sign(secret)

    return token 
}