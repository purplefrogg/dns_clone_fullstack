/*
  Warnings:

  - The `titleId` column on the `ProductProperty` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "ProductProperty" DROP CONSTRAINT "ProductProperty_titleId_fkey";

-- DropIndex
DROP INDEX "ProductPropertyTitle_title_key";

-- AlterTable
ALTER TABLE "ProductProperty" DROP COLUMN "titleId",
ADD COLUMN     "titleId" INTEGER;

-- AlterTable
ALTER TABLE "ProductPropertyTitle" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductPropertyTitle_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ProductProperty" ADD CONSTRAINT "ProductProperty_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "ProductPropertyTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
