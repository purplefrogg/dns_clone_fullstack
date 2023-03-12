/*
  Warnings:

  - Made the column `aboutId` on table `PropertyField` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PropertyField" DROP CONSTRAINT "PropertyField_aboutId_fkey";

-- AlterTable
ALTER TABLE "PropertyField" ALTER COLUMN "aboutId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PropertyField" ADD CONSTRAINT "PropertyField_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "PropertyFieldAbout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
