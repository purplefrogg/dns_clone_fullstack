/*
  Warnings:

  - You are about to drop the `_ProductPropertyToPropertyField` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ProductPropertyId` to the `PropertyField` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductProperty" DROP CONSTRAINT "ProductProperty_productId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductPropertyToPropertyField" DROP CONSTRAINT "_ProductPropertyToPropertyField_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductPropertyToPropertyField" DROP CONSTRAINT "_ProductPropertyToPropertyField_B_fkey";

-- AlterTable
ALTER TABLE "PropertyField" ADD COLUMN     "ProductPropertyId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductPropertyToPropertyField";

-- AddForeignKey
ALTER TABLE "ProductProperty" ADD CONSTRAINT "ProductProperty_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyField" ADD CONSTRAINT "PropertyField_ProductPropertyId_fkey" FOREIGN KEY ("ProductPropertyId") REFERENCES "ProductProperty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
