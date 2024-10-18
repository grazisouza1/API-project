import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean } from "class-validator"

export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    title!: string

    @IsOptional()
    @IsNotEmpty()
    completed?: boolean

    @IsInt()
    @IsNotEmpty()
    userId!: number
}

export class UpdateTaskDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string

    @IsOptional()
    @IsBoolean()
    completed?: boolean
}