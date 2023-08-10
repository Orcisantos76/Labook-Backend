import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { HashManager } from './services/HashManager';

const app = express();
app.use(cors());
app.use(express.json());



app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})

app.get("/ping", (req,res)=>{
    res.send("Pong! 09/08")
})


//  para criar senha hash de arthur123, sai no terminal...
// const hashManager = new HashManager()
// hashManager.hash("Arthur123").then((res)=>{
//     console.log(res)
//     // $2a$12$WFMNSqnYrtZeK5JLRSXTduExPo9Se4Ftowni/7wS7mWvEV0rlIpZG

// })
