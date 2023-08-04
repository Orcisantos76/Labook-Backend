import z from "zod";

export interface DeleteUsersInputDTO{
    idToDelete: string;
    
}

export interface DeleteUsersOutputDTO{
    message: string;
    user:{
        id: string;
        name: string;
        email: string;
    };
}

export const DeleteUsersSchema = z.object({
    idToDelete:z
    .string({
        required_error: "Id é obrigatório",
        invalid_type_error: "Id deve ser uma string"
    })
    .min(1, "Id deve possuir ao menos a caractere")
}).transform((data)=>data as DeleteUsersInputDTO);