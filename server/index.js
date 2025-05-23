const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do PetOS funcionando!");
});

// Rota de cadastro de usuário
app.post("/api/usuarios", async (req, res) => {
  const { nome, sobrenome, telefone, email, senha, cep, numeroCasa } = req.body;

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        sobrenome,
        telefone,
        email,
        senha,
        cep,
        numeroCasa,
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao criar usuário.", detalhes: error.message });
  }
});

app.listen(3001, () => {
  console.log("Servidor backend rodando na porta 3001");
});
