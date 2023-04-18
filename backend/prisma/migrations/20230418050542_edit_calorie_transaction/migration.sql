-- DropForeignKey
ALTER TABLE "CalorieTransaction" DROP CONSTRAINT "CalorieTransaction_food_history_id_fkey";

-- AlterTable
ALTER TABLE "CalorieTransaction" ADD COLUMN     "user_schedule_id" INTEGER,
ALTER COLUMN "food_history_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CalorieTransaction" ADD CONSTRAINT "CalorieTransaction_food_history_id_fkey" FOREIGN KEY ("food_history_id") REFERENCES "FoodHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalorieTransaction" ADD CONSTRAINT "CalorieTransaction_user_schedule_id_fkey" FOREIGN KEY ("user_schedule_id") REFERENCES "UserSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
