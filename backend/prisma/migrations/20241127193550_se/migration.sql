/*
  Warnings:

  - You are about to drop the column `cost` on the `productoncart` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `productoncart` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `productoncart` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `productoncart` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `productoncart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `productoncart` DROP COLUMN `cost`,
    DROP COLUMN `currency`,
    DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `name`;
