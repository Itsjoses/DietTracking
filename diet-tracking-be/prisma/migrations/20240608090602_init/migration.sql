/*
  Warnings:

  - You are about to drop the column `foodId` on the `dietdiary` table. All the data in the column will be lost.
  - Added the required column `calories` to the `DietDiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `DietDiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `DietDiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `food_name` to the `DietDiary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dietdiary` DROP FOREIGN KEY `DietDiary_foodId_fkey`;

-- AlterTable
ALTER TABLE `dietdiary` DROP COLUMN `foodId`,
    ADD COLUMN `calories` INTEGER NOT NULL,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `food_name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DietDiary` ADD CONSTRAINT `DietDiary_id_fkey` FOREIGN KEY (`id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
