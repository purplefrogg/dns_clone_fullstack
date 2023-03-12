/*
  Warnings:

  - Made the column `FieldValueId` on table `PropertyField` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PropertyField" DROP CONSTRAINT "PropertyField_FieldValueId_fkey";

-- AlterTable
ALTER TABLE "PropertyField" ALTER COLUMN "FieldValueId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PropertyField" ADD CONSTRAINT "PropertyField_FieldValueId_fkey" FOREIGN KEY ("FieldValueId") REFERENCES "FieldValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
