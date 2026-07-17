-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_initiatedBy_fkey" FOREIGN KEY ("initiatedBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
