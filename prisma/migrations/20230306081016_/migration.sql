-- CreateTable
CREATE TABLE "ProductProperty" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ProductId" INTEGER NOT NULL,

    CONSTRAINT "ProductProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPropertyField" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "ProductPropertyId" INTEGER NOT NULL,

    CONSTRAINT "ProductPropertyField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductProperty" ADD CONSTRAINT "ProductProperty_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPropertyField" ADD CONSTRAINT "ProductPropertyField_ProductPropertyId_fkey" FOREIGN KEY ("ProductPropertyId") REFERENCES "ProductProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
