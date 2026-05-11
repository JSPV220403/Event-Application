-- DropForeignKey
ALTER TABLE "Approvals" DROP CONSTRAINT "Approvals_approved_by_fkey";

-- DropForeignKey
ALTER TABLE "Approvals" DROP CONSTRAINT "Approvals_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Approvals" DROP CONSTRAINT "Approvals_user_id_fkey";

-- AlterTable
ALTER TABLE "Approvals" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "event_id" DROP NOT NULL,
ALTER COLUMN "approved_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Approvals" ADD CONSTRAINT "Approvals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approvals" ADD CONSTRAINT "Approvals_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approvals" ADD CONSTRAINT "Approvals_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
