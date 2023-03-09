/*
  Warnings:

  - The primary key for the `ProductPropertyTitle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductPropertyTitle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `ProductPropertyTitle` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductProperty" DROP CONSTRAINT "ProductProperty_titleId_fkey";

-- AlterTable
ALTER TABLE "ProductProperty" ALTER COLUMN "titleId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProductPropertyTitle" DROP CONSTRAINT "ProductPropertyTitle_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "ProductPropertyTitle_title_key" ON "ProductPropertyTitle"("title");

-- AddForeignKey
ALTER TABLE "ProductProperty" ADD CONSTRAINT "ProductProperty_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "ProductPropertyTitle"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
