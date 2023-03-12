/*
  Warnings:

  - You are about to drop the column `slug` on the `ProductPropertyTitle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `PropertyFieldAbout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductPropertyTitle_slug_key";

-- AlterTable
ALTER TABLE "ProductPropertyTitle" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "PropertyFieldAbout" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFieldAbout_slug_key" ON "PropertyFieldAbout"("slug");
