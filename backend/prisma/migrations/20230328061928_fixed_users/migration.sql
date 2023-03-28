/*
  Warnings:

  - You are about to drop the column `calories` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `credits` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "calories",
DROP COLUMN "credits",
ADD COLUMN     "qr_code" TEXT,
ADD COLUMN     "sub_plan_end" TIMESTAMPTZ,
ADD COLUMN     "sub_plan_id" INTEGER,
ADD COLUMN     "sub_plan_start" TIMESTAMPTZ,
ADD COLUMN     "subscribed" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_sub_plan_id_fkey" FOREIGN KEY ("sub_plan_id") REFERENCES "SubPlans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSchedule" ADD CONSTRAINT "UserSchedule_course_schedule_id_fkey" FOREIGN KEY ("course_schedule_id") REFERENCES "CourseSchedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
