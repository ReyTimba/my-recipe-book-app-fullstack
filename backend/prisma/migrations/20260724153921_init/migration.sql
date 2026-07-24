-- CreateTable
CREATE TABLE "Recipe" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "servings" INTEGER,
    "prepMinutes" INTEGER,
    "cookMinutes" INTEGER,
    "yield" JSONB NOT NULL DEFAULT '{}',
    "ingredients" JSONB NOT NULL DEFAULT '[]',
    "steps" JSONB NOT NULL DEFAULT '[]',
    "sections" JSONB NOT NULL DEFAULT '[]',
    "references" JSONB NOT NULL DEFAULT '[]',
    "sources" JSONB NOT NULL DEFAULT '[]',
    "uncertainties" JSONB NOT NULL DEFAULT '[]',
    "conservation" JSONB,
    "tags" TEXT[],
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "preparationStatus" TEXT NOT NULL DEFAULT 'complete',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Recipe_name_idx" ON "Recipe"("name");

-- CreateIndex
CREATE INDEX "Recipe_favorite_idx" ON "Recipe"("favorite");
