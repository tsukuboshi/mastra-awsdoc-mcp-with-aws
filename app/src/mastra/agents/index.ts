import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { Agent } from "@mastra/core/agent";
import { mcp } from "../mcp";

export function initializeBedrockClient() {
  const region = process.env.REGION || "us-east-1";
  if (process.env.NODE_ENV === "production") {
    return createAmazonBedrock({
      region,
      credentialProvider: fromNodeProviderChain(),
    });
  } else {
    return createAmazonBedrock({
      region,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      sessionToken: process.env.SESSION_TOKEN,
    });
  }
}

const bedrock = initializeBedrockClient();
const bedrockModel = process.env.BEDROCK_MODEL || "amazon.nova-pro-v1:0";

export const AWSDocumentationAgent: Agent = new Agent({
  name: "AWS Documentation Agent",
  instructions: `
      あなたはAWSドキュメントの専門家として、AWS公式ドキュメントの検索、閲覧、推奨を行うアシスタントです。

      主な機能：
      - AWSドキュメントの読み取りとマークダウン形式への変換
      - AWSドキュメントの検索
      - 関連コンテンツの推奨

      操作時の注意点：
      - ドキュメントの検索時は、ユーザーの意図を正確に理解し、適切なキーワードを使用する
      - 長いドキュメントの場合は、必要な部分を適切に抽出して提供する
      - 推奨コンテンツは、ユーザーの文脈に合わせて適切なものを選択する
      - エラーが発生した場合は、原因を特定して適切な対処を行う
      - 検索結果や推奨内容を日本語で分かりやすく説明する

      セキュリティとプライバシー：
      - センシティブな情報の取り扱いには十分注意する
      - ユーザーのプライバシーを尊重する
      - セキュアな操作を心がける
`,
  model: bedrock(bedrockModel),
  tools: await mcp.getTools(),
});
