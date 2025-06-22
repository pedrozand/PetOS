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
    "dataHoraPost" DATETIME,
    "recompensa" TEXT NOT NULL,
    "descricaoLocal" TEXT,
    "localPet" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Postagem_idAnimal_fkey" FOREIGN KEY ("idAnimal") REFERENCES "Animal" ("idAnimal") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Postagem_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Postagem" ("dataHoraPost", "dataPost", "descricaoLocal", "endereco", "horarioPost", "idAnimal", "idPost", "idUser", "localPet", "periodoPost", "pontoReferencia", "recompensa", "situacao", "telefonePost") SELECT "dataHoraPost", "dataPost", "descricaoLocal", "endereco", "horarioPost", "idAnimal", "idPost", "idUser", "localPet", "periodoPost", "pontoReferencia", "recompensa", "situacao", "telefonePost" FROM "Postagem";
DROP TABLE "Postagem";
ALTER TABLE "new_Postagem" RENAME TO "Postagem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
