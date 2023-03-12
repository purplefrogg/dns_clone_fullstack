/*
  Warnings:

  - Made the column `value` on table `PropertyField` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PropertyField" DROP CONSTRAINT "PropertyField_value_fkey";

-- AlterTable
ALTER TABLE "PropertyField" ALTER COLUMN "value" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PropertyField" ADD CONSTRAINT "PropertyField_value_fkey" FOREIGN KEY ("value") REFERENCES "PropertyFieldValue"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
