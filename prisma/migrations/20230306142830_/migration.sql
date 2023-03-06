/*
  Warnings:

  - You are about to drop the `ProductPropertyField` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductPropertyField" DROP CONSTRAINT "ProductPropertyField_productPropertyId_fkey";

-- DropTable
DROP TABLE "ProductPropertyField";

-- CreateTable
CREATE TABLE "PropertyField" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "PropertyField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyField" ADD CONSTRAINT "PropertyField_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "ProductProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
