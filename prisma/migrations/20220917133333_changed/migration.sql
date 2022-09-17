/*
  Warnings:

  - You are about to drop the `_CommentToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_CommentToPost_B_index";

-- DropIndex
DROP INDEX "_CommentToPost_AB_unique";

-- DropIndex
DROP INDEX "_LikeToPost_B_index";

-- DropIndex
DROP INDEX "_LikeToPost_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CommentToPost";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LikeToPost";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "postId" INTEGER,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("content", "id") SELECT "content", "id" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER,
    CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("id") SELECT "id" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
