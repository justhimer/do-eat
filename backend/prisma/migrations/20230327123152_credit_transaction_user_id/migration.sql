/*
  Warnings:

  - Added the required column `user_id` to the `CreditTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "icon" SET DEFAULT 'default_icon.png',
ALTER COLUMN "credits" SET DEFAULT 0,
ALTER COLUMN "calories" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
