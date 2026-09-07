import.meta.url = "file:///Users/akioito/.pi/agent/extensions/pi-llm-temperature/index.ts";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { streamSimpleAnthropic, streamSimpleGoogle, streamSimpleGoogleVertex, streamSimpleGoogleGeminiCli, streamSimpleOpenAIResponses, streamSimpleOpenAICompletions, streamSimpleAzureOpenAIResponses, streamSimpleMistral } from "@mariozechner/pi-ai";
const modelsConfig = JSON.parse(readFileSync(join(dirname(new URL(import.meta.url).pathname), "models.json"), "utf-8"));
const API_TEMPERATURE_RANGES = modelsConfig.apiTemperatureRanges;
const ALLOWED_MODELS = new Map(modelsConfig.allowedModels.map((m)=>[
        m.id,
        m.api
    ]));
const GLOBAL_MAX_TEMPERATURE = Math.max(...Object.values(API_TEMPERATURE_RANGES).map((r)=>r.max));
function getApiForModel(modelId) {
    return ALLOWED_MODELS.get(modelId);
}
function validateTemperature(temperature, api) {
    if (Number.isNaN(temperature)) {
        return "Temperature must be a valid number";
    }
    const range = API_TEMPERATURE_RANGES[api];
    if (!range) {
        return `Temperature override is not supported for API "${api}"`;
    }
    if (temperature < range.min || temperature > range.max) {
        return `Temperature ${temperature} is out of range [${range.min}, ${range.max}] for ${api}`;
    }
    return undefined;
}
function parseModelSpec(spec) {
    const match = spec.match(/^([a-zA-Z0-9._@/:-]+)\(temperature=([\d.]+)\)$/);
    if (match) {
        return {
            modelId: match[1],
            temperature: parseFloat(match[2])
        };
    }
    return {
        modelId: spec,
        temperature: undefined
    };
}
function parseFrontmatter(content) {
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!fmMatch) return null;
    const result = {};
    for (const line of fmMatch[1].split("\n")){
        const kvMatch = line.match(/^(\w[\w-]*):\s*(.+)$/);
        if (kvMatch) {
            result[kvMatch[1]] = kvMatch[2].trim();
        }
    }
    return result;
}
function findSkillPath(skillName, cwd) {
    const projectPaths = [
        join(cwd, ".pi", "skills", skillName, "SKILL.md"),
        join(cwd, ".pi", "skills", `${skillName}.md`),
        join(cwd, ".agents", "skills", skillName, "SKILL.md"),
        join(cwd, ".agents", "skills", `${skillName}.md`)
    ];
    let dir = cwd;
    while(true){
        const parent = dirname(dir);
        if (parent === dir) break;
        dir = parent;
        projectPaths.push(join(dir, ".agents", "skills", skillName, "SKILL.md"));
        projectPaths.push(join(dir, ".agents", "skills", `${skillName}.md`));
        if (existsSync(join(dir, ".git"))) break;
    }
    const home = process.env.HOME || process.env.USERPROFILE || "";
    const globalPaths = [
        join(home, ".pi", "agent", "skills", skillName, "SKILL.md"),
        join(home, ".pi", "agent", "skills", `${skillName}.md`),
        join(home, ".agents", "skills", skillName, "SKILL.md"),
        join(home, ".agents", "skills", `${skillName}.md`)
    ];
    for (const p of [
        ...projectPaths,
        ...globalPaths
    ]){
        if (existsSync(p)) return p;
    }
    return undefined;
}
export default function temperatureExtension(pi) {
    let activeTemperature;
    pi.registerFlag("temperature", {
        description: "Set LLM temperature (Anthropic: 0-1, Gemini: 0-2, OpenAI: 0-2, Mistral: 0-1.5, Bedrock: 0-1). Overrides provider default.",
        type: "string"
    });
    pi.registerProvider("anthropic", {
        api: "anthropic-messages",
        streamSimple: (model, context, options)=>{
            const finalOptions = activeTemperature !== undefined ? {
                ...options,
                temperature: activeTemperature
            } : options;
            return streamSimpleAnthropic(model, context, finalOptions);
        }
    });
    pi.registerProvider("google", {
        api: "google-generative-ai",
        streamSimple: (model, context, options)=>{
            const finalOptions = activeTemperature !== undefined ? {
                ...options,
                temperature: activeTemperature
            } : options;
            return streamSimpleGoogle(model, context, finalOptions);
        }
    });
    pi.registerProvider("google-vertex", {
        api: "google-vertex",
        streamSimple: (model, context, options)=>{
            const finalOptions = activeTemperature !== undefined ? {
                ...options,
                temperature: activeTemperature
            } : options;
            return streamSimpleGoogleVertex(model, context, finalOptions);
        }
    });
    pi.registerProvider("google-gemini-cli", {
        api: "google-gemini-cli",
        streamSimple: (model, context, options)=>{
            const finalOptions = activeTemperature !== undefined ? {
                ...options,
                temperature: activeTemperature
            } : options;
            return streamSimpleGoogleGeminiCli(model, context, finalOptions);
        }
    });
    pi.registerProvider("openai", {
        api: "openai-responses",
        streamSimple: (model, context, options)=>{
            const finalOptions = activeTemperature !== undefined ? {
                ...options,
                temperature: activeTemperature
            } : options;
            return streamSimpleOpenAIResponses(model, context, finalOptions);
        }
    });
    pi.registerProvider("openai-completions", {
        api: "openai-completions",
        streamSimple: (model, context, options)=>{
            const finalOptions = activeTemperature !== undefined ? {
                ...options,
                temperature: activeTemperature
            } : options;
            return streamSimpleOpenAICompletions(model, context, finalOptions);
        }
    });
    pi.registerProvider("azure-openai-responses", {
        api: "azure-openai-responses",
        streamSimple: (model, context, options)=>{
            const finalOptions = activeTemperature !== undefined ? {
                ...options,
                temperature: activeTemperature
            } : options;
            return streamSimpleAzureOpenAIResponses(model, context, finalOptions);
        }
    });
    pi.registerProvider("mistral", {
        api: "mistral-conversations",
        streamSimple: (model, context, options)=>{
            const finalOptions = activeTemperature !== undefined ? {
                ...options,
                temperature: activeTemperature
            } : options;
            return streamSimpleMistral(model, context, finalOptions);
        }
    });
    pi.registerCommand("temperature", {
        description: "Set, show, or clear temperature override",
        handler: async (args, ctx)=>{
            const trimmed = args?.trim();
            if (!trimmed) {
                if (activeTemperature !== undefined) {
                    ctx.ui.notify(`Current temperature: ${activeTemperature}`, "info");
                } else {
                    ctx.ui.notify("No temperature override active (using provider default)", "info");
                }
                return;
            }
            if (trimmed === "off" || trimmed === "clear" || trimmed === "reset") {
                activeTemperature = undefined;
                ctx.ui.setStatus("temperature", undefined);
                ctx.ui.notify("Temperature override cleared", "info");
                return;
            }
            const temp = parseFloat(trimmed);
            if (Number.isNaN(temp)) {
                ctx.ui.notify(`Invalid temperature: "${trimmed}". Use a number, or "off" to clear.`, "error");
                return;
            }
            const model = ctx.model;
            if (model) {
                const error = validateTemperature(temp, model.api);
                if (error) {
                    ctx.ui.notify(error, "error");
                    return;
                }
            } else {
                if (temp < 0 || temp > GLOBAL_MAX_TEMPERATURE) {
                    ctx.ui.notify(`Temperature must be between 0 and ${GLOBAL_MAX_TEMPERATURE}`, "error");
                    return;
                }
            }
            activeTemperature = temp;
            updateStatus(ctx);
            ctx.ui.notify(`Temperature set to ${temp}`, "info");
        }
    });
    pi.on("input", async (event, ctx)=>{
        if (!event.text.startsWith("/skill:")) {
            return {
                action: "continue"
            };
        }
        const parts = event.text.split(/\s+/);
        const skillName = parts[0].substring(7);
        if (!skillName) return {
            action: "continue"
        };
        const skillPath = findSkillPath(skillName, ctx.cwd);
        if (!skillPath) return {
            action: "continue"
        };
        let content;
        try {
            content = readFileSync(skillPath, "utf-8");
        } catch  {
            return {
                action: "continue"
            };
        }
        const frontmatter = parseFrontmatter(content);
        if (!frontmatter || !frontmatter.model) {
            return {
                action: "continue"
            };
        }
        const { modelId, temperature } = parseModelSpec(frontmatter.model);
        if (!ALLOWED_MODELS.has(modelId)) {
            ctx.ui.notify(`Skill "${skillName}" requests model "${modelId}" which is not in the allowed list.\n` + `Allowed: ${[
                ...ALLOWED_MODELS.keys()
            ].join(", ")}`, "error");
            return {
                action: "handled"
            };
        }
        const allModels = ctx.modelRegistry.getAllModels();
        const targetModel = allModels.find((m)=>m.id === modelId);
        if (!targetModel) {
            ctx.ui.notify(`Skill "${skillName}" requests model "${modelId}" but it was not found in the model registry.`, "error");
            return {
                action: "handled"
            };
        }
        if (temperature !== undefined) {
            const api = getApiForModel(modelId);
            if (api) {
                const error = validateTemperature(temperature, api);
                if (error) {
                    ctx.ui.notify(`Skill "${skillName}": ${error}`, "error");
                    return {
                        action: "handled"
                    };
                }
            }
        }
        const success = await pi.setModel(targetModel);
        if (!success) {
            ctx.ui.notify(`Skill "${skillName}": No API key available for ${targetModel.provider}/${modelId}`, "error");
            return {
                action: "handled"
            };
        }
        if (temperature !== undefined) {
            activeTemperature = temperature;
            updateStatus(ctx);
            ctx.ui.notify(`Skill "${skillName}": switched to ${modelId} with temperature=${temperature}`, "info");
        } else {
            ctx.ui.notify(`Skill "${skillName}": switched to ${modelId}`, "info");
        }
        return {
            action: "continue"
        };
    });
    function updateStatus(ctx) {
        if (activeTemperature !== undefined) {
            ctx.ui.setStatus("temperature", ctx.ui.theme.fg("accent", `temp:${activeTemperature}`));
        } else {
            ctx.ui.setStatus("temperature", undefined);
        }
    }
    pi.on("session_start", async (_event, ctx)=>{
        const registry = ctx.modelRegistry;
        const registeredProviders = registry.registeredProviders;
        if (registeredProviders) {
            const lateBindApis = [
                "anthropic-vertex",
                "bedrock-converse-stream",
                "openai-codex-responses"
            ];
            for (const apiName of lateBindApis){
                const config = registeredProviders.get(apiName);
                if (config?.streamSimple) {
                    const originalStream = config.streamSimple;
                    (ctx.modelRegistry).registerProvider(apiName, {
                        ...config,
                        streamSimple: (model, context, options)=>{
                            const finalOptions = activeTemperature !== undefined ? {
                                ...options,
                                temperature: activeTemperature
                            } : options;
                            return originalStream(model, context, finalOptions);
                        }
                    });
                }
            }
        }
        const flagValue = pi.getFlag("temperature");
        if (typeof flagValue === "string" && flagValue) {
            const temp = parseFloat(flagValue);
            if (Number.isNaN(temp) || temp < 0 || temp > GLOBAL_MAX_TEMPERATURE) {
                const msg = Number.isNaN(temp) ? `Invalid --temperature value: "${flagValue}". Must be a number.` : `--temperature ${temp} is out of range [0, ${GLOBAL_MAX_TEMPERATURE}].`;
                if (!ctx.hasUI) {
                    console.error(`[temperature] Error: ${msg}`);
                    process.exit(1);
                }
                ctx.ui.notify(msg, "error");
            } else {
                activeTemperature = temp;
                const model = ctx.model;
                if (model) {
                    const error = validateTemperature(temp, model.api);
                    if (error) {
                        if (!ctx.hasUI) {
                            console.error(`[temperature] Error: ${error}`);
                            process.exit(1);
                        }
                        ctx.ui.notify(error, "error");
                        activeTemperature = undefined;
                    } else {
                        ctx.ui.notify(`Temperature override: ${temp}`, "info");
                    }
                } else {
                    ctx.ui.notify(`Temperature override: ${temp}`, "info");
                }
            }
        }
        if (activeTemperature === undefined) {
            const entries = ctx.sessionManager.getEntries();
            const stateEntry = entries.filter((e)=>e.type === "custom" && e.customType === "temperature-state").pop();
            if (stateEntry?.data?.temperature !== undefined) {
                activeTemperature = stateEntry.data.temperature;
            }
        }
        updateStatus(ctx);
    });
    pi.on("model_select", async (event, ctx)=>{
        if (activeTemperature === undefined) return;
        const error = validateTemperature(activeTemperature, event.model.api);
        if (error) {
            ctx.ui.notify(`Warning: ${error}. Use /temperature to adjust or clear.`, "warning");
        }
    });
    pi.on("turn_start", async ()=>{
        if (activeTemperature !== undefined) {
            pi.appendEntry("temperature-state", {
                temperature: activeTemperature
            });
        }
    });
}
