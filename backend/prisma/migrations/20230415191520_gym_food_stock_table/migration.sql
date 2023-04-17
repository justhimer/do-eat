-- CreateTable
CREATE TABLE "GymFoodStock" (
    "id" SERIAL NOT NULL,
    "gyms_id" INTEGER NOT NULL,
    "foods_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GymFoodStock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GymFoodStock" ADD CONSTRAINT "GymFoodStock_gyms_id_fkey" FOREIGN KEY ("gyms_id") REFERENCES "Gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymFoodStock" ADD CONSTRAINT "GymFoodStock_foods_id_fkey" FOREIGN KEY ("foods_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
