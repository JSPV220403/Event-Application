/*
  Warnings:

  - You are about to drop the column `is_subscibed` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "is_subscibed",
ADD COLUMN     "is_subscribed" BOOLEAN NOT NULL DEFAULT true;
