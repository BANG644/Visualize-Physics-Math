# STEM VizAI（Visualize Physics Math）

一个将物理/数学题目（文本或示意图）直接可视化为可交互 HTML5 模拟的前端应用。支持多家主流大模型服务，内置本地持久化设置，开箱即用。
已部署链接:https://xzid3qry.pinit.eth.limo/

## 主要特性

- 多模型提供商：Google Gemini、OpenAI、DeepSeek、阿里云通义（DashScope）、Anthropic Claude
- 即填即用的设置面板：`Base URL`、`API Path`、`模型ID`、`API Key` 均可在界面中填写并持久化到浏览器 `localStorage`
- 自适应布局与深色模式：Tailwind CSS 样式，支持桌面/移动端
- Vite 构建，适配 IPFS/ENS 网关（`vite.config.ts` 已设置 `base: './'`）

## 快速开始

前置条件：已安装 Node.js（建议 18+）

1. 安装依赖：
   `npm install`
2. 启动开发：
   `npm run dev`
3. 构建生产包：
   `npm run build`

> 说明：本项目不需要 `.env` 注入 API Key。请在右上角“设置”面板中直接填写并保存到浏览器 `localStorage`。

## API 配置说明

- Base URL：各平台的访问地址，例如：
  - Gemini: `https://generativelanguage.googleapis.com`
  - OpenAI: `https://api.openai.com`
  - DeepSeek: `https://api.deepseek.com`
  - Aliyun DashScope: `https://dashscope.aliyuncs.com`
  - Anthropic: `https://api.anthropic.com`
- API Path：
  - Gemini: `v1beta/models/{model}:generateContent`
  - 其余平台：一般为 `v1/chat/completions` 或 `v1/messages`
- 模型ID：示例
  - Gemini: `gemini-3-pro-preview`
  - OpenAI: `gpt-4o-mini`
  - DeepSeek: `deepseek-chat`
  - Aliyun: `qwen-plus`
  - Anthropic: `claude-3-5-sonnet-20241022`
- API Key：
  - OpenAI/DeepSeek/Aliyun：使用 `Authorization: Bearer <key>`
  - Anthropic：使用 `x-api-key: <key>` 并设置 `anthropic-version`
  - Gemini：通过查询参数 `?key=<key>`

> 右上角“测试”按钮会按所选平台的协议发起最小请求，以验证 Key/模型配置是否可用。

## 部署到 IPFS（PinMe）

1. 运行构建：`npm run build`
2. 使用 PinMe 上传 `dist/` 目录并获取 CID
3. 将 ENS 的 contenthash 指向新的 CID；如遇到网关白屏，请确认使用最新构建、`vite.config.ts` 的 `base: './'` 已生效

## 安全与隐私

- 项目不会将 API Key 打包到构建产物或提交到仓库；Key 仅存储在浏览器 `localStorage`
- `.gitignore` 已排除 `dist/`、本地环境文件等

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS
- 多提供商 REST/SDK 适配

## 许可证

未指定许可证。如需开源协议，请在仓库设置相应 `LICENSE` 文件。
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

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
