/*
  Warnings:

  - Made the column `slug` on table `PropertyFieldAbout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PropertyFieldAbout" ALTER COLUMN "slug" SET NOT NULL;
