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
    console.error("Erro ao criar usuário:", error);

    // Trata erro de e-mail duplicado (código P2002 do Prisma)
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return res.status(409).json({
        erro: "O e-mail informado já está cadastrado. Tente outro e-mail.",
      });
    }

    // Outros erros genéricos
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
});

app.listen(3001, () => {
  console.log("Servidor backend rodando na porta 3001");
});

// Rota de login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    // Retorne dados úteis (nunca a senha!)
    res.json({
      idUser: usuario.idUser,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao fazer login", detalhes: error.message });
  }
});

// Buscar dados do usuário pelo idUser (GET)
app.get("/api/usuarios/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { idUser: Number(idUser) },
      select: {
        idUser: true,
        nome: true,
        sobrenome: true,
        telefone: true,
        email: true,
        cep: true,
        numeroCasa: true,
        fotoPerfil: true,
      },
    });
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar usuário", detalhes: error.message });
  }
});

// Atualizar dados do usuário pelo idUser (PUT)
app.put("/api/usuarios/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const { nome, sobrenome, telefone, email, cep, numeroCasa } = req.body;

  try {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { idUser: Number(idUser) },
      data: { nome, sobrenome, telefone, email, cep, numeroCasa },
    });
    res.json(usuarioAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao atualizar usuário", detalhes: error.message });
  }
});

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `foto-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Upload de foto de perfil
app.post(
  "/api/usuarios/:idUser/foto",
  upload.single("fotoPerfil"),
  async (req, res) => {
    const { idUser } = req.params;
    const fotoPerfil = req.file.filename;

    try {
      const usuarioAtualizado = await prisma.usuario.update({
        where: { idUser: parseInt(idUser) },
        data: { fotoPerfil },
      });

      res.json({ fotoPerfil });
    } catch (error) {
      console.error("Erro ao salvar foto:", error);
      res.status(500).json({ erro: "Erro ao salvar foto." });
    }
  }
);

// Tornar a pasta de uploads pública
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rota para criar um animal
app.post("/api/animais", async (req, res) => {
  const {
    nome,
    especie,
    raca,
    porte,
    corPredominante,
    corOlhos,
    idade,
    descricao,
    imagem,
    idUser,
  } = req.body;

  try {
    const novoAnimal = await prisma.animal.create({
      data: {
        nome,
        especie,
        raca,
        porte,
        corPredominante,
        corOlhos,
        idade,
        descricao,
        imagem,
        idUser,
      },
    });

    res.status(201).json(novoAnimal);
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    res.status(500).json({ erro: "Erro ao salvar animal." });
  }
});

// Rota para criar um post
app.post("/api/postagens", async (req, res) => {
  const {
    idAnimal,
    idUser,
    idSituacao,
    endereco,
    dataPost,
    horarioPost,
    periodoPost,
    statusPost,
  } = req.body;

  try {
    const novaPostagem = await prisma.postagem.create({
      data: {
        idAnimal,
        idUser,
        idSituacao,
        endereco,
        dataPost: new Date(dataPost),
        horarioPost,
        periodoPost,
        statusPost,
      },
    });

    res.status(201).json(novaPostagem);
  } catch (error) {
    console.error("Erro ao criar postagem:", error);
    res.status(500).json({ erro: "Erro ao salvar postagem." });
  }
});

app.get("/api/postagens", async (req, res) => {
  try {
    const postagens = await prisma.postagem.findMany({
      include: {
        usuario: true,
        animal: true,
        status: true,
      },
      orderBy: {
        dataPost: "desc",
      },
    });

    res.json(postagens);
  } catch (error) {
    console.error("Erro ao buscar postagens:", error);
    res.status(500).json({ erro: "Erro ao buscar postagens" });
  }
});
