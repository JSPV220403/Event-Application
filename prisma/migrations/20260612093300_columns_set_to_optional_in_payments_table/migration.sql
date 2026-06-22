-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "ticket_id" DROP NOT NULL,
ALTER COLUMN "initiatedBy" DROP NOT NULL;
