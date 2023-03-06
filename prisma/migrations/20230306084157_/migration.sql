/*
  Warnings:

  - You are about to drop the `ProductFilter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductPropertyField` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `value` to the `ProductProperty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductFilter" DROP CONSTRAINT "ProductFilter_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductProperty" DROP CONSTRAINT "ProductProperty_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "ProductPropertyField" DROP CONSTRAINT "ProductPropertyField_ProductPropertyId_fkey";

-- AlterTable
ALTER TABLE "ProductProperty" ADD COLUMN     "value" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductFilter";

-- DropTable
DROP TABLE "ProductPropertyField";

-- CreateTable
CREATE TABLE "_ProductToProductProperty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductProperty_AB_unique" ON "_ProductToProductProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductProperty_B_index" ON "_ProductToProductProperty"("B");

-- AddForeignKey
ALTER TABLE "_ProductToProductProperty" ADD CONSTRAINT "_ProductToProductProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductProperty" ADD CONSTRAINT "_ProductToProductProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductProperty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
