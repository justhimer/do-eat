-- AlterTable
ALTER TABLE "Gyms" ALTER COLUMN "opening_hour" DROP NOT NULL,
ALTER COLUMN "opening_hour" SET DATA TYPE TEXT,
ALTER COLUMN "closing_hour" DROP NOT NULL,
ALTER COLUMN "closing_hour" SET DATA TYPE TEXT;

ALTER TABLE "Courses" RENAME COLUMN "calorise" to "calories";