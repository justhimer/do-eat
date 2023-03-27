/*
  Warnings:

  - The `allergens` column on the `Foods` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Foods" DROP COLUMN "allergens",
ADD COLUMN     "allergens" TEXT[];
