/*
  Warnings:

  - You are about to drop the `Countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Districts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `States` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_country_id_fkey";

-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_district_id_fkey";

-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_state_id_fkey";

-- DropForeignKey
ALTER TABLE "Districts" DROP CONSTRAINT "Districts_state_id_fkey";

-- DropForeignKey
ALTER TABLE "States" DROP CONSTRAINT "States_country_id_fkey";

-- DropTable
DROP TABLE "Countries";

-- DropTable
DROP TABLE "Districts";

-- DropTable
DROP TABLE "States";
