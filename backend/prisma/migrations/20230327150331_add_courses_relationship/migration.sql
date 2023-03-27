-- AddForeignKey
ALTER TABLE "CourseSchedules" ADD CONSTRAINT "CourseSchedules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
