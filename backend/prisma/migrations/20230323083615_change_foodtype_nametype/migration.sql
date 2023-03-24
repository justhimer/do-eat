-- AlterTable
ALTER TABLE "FoodTypes" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "FavouriteCourse" ADD CONSTRAINT "FavouriteCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSchedule" ADD CONSTRAINT "UserSchedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalorieTransaction" ADD CONSTRAINT "CalorieTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalorieTransaction" ADD CONSTRAINT "CalorieTransaction_food_history_id_fkey" FOREIGN KEY ("food_history_id") REFERENCES "FoodHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
