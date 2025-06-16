/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `imagem` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `statusPost` on the `Postagem` table. All the data in the column will be lost.
  - Added the required column `sexo` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pontoReferencia` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recompensa` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacao` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefonePost` to the `Postagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Status";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "idAnimal" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "corPredominante" TEXT NOT NULL,
    "corOlhos" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagensAnimal" TEXT,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "Animal_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("corOlhos", "corPredominante", "descricao", "especie", "idAnimal", "idUser", "idade", "nome", "porte", "raca") SELECT "corOlhos", "corPredominante", "descricao", "especie", "idAnimal", "idUser", "idade", "nome", "porte", "raca" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Postagem" (
    "idPost" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "situacao" TEXT NOT NULL,
    "idAnimal" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idSituacao" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefonePost" TEXT NOT NULL,
    "periodoPost" TEXT NOT NULL,
    "pontoReferencia" TEXT NOT NULL,
    "dataPost" DATETIME NOT NULL,
    "horarioPost" TEXT NOT NULL,
    "recompensa" TEXT NOT NULL,
    CONSTRAINT "Postagem_idAnimal_fkey" FOREIGN KEY ("idAnimal") REFERENCES "Animal" ("idAnimal") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Postagem_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Postagem" ("dataPost", "endereco", "horarioPost", "idAnimal", "idPost", "idSituacao", "idUser", "periodoPost") SELECT "dataPost", "endereco", "horarioPost", "idAnimal", "idPost", "idSituacao", "idUser", "periodoPost" FROM "Postagem";
DROP TABLE "Postagem";
ALTER TABLE "new_Postagem" RENAME TO "Postagem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
