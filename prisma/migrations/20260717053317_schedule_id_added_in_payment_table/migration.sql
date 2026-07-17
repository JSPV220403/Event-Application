/*
  Warnings:

  - Added the required column `schedule_id` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_ticket_id_fkey";

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "schedule_id" TEXT NOT NULL,
ALTER COLUMN "ticket_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Event_Schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
