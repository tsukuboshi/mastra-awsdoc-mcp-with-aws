import { createLogger } from "@mastra/core/logger";
import { Mastra } from "@mastra/core/mastra";

import { AWSDocumentationAgent } from "./agents";

export const mastra: Mastra = new Mastra({
  agents: { AWSDocumentationAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
