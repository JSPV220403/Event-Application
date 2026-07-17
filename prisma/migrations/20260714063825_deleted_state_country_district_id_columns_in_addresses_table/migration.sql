/*
  Warnings:

  - You are about to drop the column `country_id` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `district_id` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `Addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "country_id",
DROP COLUMN "district_id",
DROP COLUMN "state_id";
