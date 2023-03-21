/*
  Warnings:

  - You are about to drop the column `preparation` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the `FoodDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `calories` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `FoodType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FoodDetails" DROP CONSTRAINT "FoodDetails_food_id_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "preparation",
ADD COLUMN     "calories" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FoodType" ADD COLUMN     "icon" TEXT NOT NULL;

-- DropTable
DROP TABLE "FoodDetails";
