import z from "zod";
import { UserModel } from "../../models/User";

export interface GetUsersInputDTO {
    q: string;
    token: string; 
}
export type GetUsersOutputDTO = UserModel[];

export const GetUsersSchema = z
    .object({
        q: z.string({invalid_type_error: "'token' deve ser do tipo string",})
            .min(1, "'token' deve possuir no mínimo 1 caractere")
            .optional(),

    }).transform((data) => data as GetUsersInputDTO);