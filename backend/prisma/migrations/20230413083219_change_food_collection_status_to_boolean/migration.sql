/*
  Warnings:

  - Changed the type of `collection_status` on the `FoodHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FoodHistory" DROP COLUMN "collection_status",
ADD COLUMN     "collection_status" BOOLEAN NOT NULL;
