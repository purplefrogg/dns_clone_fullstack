/*
  Warnings:

  - You are about to drop the column `value` on the `PropertyField` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PropertyField" DROP COLUMN "value",
ADD COLUMN     "valueId" INTEGER;

-- CreateTable
CREATE TABLE "PropertyFieldValue" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "PropertyFieldValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyField" ADD CONSTRAINT "PropertyField_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "PropertyFieldValue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
