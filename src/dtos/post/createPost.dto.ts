import z from "zod";

export interface CreatePostInputDTO {
    creatorName: string;
    token: string;
    content: string;
}

export type CreatePostOutputDTO = undefined;

export const CreatePostSchema = z
    .object({
        creatorName: z.string().min(2),
        token: z.string().min(1),
        content: z.string().min(1),
    }).transform((data) => data as CreatePostInputDTO);