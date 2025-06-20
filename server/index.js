const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:5173", // ou o domínio real do seu frontend
    credentials: true, // permite envio de cookies/sessão
  })
);
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

// ----------------------------------------------------------------------

// Função para o fuso-horário do post
function criarDataHoraPost(data, horario) {
  const [ano, mes, dia] = data.split("-").map(Number);
  const [hora, minuto] = horario.split(":").map(Number);
  const dataCompleta = new Date(ano, mes - 1, dia, hora, minuto);
  return dataCompleta;
}

// Rota para criar um animal
app.post("/api/animais", async (req, res) => {
  const {
    nome,
    especie,
    raca,
    porte,
    sexo,
    corPredominante,
    corOlhos,
    idade,
    descricao,
    imagensAnimal,
    cuidados,
    temperamento,
    adaptabilidade,
    socializacao,
    idUser,
  } = req.body;

  try {
    const novoAnimal = await prisma.animal.create({
      data: {
        nome,
        especie,
        raca,
        sexo,
        porte,
        corPredominante,
        corOlhos,
        idade,
        descricao,
        imagensAnimal: JSON.stringify(imagensAnimal),
        cuidados,
        temperamento,
        adaptabilidade,
        socializacao,
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
    situacao,
    endereco,
    telefonePost,
    pontoReferencia,
    dataPost,
    horarioPost,
    periodoPost,
    recompensa,
    descricaoLocal,
    localPet,
  } = req.body;

  try {
    const novaPostagem = await prisma.postagem.create({
      data: {
        idAnimal,
        idUser,
        situacao,
        endereco,
        telefonePost,
        pontoReferencia,
        dataPost: new Date(dataPost),
        horarioPost,
        periodoPost,
        recompensa,
        descricaoLocal,
        localPet,
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

// Cria animal + postagem
app.post("/api/posts", async (req, res) => {
  const {
    nomePet,
    especie,
    raca,
    sexo,
    porte,
    corPredominante,
    corOlhos,
    idade,
    descricao,
    fotos, // array de imagens
    situacao,
    local,
    telefonePost,
    pontoReferencia,
    dataDesaparecimento,
    periodo,
    recompensa,
    descricaoLocal,
    localPet,
    cuidados,
    temperamento,
    adaptabilidade,
    socializacao,
  } = req.body;

  const idUser = req.body.idUser; // assumindo autenticação ativa
  const t = new Date(); // data e hora atuais

  try {
    const animal = await prisma.animal.create({
      data: {
        nome: nomePet,
        especie,
        raca,
        sexo,
        porte,
        corPredominante,
        corOlhos,
        idade,
        descricao,
        imagensAnimal: JSON.stringify(fotos),
        cuidados: JSON.stringify(cuidados),
        temperamento: JSON.stringify(temperamento),
        adaptabilidade: JSON.stringify(adaptabilidade),
        socializacao: JSON.stringify(socializacao),
        idUser,
      },
    });

    const postagem = await prisma.postagem.create({
      data: {
        idAnimal: animal.idAnimal,
        idUser,
        situacao,
        endereco: local,
        telefonePost,
        pontoReferencia: pontoReferencia,
        dataPost: dataDesaparecimento ? new Date(dataDesaparecimento) : t,
        horarioPost: t.toTimeString().slice(0, 5),
        periodoPost: periodo,
        recompensa: recompensa || "",
        descricaoLocal,
        localPet,
        dataHoraPost: criarDataHoraPost(
          dataDesaparecimento
            ? dataDesaparecimento
            : `${t.getFullYear()}-${(t.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`,
          t.toTimeString().slice(0, 5)
        ),
      },
    });

    res.status(201).json({ postagem, animal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Não foi possível criar o anúncio." });
  }
});

// Busca todas as postagens com include do usuário e animal
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await prisma.postagem.findMany({
      include: {
        usuario: true,
        animal: true,
      },
      orderBy: {
        dataHoraPost: "desc",
      },
    });

    // Parse manual das imagensAnimal
    const postsComImagens = posts.map((post) => {
      let imagens = [];
      let cuidados = [];
      let temperamento = [];
      let adaptabilidade = [];
      let socializacao = [];

      try {
        imagens = JSON.parse(post.animal.imagensAnimal || "[]");
      } catch (e) {
        console.error("Erro ao converter imagensAnimal:", e.message);
      }

      try {
        cuidados = JSON.parse(post.animal.cuidados || "[]");
        temperamento = JSON.parse(post.animal.temperamento || "[]");
        adaptabilidade = JSON.parse(post.animal.adaptabilidade || "[]");
        socializacao = JSON.parse(post.animal.socializacao || "[]");
      } catch (e) {
        console.error("Erro ao converter características:", e.message);
      }

      return {
        ...post,
        animal: {
          ...post.animal,
          imagensAnimal: imagens,
          cuidados,
          temperamento,
          adaptabilidade,
          socializacao,
        },
      };
    });

    res.json(postsComImagens);
  } catch (error) {
    console.error("Erro ao buscar postagens:", error);
    res.status(500).json({ erro: "Erro ao buscar postagens." });
  }
});

// Rota para uplaodo das fotos dos animais
app.post("/api/upload/fotos", upload.array("fotos", 5), async (req, res) => {
  try {
    const arquivos = req.files.map((file) => file.filename);
    res.json({ arquivosSalvos: arquivos });
  } catch (err) {
    console.error("Erro ao fazer upload de imagens:", err);
    res.status(500).json({ erro: "Erro ao fazer upload das imagens." });
  }
});

// GET /api/postagens/usuario/:id
app.get("/api/postagens/usuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postagens = await prisma.postagem.findMany({
      where: { idUser: Number(id) },
      include: {
        animal: true,
        usuario: true,
      },
    });

    const postagensTratadas = postagens.map((post) => {
      let imagens = [];
      let cuidados = [];
      let temperamento = [];
      let adaptabilidade = [];
      let socializacao = [];

      try {
        imagens = JSON.parse(post.animal.imagensAnimal || "[]");
      } catch (e) {
        console.error("Erro ao converter imagensAnimal:", e.message);
      }

      try {
        cuidados = JSON.parse(post.animal.cuidados || "[]");
        temperamento = JSON.parse(post.animal.temperamento || "[]");
        adaptabilidade = JSON.parse(post.animal.adaptabilidade || "[]");
        socializacao = JSON.parse(post.animal.socializacao || "[]");
      } catch (e) {
        console.error("Erro ao converter características:", e.message);
      }

      return {
        ...post,
        animal: {
          ...post.animal,
          imagensAnimal: imagens,
          cuidados,
          temperamento,
          adaptabilidade,
          socializacao,
        },
      };
    });

    res.json(postagensTratadas);
  } catch (error) {
    console.error("Erro ao buscar postagens por usuário:", error);
    res.status(500).json({ erro: "Erro ao buscar postagens" });
  }
});

// Atualizar uma postagem existente (inclui atualização do animal relacionado)
app.put(
  "/api/posts/:idPost",
  upload.array("novasImagens", 5),
  async (req, res) => {
    const { idPost } = req.params;

    try {
      // Extrai os dados JSON enviados no campo 'json'
      const dados = JSON.parse(req.body.json);

      const postagem = await prisma.postagem.findUnique({
        where: { idPost: Number(idPost) },
      });

      if (!postagem) {
        return res.status(404).json({ erro: "Postagem não encontrada" });
      }

      // Obtém imagens novas (nomes dos arquivos)
      const novasImagens = req.files.map((file) => file.filename);

      // Recupera as imagens antigas (se existirem) e adiciona as novas
      const imagensAntigas = Array.isArray(dados.imagensAnimal)
        ? dados.imagensAnimal
        : [];

      const todasImagens = [...imagensAntigas, ...novasImagens];

      // Atualiza o animal
      await prisma.animal.update({
        where: { idAnimal: postagem.idAnimal },
        data: {
          nome: dados.nome,
          especie: dados.especie,
          raca: dados.raca,
          sexo: dados.sexo,
          porte: dados.porte,
          corPredominante: dados.corPredominante,
          corOlhos: dados.corOlhos,
          idade: dados.idade,
          descricao: dados.descricao,
          imagensAnimal: JSON.stringify(todasImagens),
          cuidados: JSON.stringify(dados.cuidados || []),
          temperamento: JSON.stringify(dados.temperamento || []),
          adaptabilidade: JSON.stringify(dados.adaptabilidade || []),
          socializacao: JSON.stringify(dados.socializacao || []),
        },
      });

      // Atualiza a postagem
      const postagemAtualizada = await prisma.postagem.update({
        where: { idPost: Number(idPost) },
        data: {
          situacao: dados.situacao,
          endereco: dados.endereco,
          telefonePost: dados.telefonePost,
          pontoReferencia: dados.pontoReferencia,
          dataPost: new Date(dados.dataPost),
          horarioPost: dados.horarioPost || "12:00",
          periodoPost: dados.periodoPost,
          recompensa: dados.recompensa,
          descricaoLocal: dados.descricaoLocal,
          localPet: dados.localPet,
        },
      });

      res.json(postagemAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar postagem com imagens:", error);
      res.status(500).json({ erro: "Erro ao atualizar postagem." });
    }
  }
);
