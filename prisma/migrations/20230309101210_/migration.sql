/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ProductPropertyTitle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductPropertyTitle" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProductPropertyTitle_slug_key" ON "ProductPropertyTitle"("slug");
