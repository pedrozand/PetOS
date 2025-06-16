/*
  Warnings:

  - Made the column `imagensAnimal` on table `Animal` required. This step will fail if there are existing NULL values in that column.

*/
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
    "imagensAnimal" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "Animal_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("corOlhos", "corPredominante", "descricao", "especie", "idAnimal", "idUser", "idade", "imagensAnimal", "nome", "porte", "raca", "sexo") SELECT "corOlhos", "corPredominante", "descricao", "especie", "idAnimal", "idUser", "idade", "imagensAnimal", "nome", "porte", "raca", "sexo" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
