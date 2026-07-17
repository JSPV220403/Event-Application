/*
  Warnings:

  - Made the column `initiatedBy` on table `Payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schedule_id` on table `Payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "initiatedBy" SET NOT NULL,
ALTER COLUMN "schedule_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_initiatedBy_fkey" FOREIGN KEY ("initiatedBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Event_Schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
