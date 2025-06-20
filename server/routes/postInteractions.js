const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkAuth = (req, res, next) => {
  next();
};

/** CURTIDAS **/

router.post("/curtidas", checkAuth, async (req, res) => {
  const { idPost, idUser } = req.body;

  try {
    const existe = await prisma.curtida.findFirst({
      where: { idPost, idUser },
    });
    if (existe) return res.status(400).json({ error: "Já curtiu esse post" });

    const curtida = await prisma.curtida.create({
      data: {
        idPost,
        idUser,
        dataCurtida: new Date(),
        horaCurtida: new Date().toLocaleTimeString(),
      },
    });
    res.json(curtida);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/curtidas/:idPost", checkAuth, async (req, res) => {
  const { idPost } = req.params;
  const { idUser } = req.body;

  try {
    await prisma.curtida.deleteMany({
      where: { idPost: Number(idPost), idUser },
    });
    res.json({ message: "Curtida removida" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** COMENTÁRIOS **/

router.post("/comentarios", checkAuth, async (req, res) => {
  const { idPost, idAutor, texto, dataComentario, horaComentario } = req.body;
  try {
    const comentario = await prisma.comentario.create({
      data: {
        idPost,
        idAutor,
        texto,
        dataComentario: new Date(dataComentario),
        horaComentario,
      },
      include: { autor: true },
    });
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** COMPARTILHAMENTOS **/

router.post("/compartilhamentos", checkAuth, async (req, res) => {
  const { idPost, idUser, dataCompartilhamento, horaCompartilhamento } =
    req.body;
  try {
    const compartilhamento = await prisma.compartilhamento.create({
      data: {
        idPost,
        idUser,
        dataCompartilhamento: new Date(dataCompartilhamento),
        horaCompartilhamento,
      },
    });
    res.json(compartilhamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
