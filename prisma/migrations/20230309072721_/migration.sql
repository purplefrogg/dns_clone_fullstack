/*
  Warnings:

  - You are about to drop the `_ProductPropertyToProductPropertyTitle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductPropertyToProductPropertyTitle" DROP CONSTRAINT "_ProductPropertyToProductPropertyTitle_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductPropertyToProductPropertyTitle" DROP CONSTRAINT "_ProductPropertyToProductPropertyTitle_B_fkey";

-- AlterTable
ALTER TABLE "ProductProperty" ADD COLUMN     "titleId" INTEGER;

-- DropTable
DROP TABLE "_ProductPropertyToProductPropertyTitle";

-- AddForeignKey
ALTER TABLE "ProductProperty" ADD CONSTRAINT "ProductProperty_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "ProductPropertyTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
