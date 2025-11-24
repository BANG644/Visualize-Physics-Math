# STEM VizAI（Visualize Physics Math）

一个将物理/数学题目（文本或示意图）直接可视化为可交互 HTML5 模拟的前端应用。支持多家主流大模型服务，设置持久化到浏览器，示例一键运行，开箱即用。

- 在线地址：[https://6njaw4pe.pinit.eth.limo/](https://6njaw4pe.pinit.eth.limo/)
- English: see [README.md](./README.md)

## 功能特性

- 多提供商支持：Google Gemini、OpenAI、DeepSeek、阿里云通义（DashScope）、Anthropic Claude
- 内置设置面板：`Base URL`、`API Path`、`模型ID`、`API Key` 可配置；持久化到 `localStorage`
- 一键测试：内置“测试”按钮验证当前提供商/模型的最小请求
- 文本 + 图片输入：可描述题目或上传示意图辅助上下文
- 示例库：点击任意示例卡片即可自动生成交互模拟
- 响应式布局 + 深色模式：Tailwind CSS，桌面/移动端友好
- 适配 IPFS/ENS：`vite.config.ts` 已设置 `base: './'`，适配网关

## 快速开始（在线）

1. 打开在线站点：`https://6njaw4pe.pinit.eth.limo/`
2. 点击右上角“设置”图标，配置你的提供商：
   - 填写 `Base URL`、`API Path`、`模型ID`、`API Key`
   - 常见平台已提供默认值，可直接选择
3. 点击“测试”验证配置是否生效
4. 在“Describe the Problem”输入题目，或下滑到 “Try an Example” 点击任意示例卡片
5. 应用会生成交互式 HTML5 模拟（画布 + 控制面板），你可以直接调节各项参数深入探索
6. 点击标题返回并继续尝试其它示例

## 快速开始（本地）

- 前置条件：Node.js 18+
- 安装依赖：`npm install`
- 启动开发：`npm run dev`
- 构建生产包：`npm run build`

说明：本项目不需要 `.env` 注入密钥。请在右上角“设置”面板中配置，密钥仅保存在浏览器 `localStorage`。

## 提供商与鉴权

- Base URL 示例：
  - Gemini: `https://generativelanguage.googleapis.com`
  - OpenAI: `https://api.openai.com`
  - DeepSeek: `https://api.deepseek.com`
  - Aliyun DashScope: `https://dashscope.aliyuncs.com`
  - Anthropic: `https://api.anthropic.com`
- API Path：
  - Gemini: `v1beta/models/{model}:generateContent`
  - 其它平台：一般为 `v1/chat/completions` 或 `v1/messages`
- 模型示例：
  - Gemini: `gemini-3-pro-preview`
  - OpenAI: `gpt-4o-mini`
  - DeepSeek: `deepseek-chat`
  - Aliyun: `qwen-plus`
  - Anthropic: `claude-3-5-sonnet-20241022`
- 鉴权方式：
  - OpenAI/DeepSeek/Aliyun：`Authorization: Bearer <key>`
  - Anthropic：`x-api-key: <key>` 并设置 `anthropic-version`
  - Gemini：通过查询参数 `?key=<key>`

## 部署（IPFS/ENS）

1. 构建：`npm run build`
2. 使用 PinMe 等工具上传 `dist/` 目录并获取 CID
3. 将 ENS 的 `contenthash` 指向新的 CID；如网关出现白屏，请确认使用最新构建且 `vite.config.ts` 的 `base: './'` 已生效

## 安全与隐私

- 项目不会将 API Key 打包到构建产物或提交到仓库；密钥仅存储在浏览器 `localStorage`
- `.gitignore` 已排除 `dist/` 和本地文件

## 许可证

本项目使用 MIT 协议，详情见 [LICENSE](./LICENSE)。
