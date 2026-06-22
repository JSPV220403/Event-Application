-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "initiatedBy" TEXT NOT NULL,
    "amout" INTEGER NOT NULL,
    "seat" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_ticket_id_key" ON "Payments"("ticket_id");

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_initiatedBy_fkey" FOREIGN KEY ("initiatedBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Sold_Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
