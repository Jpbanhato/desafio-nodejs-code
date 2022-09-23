import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "../routes/routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/deptos', router);

const DB_USER = process.env.DB_USER; 
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.zu42wmu.mongodb.net/?retryWrites=true&w=majority`,
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