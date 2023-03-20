/*
  Warnings:

  - You are about to drop the column `food_type` on the `Food` table. All the data in the column will be lost.
  - The `ingredients` column on the `Food` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allergens` column on the `Food` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `food_type_id` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "food_type",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "food_type_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL,
DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT[],
DROP COLUMN "allergens",
ADD COLUMN     "allergens" TEXT[];

-- CreateTable
CREATE TABLE "FoodType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "FoodType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodDetails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "food_id" INTEGER NOT NULL,
    "portion" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "FoodDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_food_type_id_fkey" FOREIGN KEY ("food_type_id") REFERENCES "FoodType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodDetails" ADD CONSTRAINT "FoodDetails_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
