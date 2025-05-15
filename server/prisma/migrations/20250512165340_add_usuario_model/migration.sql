-- CreateTable
CREATE TABLE "Usuario" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "numeroCasa" TEXT NOT NULL,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Animal" (
    "idAnimal" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "corPredominante" TEXT NOT NULL,
    "corOlhos" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "Animal_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Postagem" (
    "idPost" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idAnimal" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "dataPost" DATETIME NOT NULL,
    "horarioPost" TEXT NOT NULL,
    "periodoPost" TEXT NOT NULL,
    "statusPost" TEXT NOT NULL,
    CONSTRAINT "Postagem_idAnimal_fkey" FOREIGN KEY ("idAnimal") REFERENCES "Animal" ("idAnimal") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Postagem_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
