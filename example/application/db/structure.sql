CREATE TABLE "Country" (
  "code" varchar(2) NOT NULL,
  "name" varchar NOT NULL
);

ALTER TABLE "Country" ADD CONSTRAINT "pkCountry" PRIMARY KEY ("code");

CREATE UNIQUE INDEX "akCountryName" ON "Country" ("name");
