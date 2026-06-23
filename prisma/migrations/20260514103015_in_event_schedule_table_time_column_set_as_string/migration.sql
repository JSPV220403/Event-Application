/*
  Warnings:

  - Changed the type of `time` on the `Event_Schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event_Schedules" DROP COLUMN "time",
ADD COLUMN     "time" VARCHAR(10) NOT NULL;
