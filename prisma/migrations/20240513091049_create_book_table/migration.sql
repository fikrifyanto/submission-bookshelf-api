-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "readPage" INTEGER NOT NULL,
    "reading" BOOLEAN NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "insertedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
