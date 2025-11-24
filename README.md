# STEM VizAI • Visualize Physics Math

A front‑end app that turns physics and math problems (text or diagram) into interactive HTML5 simulations. It supports multiple AI providers, persists settings in the browser, and features one‑click examples to get you started fast.

- Live app: https://xzid3qry.pinit.eth.limo/
- 中文文档: see [README.zh-CN.md](./README.zh-CN.md)

## Features

- Multi‑provider support: Google Gemini, OpenAI, DeepSeek, Aliyun DashScope, Anthropic Claude
- In‑app settings panel: configure `Base URL`, `API Path`, `Model ID`, `API Key`; values persist to `localStorage`
- Built‑in key tester: quickly verifies your provider/model setup with a minimal request
- Text + image input: describe the problem or upload a diagram to contextualize the prompt
- Example gallery: click any example to auto‑generate a simulation
- Responsive UI + dark mode: Tailwind CSS layout, desktop/mobile friendly
- IPFS/ENS ready: Vite configured with `base: './'` for gateway compatibility

## Quick Start (Web)

1. Open the live app: `https://xzid3qry.pinit.eth.limo/`
2. Click the settings icon (top right) and configure your provider:
   - Set `Base URL`, `API Path`, `Model ID`, `API Key`
   - Use provided defaults for common providers
3. Click "Test" to validate your API setup
4. Use "Describe the Problem" to enter a prompt, or scroll to "Try an Example" and click any card
5. The app generates an interactive HTML5 simulation (canvas + controls). Use the controls to explore the scenario
6. Click the title to reset and try another example

## Quick Start (Local)

- Prerequisite: Node.js 18+
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

Note: No `.env` injection is required. API credentials are configured in the app settings and stored in the browser `localStorage`.

## Providers & Auth

- Base URL examples:
  - Gemini: `https://generativelanguage.googleapis.com`
  - OpenAI: `https://api.openai.com`
  - DeepSeek: `https://api.deepseek.com`
  - Aliyun DashScope: `https://dashscope.aliyuncs.com`
  - Anthropic: `https://api.anthropic.com`
- API Path:
  - Gemini: `v1beta/models/{model}:generateContent`
  - Others: commonly `v1/chat/completions` or `v1/messages`
- Model examples:
  - Gemini: `gemini-3-pro-preview`
  - OpenAI: `gpt-4o-mini`
  - DeepSeek: `deepseek-chat`
  - Aliyun: `qwen-plus`
  - Anthropic: `claude-3-5-sonnet-20241022`
- Auth:
  - OpenAI/DeepSeek/Aliyun: `Authorization: Bearer <key>`
  - Anthropic: `x-api-key: <key>` + `anthropic-version`
  - Gemini: append `?key=<key>`

## Deployment (IPFS/ENS)

1. Build: `npm run build`
2. Upload the `dist/` folder with your IPFS pinning tool (e.g., PinMe) and get a CID
3. Point your ENS `contenthash` to the new CID. If you see a white screen on a gateway, ensure you deployed the latest build and `vite.config.ts` uses `base: './'`

## Security

- API keys are not bundled into the build or committed to the repo
- Credentials live only in the browser `localStorage`
- `.gitignore` excludes build artifacts and local files

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL‑3.0). See [LICENSE](./LICENSE) for details.
