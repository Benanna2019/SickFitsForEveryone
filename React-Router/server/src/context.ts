import type { PrismaClient } from "@prisma/client";
import type express from "express";

export type DataSourceContext = {
  dataSources: {
    db: PrismaClient;
  };
  req: express.Request;
  res: express.Response;
};
