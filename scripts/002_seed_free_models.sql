-- Seed free AI models from OpenRouter
INSERT INTO public.ai_models (model_id, name, provider, description, context_length, is_free, input_cost_per_million, output_cost_per_million, capabilities) VALUES

-- Qwen Models
('qwen/qwen3-next-80b-a3b-instruct:free', 'Qwen3 Next 80B A3B Instruct', 'Qwen', 'Instruction-tuned chat model optimized for fast, stable responses. Targets complex tasks across reasoning, code generation, knowledge QA, and multilingual use.', 262144, true, 0, 0, ARRAY['coding', 'reasoning', 'multilingual', 'agentic']),

('qwen/qwen3-coder-480b-a35b:free', 'Qwen3 Coder 480B A35B', 'Qwen', 'Mixture-of-Experts code generation model optimized for agentic coding tasks such as function calling, tool use, and long-context reasoning over repositories.', 262144, true, 0, 0, ARRAY['coding', 'function-calling', 'agentic', 'long-context']),

-- StepFun
('stepfun/step-3.5-flash:free', 'Step 3.5 Flash', 'StepFun', 'Most capable open-source foundation model with sparse MoE architecture. Activates only 11B of 196B parameters per token. Incredibly speed efficient at long contexts.', 256000, true, 0, 0, ARRAY['reasoning', 'finance', 'legal', 'academia', 'fast']),

-- NVIDIA Models
('nvidia/nemotron-3-nano-30b-a3b:free', 'Nemotron 3 Nano 30B A3B', 'NVIDIA', 'Small language MoE model with highest compute efficiency for agentic AI systems. Fully open with weights, datasets and recipes.', 256000, true, 0, 0, ARRAY['agentic', 'efficient', 'open-source']),

('nvidia/llama-nemotron-embed-vl-1b-v2:free', 'Llama Nemotron Embed VL 1B V2', 'NVIDIA', 'Multimodal embedding model optimized for question-answering retrieval. Supports images with text, tables, charts, and infographics.', 131072, true, 0, 0, ARRAY['embedding', 'multimodal', 'retrieval']),

-- MiniMax
('minimax/minimax-m2.5:free', 'MiniMax M2.5', 'MiniMax', 'SOTA LLM for real-world productivity. Fluent in generating Word, Excel, PowerPoint files. 80.2% on SWE-Bench Verified, 51.3% on Multi-SWE-Bench.', 197000, true, 0, 0, ARRAY['coding', 'productivity', 'office', 'swe-bench']),

-- Arcee AI
('arcee-ai/trinity-mini:free', 'Trinity Mini', 'Arcee AI', '26B-parameter (3B active) sparse MoE model with 128 experts. Engineered for efficient reasoning over long contexts with robust function calling.', 131072, true, 0, 0, ARRAY['reasoning', 'function-calling', 'long-context', 'efficient']),

-- OpenAI
('openai/gpt-oss-120b:free', 'GPT-OSS 120B', 'OpenAI', 'Open-weight 117B MoE language model for high-reasoning, agentic, and general-purpose production use. Activates 5.1B parameters per forward pass.', 128000, true, 0, 0, ARRAY['reasoning', 'agentic', 'general-purpose', 'open-source']),

-- Meta Llama Models  
('meta-llama/llama-4-maverick:free', 'Llama 4 Maverick', 'Meta', 'Latest Llama 4 model with advanced reasoning and coding capabilities. Excellent for complex multi-step tasks.', 131072, true, 0, 0, ARRAY['coding', 'reasoning', 'general-purpose']),

('meta-llama/llama-4-scout:free', 'Llama 4 Scout', 'Meta', 'Efficient Llama 4 variant optimized for speed while maintaining strong performance on coding and reasoning tasks.', 131072, true, 0, 0, ARRAY['coding', 'fast', 'efficient']),

-- Google Models
('google/gemma-3-27b-it:free', 'Gemma 3 27B IT', 'Google', 'Instruction-tuned Gemma model with strong coding and reasoning abilities. Open weights from Google.', 131072, true, 0, 0, ARRAY['coding', 'reasoning', 'open-source']),

-- Mistral Models
('mistralai/mistral-small-3.2-24b-instruct:free', 'Mistral Small 3.2 24B', 'Mistral', 'Efficient instruction-tuned model with excellent coding capabilities and fast inference.', 131072, true, 0, 0, ARRAY['coding', 'fast', 'efficient']),

('mistralai/devstral-small:free', 'Devstral Small', 'Mistral', 'Specialized coding model from Mistral optimized for software development tasks.', 131072, true, 0, 0, ARRAY['coding', 'development', 'specialized']),

-- DeepSeek Models
('deepseek/deepseek-r1:free', 'DeepSeek R1', 'DeepSeek', 'Advanced reasoning model with strong performance on complex coding and mathematical tasks.', 131072, true, 0, 0, ARRAY['reasoning', 'coding', 'math']),

('deepseek/deepseek-r1-0528:free', 'DeepSeek R1 0528', 'DeepSeek', 'Updated version of DeepSeek R1 with improved performance across benchmarks.', 131072, true, 0, 0, ARRAY['reasoning', 'coding', 'math']),

('deepseek/deepseek-chat-v3:free', 'DeepSeek Chat V3', 'DeepSeek', 'Latest DeepSeek chat model with excellent conversational abilities and coding support.', 131072, true, 0, 0, ARRAY['chat', 'coding', 'general-purpose']),

-- Microsoft Models
('microsoft/mai-ds-r1:free', 'MAI-DS R1', 'Microsoft', 'Microsoft AI research model with strong reasoning and coding capabilities.', 131072, true, 0, 0, ARRAY['reasoning', 'coding', 'research']),

('microsoft/phi-4:free', 'Phi-4', 'Microsoft', 'Compact but powerful model from Microsoft optimized for efficiency and quality.', 131072, true, 0, 0, ARRAY['efficient', 'coding', 'reasoning'])

ON CONFLICT (model_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  context_length = EXCLUDED.context_length,
  is_free = EXCLUDED.is_free,
  capabilities = EXCLUDED.capabilities;
