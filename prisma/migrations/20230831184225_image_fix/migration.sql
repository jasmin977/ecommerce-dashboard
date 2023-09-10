/*
  Warnings:

  - You are about to drop the column `brandId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `brands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_customerId_fkey`;

-- AlterTable
ALTER TABLE `brands` ADD COLUMN `imageId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `imageId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `brandId`,
    DROP COLUMN `customerId`;

-- CreateIndex
CREATE UNIQUE INDEX `brands_imageId_key` ON `brands`(`imageId`);

-- CreateIndex
CREATE UNIQUE INDEX `customers_imageId_key` ON `customers`(`imageId`);

-- AddForeignKey
ALTER TABLE `brands` ADD CONSTRAINT `brands_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
