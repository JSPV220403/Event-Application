-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_country_id_fkey";

-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_district_id_fkey";

-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_state_id_fkey";

-- AlterTable
ALTER TABLE "Addresses" ALTER COLUMN "district_id" DROP NOT NULL,
ALTER COLUMN "state_id" DROP NOT NULL,
ALTER COLUMN "country_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "Districts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "States"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
