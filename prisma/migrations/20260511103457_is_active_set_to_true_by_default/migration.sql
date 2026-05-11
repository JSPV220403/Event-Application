/*
  Warnings:

  - You are about to drop the `_Event_SchedulesToEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Event_SchedulesToEvents" DROP CONSTRAINT "_Event_SchedulesToEvents_A_fkey";

-- DropForeignKey
ALTER TABLE "_Event_SchedulesToEvents" DROP CONSTRAINT "_Event_SchedulesToEvents_B_fkey";

-- AlterTable
ALTER TABLE "Addresses" ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Event_Schedules" ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Sold_Tickets" ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "is_active" SET DEFAULT true;

-- DropTable
DROP TABLE "_Event_SchedulesToEvents";

-- AddForeignKey
ALTER TABLE "Event_Schedules" ADD CONSTRAINT "Event_Schedules_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
