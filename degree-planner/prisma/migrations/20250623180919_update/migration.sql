/*
  Warnings:

  - You are about to drop the `_CourseToPrerequisites` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expectedGraduation` to the `UserPlan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LogicType" AS ENUM ('AND', 'OR');

-- DropForeignKey
ALTER TABLE "_CourseToPrerequisites" DROP CONSTRAINT "_CourseToPrerequisites_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToPrerequisites" DROP CONSTRAINT "_CourseToPrerequisites_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "prerequisiteGroupId" TEXT,
ALTER COLUMN "credits" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserPlan" ADD COLUMN     "expectedGraduation" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CourseToPrerequisites";

-- CreateTable
CREATE TABLE "PrerequisiteGroup" (
    "id" TEXT NOT NULL,
    "requiredForId" TEXT NOT NULL,
    "type" "LogicType" NOT NULL,

    CONSTRAINT "PrerequisiteGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CourseToGroup_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseToGroup_B_index" ON "_CourseToGroup"("B");

-- AddForeignKey
ALTER TABLE "PrerequisiteGroup" ADD CONSTRAINT "PrerequisiteGroup_requiredForId_fkey" FOREIGN KEY ("requiredForId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToGroup" ADD CONSTRAINT "_CourseToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToGroup" ADD CONSTRAINT "_CourseToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "PrerequisiteGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
