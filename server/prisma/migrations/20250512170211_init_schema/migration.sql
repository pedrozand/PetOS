/*
  Warnings:

  - You are about to drop the `AnimalPerdido` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idSituacao` to the `Postagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AnimalPerdido";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Status" (
    "idSituacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "situacao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comentario" (
    "idComentario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "dataComentario" DATETIME NOT NULL,
    "horaComentario" TEXT NOT NULL,
    "idAutor" INTEGER NOT NULL,
    "idPost" INTEGER NOT NULL,
    CONSTRAINT "Comentario_idAutor_fkey" FOREIGN KEY ("idAutor") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comentario_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "Postagem" ("idPost") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Curtida" (
    "idCurtida" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "dataCurtida" DATETIME NOT NULL,
    "horaCurtida" TEXT NOT NULL,
    "idPost" INTEGER NOT NULL,
    CONSTRAINT "Curtida_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curtida_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "Postagem" ("idPost") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compartilhamento" (
    "idCompartilhamento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "dataCompartilhamento" DATETIME NOT NULL,
    "horaCompartilhamento" TEXT NOT NULL,
    "idPost" INTEGER NOT NULL,
    CONSTRAINT "Compartilhamento_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compartilhamento_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "Postagem" ("idPost") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postagem" (
    "idPost" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idAnimal" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idSituacao" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "dataPost" DATETIME NOT NULL,
    "horarioPost" TEXT NOT NULL,
    "periodoPost" TEXT NOT NULL,
    "statusPost" TEXT NOT NULL,
    CONSTRAINT "Postagem_idAnimal_fkey" FOREIGN KEY ("idAnimal") REFERENCES "Animal" ("idAnimal") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Postagem_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Postagem_idSituacao_fkey" FOREIGN KEY ("idSituacao") REFERENCES "Status" ("idSituacao") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Postagem" ("dataPost", "endereco", "horarioPost", "idAnimal", "idPost", "idUser", "periodoPost", "statusPost") SELECT "dataPost", "endereco", "horarioPost", "idAnimal", "idPost", "idUser", "periodoPost", "statusPost" FROM "Postagem";
DROP TABLE "Postagem";
ALTER TABLE "new_Postagem" RENAME TO "Postagem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
