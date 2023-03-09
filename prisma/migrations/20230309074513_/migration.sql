/*
  Warnings:

  - You are about to drop the column `description` on the `PropertyField` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `PropertyField` table. All the data in the column will be lost.
  - You are about to drop the column `valueId` on the `PropertyField` table. All the data in the column will be lost.
  - You are about to drop the `PropertyFieldValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PropertyField" DROP CONSTRAINT "PropertyField_valueId_fkey";

-- AlterTable
ALTER TABLE "PropertyField" DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "valueId",
ADD COLUMN     "aboutId" INTEGER,
ADD COLUMN     "value" TEXT;

-- DropTable
DROP TABLE "PropertyFieldValue";

-- CreateTable
CREATE TABLE "PropertyFieldAbout" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PropertyFieldAbout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyField" ADD CONSTRAINT "PropertyField_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "PropertyFieldAbout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
