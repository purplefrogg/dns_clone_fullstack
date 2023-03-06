/*
  Warnings:

  - You are about to drop the column `propertyId` on the `PropertyField` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PropertyField" DROP CONSTRAINT "PropertyField_propertyId_fkey";

-- AlterTable
ALTER TABLE "PropertyField" DROP COLUMN "propertyId";

-- CreateTable
CREATE TABLE "_ProductPropertyToPropertyField" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductPropertyToPropertyField_AB_unique" ON "_ProductPropertyToPropertyField"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductPropertyToPropertyField_B_index" ON "_ProductPropertyToPropertyField"("B");

-- AddForeignKey
ALTER TABLE "_ProductPropertyToPropertyField" ADD CONSTRAINT "_ProductPropertyToPropertyField_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductProperty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPropertyToPropertyField" ADD CONSTRAINT "_ProductPropertyToPropertyField_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
