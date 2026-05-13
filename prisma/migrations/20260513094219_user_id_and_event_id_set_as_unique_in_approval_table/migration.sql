/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Approvals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[event_id]` on the table `Approvals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Approvals_user_id_key" ON "Approvals"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Approvals_event_id_key" ON "Approvals"("event_id");
