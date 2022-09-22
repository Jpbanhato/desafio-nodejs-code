import express from 'express'
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*"
}));

const deptos = ['VPGG', 'Comercial', 'Marketing', 'Presidencia', 'Projetos'];

app.get('/deptos', (req, res) => {
  // console.log("GET /");
  // res.status(200).send("Hello World");
  return res.json(deptos);
});

app.get('/deptos/:index', (req, res) => {
  const { index } = req.params;
  return res.json(deptos[index]);
});

app.post('/deptos', (req, res) => {
  const {name} = req.body;
  deptos.push(name);
  return res.json(deptos);
});

app.put('/deptos/:index', (req, res) => {
  const {index} = req.params;
  const {name} = req.body;
  deptos[index] = name;
  return res.json(deptos);
});

app.delete('/deptos/:index', (req, res) => {
  const {index} = req.params;
  deptos.splice(index, 1);
  return res.json({message: "Depto deletado com sucesso"});
});

app.listen('3333', () => {
  console.log("O servidor foi inicializado em http://localhost:3333");
});