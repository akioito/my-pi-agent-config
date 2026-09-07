import.meta.url = "pi://@mariozechner/pi-ai";
export function StringEnum(values, opts = {}) {
  const list = Array.isArray(values) ? values.map((v) => String(v)) : [];
  return { type: "string", enum: list, ...opts };
}

export function calculateCost(model, usage) {
  const usageObj = usage && typeof usage === 'object' ? usage : {};
  const cost = usageObj.cost && typeof usageObj.cost === 'object' ? usageObj.cost : {};
  const modelCost = model && typeof model === 'object' ? (model.cost || {}) : {};

  const inputTokens = Number(usageObj.input ?? usageObj.inputTokens ?? usageObj.input_tokens ?? 0);
  const outputTokens = Number(usageObj.output ?? usageObj.outputTokens ?? usageObj.output_tokens ?? 0);
  const cacheReadTokens = Number(usageObj.cacheRead ?? usageObj.cache_read ?? 0);
  const cacheWriteTokens = Number(usageObj.cacheWrite ?? usageObj.cache_write ?? 0);

  const inputRate = Number(modelCost.input ?? 0);
  const outputRate = Number(modelCost.output ?? 0);
  const cacheReadRate = Number(modelCost.cacheRead ?? modelCost.cache_read ?? 0);
  const cacheWriteRate = Number(modelCost.cacheWrite ?? modelCost.cache_write ?? 0);

  cost.input = (inputRate / 1000000) * inputTokens;
  cost.output = (outputRate / 1000000) * outputTokens;
  cost.cacheRead = (cacheReadRate / 1000000) * cacheReadTokens;
  cost.cacheWrite = (cacheWriteRate / 1000000) * cacheWriteTokens;
  cost.total = cost.input + cost.output + cost.cacheRead + cost.cacheWrite;

  usageObj.cost = cost;
  if (!Number.isFinite(Number(usageObj.totalTokens))) {
    usageObj.totalTokens = inputTokens + outputTokens + cacheReadTokens + cacheWriteTokens;
  }

  return cost;
}

function getEnvValue(name) {
  if (globalThis.pi && globalThis.pi.env && typeof globalThis.pi.env.get === "function") {
    const value = globalThis.pi.env.get(name);
    if (value !== undefined && value !== null) {
      return String(value);
    }
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env[name];
  }
  return undefined;
}

export function getEnvApiKey(provider) {
  const p = String(provider ?? "").trim();
  if (!p) return undefined;

  if (p === "github-copilot") {
    return (
      getEnvValue("COPILOT_GITHUB_TOKEN") ||
      getEnvValue("GH_TOKEN") ||
      getEnvValue("GITHUB_TOKEN")
    );
  }

  if (p === "anthropic") {
    return getEnvValue("ANTHROPIC_OAUTH_TOKEN") || getEnvValue("ANTHROPIC_API_KEY");
  }

  if (p === "google-vertex") {
    const hasCredentials = !!getEnvValue("GOOGLE_APPLICATION_CREDENTIALS");
    const hasProject = !!(getEnvValue("GOOGLE_CLOUD_PROJECT") || getEnvValue("GCLOUD_PROJECT"));
    const hasLocation = !!getEnvValue("GOOGLE_CLOUD_LOCATION");
    if (hasCredentials && (hasProject || hasLocation)) {
      return "<authenticated>";
    }
    if (hasProject && hasLocation) {
      return "<authenticated>";
    }
  }

  if (p === "amazon-bedrock") {
    if (
      getEnvValue("AWS_PROFILE") ||
      (getEnvValue("AWS_ACCESS_KEY_ID") && getEnvValue("AWS_SECRET_ACCESS_KEY")) ||
      getEnvValue("AWS_BEARER_TOKEN_BEDROCK") ||
      getEnvValue("AWS_CONTAINER_CREDENTIALS_RELATIVE_URI") ||
      getEnvValue("AWS_CONTAINER_CREDENTIALS_FULL_URI") ||
      getEnvValue("AWS_WEB_IDENTITY_TOKEN_FILE")
    ) {
      return "<authenticated>";
    }
  }

  const envMap = {
    openai: "OPENAI_API_KEY",
    "azure-openai-responses": "AZURE_OPENAI_API_KEY",
    google: "GEMINI_API_KEY",
    groq: "GROQ_API_KEY",
    cerebras: "CEREBRAS_API_KEY",
    xai: "XAI_API_KEY",
    openrouter: "OPENROUTER_API_KEY",
    "vercel-ai-gateway": "AI_GATEWAY_API_KEY",
    zai: "ZAI_API_KEY",
    mistral: "MISTRAL_API_KEY",
    minimax: "MINIMAX_API_KEY",
    "minimax-cn": "MINIMAX_CN_API_KEY",
    huggingface: "HF_TOKEN",
    opencode: "OPENCODE_API_KEY",
    "kimi-coding": "KIMI_API_KEY",
  };

  const envVar = envMap[p];
  return envVar ? getEnvValue(envVar) : undefined;
}

export function createAssistantMessageEventStream() {
  return {
    push: () => {},
    end: () => {},
  };
}

export function streamSimpleAnthropic() {
  throw new Error("@mariozechner/pi-ai.streamSimpleAnthropic is not available in PiJS");
}

export function streamSimpleOpenAIResponses() {
  throw new Error("@mariozechner/pi-ai.streamSimpleOpenAIResponses is not available in PiJS");
}

export function streamSimpleOpenAICompletions() {
  throw new Error("@mariozechner/pi-ai.streamSimpleOpenAICompletions is not available in PiJS");
}

export async function complete(_model, _messages, _opts = {}) {
  // Return a minimal completion response stub
  return { content: "", model: _model ?? "unknown", usage: { input_tokens: 0, output_tokens: 0 } };
}

// Stub: completeSimple returns a simple text completion without streaming
export async function completeSimple(_model, _prompt, _opts = {}) {
  // Return an empty string completion
  return "";
}

export function getModel() {
  // Return a default model identifier
  return "claude-sonnet-4-5";
}

export function getApiProvider() {
  // Return a default provider identifier
  return "anthropic";
}

export function getModels() {
  // Return a list of available model identifiers
  return ["claude-sonnet-4-5", "claude-haiku-3-5"];
}

export async function loginOpenAICodex(_opts = {}) {
  return { accessToken: "", refreshToken: "", expiresAt: Date.now() + 3600000 };
}

export async function refreshOpenAICodexToken(_refreshToken) {
  return { accessToken: "", refreshToken: "", expiresAt: Date.now() + 3600000 };
}

export default { StringEnum, calculateCost, createAssistantMessageEventStream, streamSimpleAnthropic, streamSimpleOpenAIResponses, streamSimpleOpenAICompletions, complete, completeSimple, getModel, getApiProvider, getModels, loginOpenAICodex, refreshOpenAICodexToken };