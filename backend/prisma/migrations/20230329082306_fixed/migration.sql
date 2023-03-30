-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "Gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
