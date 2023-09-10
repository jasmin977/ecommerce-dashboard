/*
  Warnings:

  - You are about to drop the column `categoryId` on the `images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_categoryId_fkey`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `imageId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `categoryId`;

-- CreateIndex
CREATE UNIQUE INDEX `categories_imageId_key` ON `categories`(`imageId`);

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
