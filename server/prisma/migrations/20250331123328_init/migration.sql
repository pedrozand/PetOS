-- CreateTable
CREATE TABLE "AnimalPerdido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "corOlhos" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "localDesap" TEXT NOT NULL,
    "dataDesap" DATETIME NOT NULL,
    "fotos" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
