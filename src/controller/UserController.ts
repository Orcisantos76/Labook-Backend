import { ZodError } from "zod";
import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseErros";
import { SignupSchema } from "../dtos/user/signup.dto";
import { LoginOutputDTO, LoginSchema } from "../dtos/user/login.dtos";
import { GetUsersSchema } from "../dtos/user/getUsers.dtos";

export class UserController{
    constructor(
        private userBusiness: UserBusiness
    ){}

    public signup = async (req: Request, res: Response) => {
        try {
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            const outpupt = await this.userBusiness.signup(input)
            res.status(201).send(outpupt)


        } catch (error) {
            console.log(error)

            if (error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public login = async (req: Request, res: Response)=>{
        try {
            const input = LoginSchema.parse({ 
                email: req.body.email,
                password: req.body.password
            })
            const outpupt = await this.userBusiness.login(input)
            res.status(200).send(outpupt)
            
        }  catch (error) {
            console.log(error)

            if (error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getUsers = async (req: Request, res: Response)=>{
        try {
            const input = GetUsersSchema.parse({
                q: req.query.q,
                token: req.headers.authorization
            })

            const outpupt = await this.userBusiness.getUsers(input);

            res.status(200).send(outpupt);
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado")
            }
        }
    }
}