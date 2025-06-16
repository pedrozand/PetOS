/*
  Warnings:

  - You are about to drop the column `idSituacao` on the `Postagem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postagem" (
    "idPost" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "situacao" TEXT NOT NULL,
    "idAnimal" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
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
INSERT INTO "new_Postagem" ("dataPost", "endereco", "horarioPost", "idAnimal", "idPost", "idUser", "periodoPost", "pontoReferencia", "recompensa", "situacao", "telefonePost") SELECT "dataPost", "endereco", "horarioPost", "idAnimal", "idPost", "idUser", "periodoPost", "pontoReferencia", "recompensa", "situacao", "telefonePost" FROM "Postagem";
DROP TABLE "Postagem";
ALTER TABLE "new_Postagem" RENAME TO "Postagem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
