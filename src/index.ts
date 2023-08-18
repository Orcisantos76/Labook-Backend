import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { HashManager } from './services/HashManager';
import { userRouter } from './routes/userRouter';
import { postRouter } from './routes/postRouter';

const app = express();
app.use(cors());
app.use(express.json());



app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/ping", (req,res)=>{
    res.send("Pong! Só de teste 2")
});


//  para criar senha hash de arthur123, sai no terminal...
// const hashManager = new HashManager()
// hashManager.hash("Arthur123").then((res)=>{
//     console.log(res)
//     // $2a$12$WFMNSqnYrtZeK5JLRSXTduExPo9Se4Ftowni/7wS7mWvEV0rlIpZG

// })
