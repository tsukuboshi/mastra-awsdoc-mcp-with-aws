import { MCPConfiguration } from "@mastra/mcp";

export const mcp = new MCPConfiguration({
  servers: {
    awsdoc: {
      command: "uvx",
      args: ["awslabs.aws-documentation-mcp-server@latest"],
      env: {
        FASTMCP_LOG_LEVEL: "ERROR",
      },
    },
  },
});
