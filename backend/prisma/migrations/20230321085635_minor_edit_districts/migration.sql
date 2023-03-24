/*
  Warnings:

  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gyms" DROP CONSTRAINT "Gyms_district_id_fkey";

-- DropTable
DROP TABLE "District";

-- CreateTable
CREATE TABLE "Districts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Districts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gyms" ADD CONSTRAINT "Gyms_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "Districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
