/*
  Warnings:

  - You are about to drop the column `schedule_id` on the `Payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_schedule_id_fkey";

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "schedule_id";
