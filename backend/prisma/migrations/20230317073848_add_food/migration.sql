-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "food_type" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "allergens" TEXT NOT NULL,
    "preparation" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);
