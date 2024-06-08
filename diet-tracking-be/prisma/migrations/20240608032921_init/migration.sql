/*
  Warnings:

  - Added the required column `calories` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food` ADD COLUMN `calories` INTEGER NOT NULL;
