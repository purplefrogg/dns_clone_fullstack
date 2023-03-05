-- CreateTable
CREATE TABLE "ProductFilter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "CategoryId" INTEGER NOT NULL,

    CONSTRAINT "ProductFilter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductFilter" ADD CONSTRAINT "ProductFilter_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
