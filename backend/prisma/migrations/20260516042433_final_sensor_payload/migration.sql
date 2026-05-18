/*
  Warnings:

  - You are about to drop the column `gas` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `mov` on the `SensorLog` table. All the data in the column will be lost.
  - Added the required column `any_alert` to the `SensorLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fire` to the `SensorLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `high_hum` to the `SensorLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intrusion` to the `SensorLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `light` to the `SensorLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `low_light` to the `SensorLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temp_alert` to the `SensorLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SensorLog" DROP COLUMN "gas",
DROP COLUMN "mov",
ADD COLUMN     "any_alert" INTEGER NOT NULL,
ADD COLUMN     "fire" INTEGER NOT NULL,
ADD COLUMN     "high_hum" INTEGER NOT NULL,
ADD COLUMN     "intrusion" INTEGER NOT NULL,
ADD COLUMN     "light" INTEGER NOT NULL,
ADD COLUMN     "low_light" INTEGER NOT NULL,
ADD COLUMN     "temp_alert" INTEGER NOT NULL;
