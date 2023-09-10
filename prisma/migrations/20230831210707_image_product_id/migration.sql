-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_productId_fkey`;

-- AlterTable
ALTER TABLE `images` MODIFY `productId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
