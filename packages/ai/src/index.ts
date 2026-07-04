export interface AIPrompt {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AICompletionRequest {
  prompts: AIPrompt[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AICompletionResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIClient {
  complete(request: AICompletionRequest): Promise<AICompletionResponse>;
}
