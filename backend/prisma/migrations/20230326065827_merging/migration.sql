-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" VARCHAR(255),
    "password" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "FoodTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "food_type_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" JSON NOT NULL,
    "allergens" JSON NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodHistory" (
    "id" SERIAL NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "collection_status" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "FoodHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Districts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Franchise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gyms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "franchise_id" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,
    "opening_hour" INTEGER NOT NULL,
    "closing_hour" INTEGER NOT NULL,
    "no_close" BOOLEAN NOT NULL,
    "address" TEXT NOT NULL,
    "google_position" JSON NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Gyms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" TEXT NOT NULL,
    "certifications" TEXT NOT NULL,
    "franchise_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Trainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intensities" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Intensities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CourseTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "intensity_id" INTEGER NOT NULL,
    "course_type_id" INTEGER NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "calorise" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "default_quota" INTEGER NOT NULL,
    "default_trainer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSchedules" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "quota" INTEGER NOT NULL,
    "time" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CourseSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavouriteCourse" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "FavouriteCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTransactionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CreditTransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTransaction" (
    "id" SERIAL NOT NULL,
    "user_schedule_id" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "credit_transaction_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceTypes" (
    "id" SERIAL NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "AttendanceTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSchedule" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_schedule_id" INTEGER NOT NULL,
    "attendance_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "UserSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubPlans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unlimited" BOOLEAN NOT NULL,
    "credits" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "SubPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalorieTransactionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CalorieTransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalorieTransaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "food_history_id" INTEGER NOT NULL,
    "calorie" INTEGER NOT NULL,
    "transaction_type_id" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CalorieTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavouriteFoods" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "FavouriteFoods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodCart" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodCart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTypes_name_key" ON "FoodTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Foods_name_key" ON "Foods"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Districts_name_key" ON "Districts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_name_key" ON "Franchise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gyms_username_key" ON "Gyms"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Trainers_name_key" ON "Trainers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Intensities_level_key" ON "Intensities"("level");

-- CreateIndex
CREATE UNIQUE INDEX "CourseTypes_name_key" ON "CourseTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_name_key" ON "Courses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubPlans_name_key" ON "SubPlans"("name");

-- AddForeignKey
ALTER TABLE "Foods" ADD CONSTRAINT "Foods_food_type_id_fkey" FOREIGN KEY ("food_type_id") REFERENCES "FoodTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodHistory" ADD CONSTRAINT "FoodHistory_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "Gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodHistory" ADD CONSTRAINT "FoodHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodHistory" ADD CONSTRAINT "FoodHistory_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gyms" ADD CONSTRAINT "Gyms_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "Franchise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gyms" ADD CONSTRAINT "Gyms_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "Districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_intensity_id_fkey" FOREIGN KEY ("intensity_id") REFERENCES "Intensities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "CourseTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_default_trainer_id_fkey" FOREIGN KEY ("default_trainer_id") REFERENCES "Trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSchedules" ADD CONSTRAINT "CourseSchedules_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteCourse" ADD CONSTRAINT "FavouriteCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_user_schedule_id_fkey" FOREIGN KEY ("user_schedule_id") REFERENCES "UserSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_credit_transaction_type_id_fkey" FOREIGN KEY ("credit_transaction_type_id") REFERENCES "CreditTransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSchedule" ADD CONSTRAINT "UserSchedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSchedule" ADD CONSTRAINT "UserSchedule_attendance_type_id_fkey" FOREIGN KEY ("attendance_type_id") REFERENCES "AttendanceTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalorieTransaction" ADD CONSTRAINT "CalorieTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalorieTransaction" ADD CONSTRAINT "CalorieTransaction_food_history_id_fkey" FOREIGN KEY ("food_history_id") REFERENCES "FoodHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalorieTransaction" ADD CONSTRAINT "CalorieTransaction_transaction_type_id_fkey" FOREIGN KEY ("transaction_type_id") REFERENCES "CalorieTransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteFoods" ADD CONSTRAINT "FavouriteFoods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteFoods" ADD CONSTRAINT "FavouriteFoods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodCart" ADD CONSTRAINT "FoodCart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodCart" ADD CONSTRAINT "FoodCart_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
