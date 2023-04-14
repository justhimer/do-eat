-- CreateTable
CREATE TABLE "SubPlansTransactions" (
    "id" SERIAL NOT NULL,
    "event_id" VARCHAR(250) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sub_plans_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "SubPlansTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubPlansTransactions" ADD CONSTRAINT "SubPlansTransactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubPlansTransactions" ADD CONSTRAINT "SubPlansTransactions_sub_plans_id_fkey" FOREIGN KEY ("sub_plans_id") REFERENCES "SubPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
