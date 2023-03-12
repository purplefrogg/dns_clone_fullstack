/*
  Warnings:

  - You are about to drop the column `value` on the `PropertyField` table. All the data in the column will be lost.
  - You are about to drop the `PropertyFieldValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PropertyField" DROP CONSTRAINT "PropertyField_value_fkey";

-- AlterTable
ALTER TABLE "PropertyField" DROP COLUMN "value",
ADD COLUMN     "FieldValueId" INTEGER;

-- DropTable
DROP TABLE "PropertyFieldValue";

-- CreateTable
CREATE TABLE "FieldValue" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "FieldValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyField" ADD CONSTRAINT "PropertyField_FieldValueId_fkey" FOREIGN KEY ("FieldValueId") REFERENCES "FieldValue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
