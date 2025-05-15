/*
  Warnings:

  - You are about to drop the column `cor` on the `AnimalPerdido` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AnimalPerdido` table. All the data in the column will be lost.
  - You are about to drop the column `fotos` on the `AnimalPerdido` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `AnimalPerdido` table. All the data in the column will be lost.
  - Added the required column `corPredominante` to the `AnimalPerdido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgPet` to the `AnimalPerdido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeAnimal` to the `AnimalPerdido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeUser` to the `AnimalPerdido` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnimalPerdido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeUser" TEXT NOT NULL,
    "nomeAnimal" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imgPet" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "corPredominante" TEXT NOT NULL,
    "corOlhos" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "localDesap" TEXT NOT NULL,
    "dataDesap" DATETIME NOT NULL
);
INSERT INTO "new_AnimalPerdido" ("corOlhos", "dataDesap", "descricao", "especie", "id", "idade", "localDesap", "porte", "raca", "sexo") SELECT "corOlhos", "dataDesap", "descricao", "especie", "id", "idade", "localDesap", "porte", "raca", "sexo" FROM "AnimalPerdido";
DROP TABLE "AnimalPerdido";
ALTER TABLE "new_AnimalPerdido" RENAME TO "AnimalPerdido";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
