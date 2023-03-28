-- DropForeignKey
ALTER TABLE "CreditTransaction" DROP CONSTRAINT "CreditTransaction_user_schedule_id_fkey";

-- AlterTable
ALTER TABLE "CreditTransaction" ALTER COLUMN "user_schedule_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_user_schedule_id_fkey" FOREIGN KEY ("user_schedule_id") REFERENCES "UserSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
