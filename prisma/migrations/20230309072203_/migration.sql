/*
  Warnings:

  - You are about to drop the column `title` on the `ProductProperty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductProperty" DROP COLUMN "title";

-- CreateTable
CREATE TABLE "ProductPropertyTitle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ProductPropertyTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductPropertyToProductPropertyTitle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductPropertyToProductPropertyTitle_AB_unique" ON "_ProductPropertyToProductPropertyTitle"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductPropertyToProductPropertyTitle_B_index" ON "_ProductPropertyToProductPropertyTitle"("B");

-- AddForeignKey
ALTER TABLE "_ProductPropertyToProductPropertyTitle" ADD CONSTRAINT "_ProductPropertyToProductPropertyTitle_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductProperty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPropertyToProductPropertyTitle" ADD CONSTRAINT "_ProductPropertyToProductPropertyTitle_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductPropertyTitle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
