-- DropForeignKey
ALTER TABLE `dietdiary` DROP FOREIGN KEY `DietDiary_id_fkey`;

-- AddForeignKey
ALTER TABLE `DietDiary` ADD CONSTRAINT `DietDiary_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
