/*
  Warnings:

  - Made the column `ticket_id` on table `Payments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Payments_ticket_id_key";

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "ticket_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Sold_Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
