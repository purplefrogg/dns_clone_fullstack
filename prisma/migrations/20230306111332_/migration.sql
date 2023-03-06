/*
  Warnings:

  - You are about to drop the column `value` on the `ProductProperty` table. All the data in the column will be lost.
  - You are about to drop the `_ProductToProductProperty` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `ProductProperty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToProductProperty" DROP CONSTRAINT "_ProductToProductProperty_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductProperty" DROP CONSTRAINT "_ProductToProductProperty_B_fkey";

-- AlterTable
ALTER TABLE "ProductProperty" DROP COLUMN "value",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductToProductProperty";

-- CreateTable
CREATE TABLE "ProductPropertyField" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productPropertyId" INTEGER NOT NULL,

    CONSTRAINT "ProductPropertyField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductProperty" ADD CONSTRAINT "ProductProperty_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPropertyField" ADD CONSTRAINT "ProductPropertyField_productPropertyId_fkey" FOREIGN KEY ("productPropertyId") REFERENCES "ProductProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
