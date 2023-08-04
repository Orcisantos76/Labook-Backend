import z from "zod";

export interface DeletePostInputDTO {
    idToDelete: string;
}

export type DeletePostOutputDTO = undefined;

export const DeletePostSchema = z
    .object({
        idToDelete: z
            .string({
                required_error: "'id' é obrigatória",
                invalid_type_error: "'id' deve ser do tipo string",
            })
            .min(1, "'id' deve possuir no mínimo 1 caractere"),
    }).transform((data) => data as DeletePostInputDTO);