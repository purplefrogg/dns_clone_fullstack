/*
  Warnings:

  - Made the column `titleId` on table `ProductProperty` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProductProperty" DROP CONSTRAINT "ProductProperty_titleId_fkey";

-- AlterTable
ALTER TABLE "ProductProperty" ALTER COLUMN "titleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductProperty" ADD CONSTRAINT "ProductProperty_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "ProductPropertyTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
