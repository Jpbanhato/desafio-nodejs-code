import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routerDepto from "./routesDepto.js";
import routerRole from "./routesRole.js";
import routerMember from "./routesMember.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/deptos', routerDepto);
app.use('/roles', routerRole);
app.use('/members', routerMember);

// const date = new Date();
// console.log(date);

const DB_USER = process.env.DB_USER; 
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://user:user@cluster0.nyazlgb.mongodb.net/?retryWrites=true&w=majority`,
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    // }
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen("3333", () => {
      console.log("O servidor foi inicializado em http://localhost:3333");
    });
  })
  .catch((err) => console.log(err));