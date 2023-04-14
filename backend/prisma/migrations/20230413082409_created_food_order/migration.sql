/*
  Warnings:

  - You are about to drop the column `food_id` on the `FoodHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodHistory" DROP CONSTRAINT "FoodHistory_food_id_fkey";

-- AlterTable
ALTER TABLE "FoodHistory" DROP COLUMN "food_id";

-- CreateTable
CREATE TABLE "FoodOrder" (
    "id" SERIAL NOT NULL,
    "food_history_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "FoodOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodOrder" ADD CONSTRAINT "FoodOrder_food_history_id_fkey" FOREIGN KEY ("food_history_id") REFERENCES "FoodHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodOrder" ADD CONSTRAINT "FoodOrder_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
