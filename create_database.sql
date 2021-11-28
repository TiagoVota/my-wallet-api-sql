CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(42) NOT NULL,
	"password" TEXT NOT NULL UNIQUE,
	"email" varchar(42) NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "statements" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"value" DECIMAL NOT NULL,
	"description" varchar(42) NOT NULL,
	"date" DATE NOT NULL DEFAULT 'now()',
	CONSTRAINT "statements_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL UNIQUE,
	"token" uuid NOT NULL UNIQUE,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "statements" ADD CONSTRAINT "statements_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");



