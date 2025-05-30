/*
  Warnings:

  - You are about to drop the column `grade` on the `progressreport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `progressreport` DROP COLUMN `grade`,
    ADD COLUMN `finalGrade` DOUBLE NULL,
    ADD COLUMN `predicate` VARCHAR(191) NULL,
    ADD COLUMN `tugas` DOUBLE NULL,
    ADD COLUMN `uas` DOUBLE NULL,
    ADD COLUMN `uts` DOUBLE NULL;

-- CreateTable
CREATE TABLE `SelfDevelopment` (
    `id` VARCHAR(191) NOT NULL,
    `activity` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `reportedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `studentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `status` ENUM('PRESENT', 'ABSENT', 'SICK', 'PERMISSION') NOT NULL,
    `notes` VARCHAR(191) NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Attendance_studentId_date_key`(`studentId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SelfDevelopment` ADD CONSTRAINT `SelfDevelopment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
