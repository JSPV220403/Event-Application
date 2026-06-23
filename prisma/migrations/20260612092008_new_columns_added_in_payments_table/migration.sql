-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "order_id" TEXT,
ADD COLUMN     "payment_id" TEXT,
ALTER COLUMN "amout" DROP NOT NULL,
ALTER COLUMN "seat" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
