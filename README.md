# STEM VizAI • Visualize Physics Math

Transform abstract problems into clear, interactive simulations instantly.

> 通过自然语言或图像描述物理/数学问题，自动生成可交互的 HTML5 可视化仿真。

## 在线演示
- ENS 网关（推荐）：https://xzid3qry.pinit.eth.limo
- IPFS 网关 1：`https://ipfs.io/ipfs/bafybeif5uglyngqm7eihc65pmoldrndl23h462pt4r7fvj2pydxzid3qry/`
- IPFS 网关 2：`https://bafybeif5uglyngqm7eihc65pmoldrndl23h462pt4r7fvj2pydxzid3qry.ipfs.dweb.link/`

## 功能特性
- 一键把抽象题目转成交互仿真（HTML5 Canvas + 原生 JS）
- 支持文本 + 图片输入（图片自动转 Base64 传给模型）
- 自适应布局与强交互控制面板（滑杆、数值输入、按钮）
- 多 AI 平台直连：
  - Google Gemini
  - OpenAI
  - DeepSeek
  - Aliyun DashScope（阿里云）
  - Anthropic Claude
- 设置面板可直接填写 `Base URL / API 路径 / 模型 ID / API Key`，并提供“测试”按钮
- 本地存储记住你的设置（不会打包到构建产物，不含任何密钥）
- 纯前端，无服务端依赖

## 技术栈
- React 19 + Vite 6
- Tailwind（CDN 方式）
- Icons：`lucide-react`
- 可选：Google GenAI SDK（Gemini）

## 快速开始
### 环境要求
- Node.js 18+（建议最新版）
- npm 或 yarn

### 本地运行
```bash
npm install
npm run dev
```

### 构建与预览
```bash
npm run build
npm run preview
```

## API 配置说明
右上角点击“齿轮”即可打开设置面板，字段含义：
- 访问网址 Base URL
  - Gemini：`https://generativelanguage.googleapis.com`
  - OpenAI：`https://api.openai.com`
  - DeepSeek：`https://api.deepseek.com`
  - Aliyun：`https://dashscope.aliyuncs.com`
  - Claude：`https://api.anthropic.com`
- API 路径
  - Gemini：`v1beta/models/{model}:generateContent`
  - OpenAI/DeepSeek/Aliyun：`v1/chat/completions`
  - Claude：`v1/messages`
- 模型 ID（示例）
  - Gemini：`gemini-3-pro-preview`
  - OpenAI：`gpt-4o-mini`
  - DeepSeek：`deepseek-chat`
  - Aliyun：`qwen-plus`
  - Claude：`claude-3-5-sonnet-20241022`
- API Key
  - 发往 OpenAI/DeepSeek/Aliyun 使用 `Authorization: Bearer`
  - 发往 Claude 使用 `x-api-key` + `anthropic-version`

“默认”按钮会根据当前 Provider 自动填充标准 Base URL 与 API 路径；“测试”按钮会对当前设置做最小请求健康检查。

## 安全性
- API Key 只保存在浏览器 `localStorage`，**不会**进入打包产物。
- 构建产物中不包含任何密钥或环境变量注入。
- 请勿把密钥写入源码或提交到版本库。

## 部署指南（PinMe）
> 把前端静态文件一键上传到 IPFS，并通过 ENS 子域名提供访问。

### Windows 命令行（建议使用 `.cmd` 包装以绕过 PowerShell 执行策略）
```bash
# 全局安装
npm install -g pinme

# 构建
npm run build

# 上传 dist
pinme.cmd upload dist

# 查看最近上传记录
pinme.cmd ls -l 5

# 删除旧的 CID（unpin）
pinme.cmd rm <旧CID>
```

提示：
- Vite 项目在去中心化网关下需设置 `base: './'`，避免资源路径错误（本项目已配置）
- ENS 网关若显示 `Requested ENS name does not have a content hash set.`，说明子域名尚未写入 content hash 或在传播中，稍等再试或重新上传

## 常见问题
- 打开 IPFS 出现白屏：
  - 多半是网关缓存/传播延迟；请稍等或切换不同 IPFS 网关链接
  - 已确保构建配置 `base: './'`，资源路径正确
- API 测试失败：
  - 请确认 `Base URL + API 路径 + 模型 ID + API Key` 正确且与所选 Provider 匹配
  - 误把完整 URL 填进 API 路径会导致拼接错误，设置面板已对协议前缀做防御清洗

## 路线图
- 更多仿真类别与模板
- 模型切换的预设配置集
- 国际化与无障碍支持

## 许可证
MIT

## 鸣谢与参考
- Google Gemini: https://ai.google.dev/gemini-api/docs
- OpenAI: https://platform.openai.com/docs/api-reference
- DeepSeek: https://platform.deepseek.com/api-docs
- Aliyun DashScope: https://help.aliyun.com/zh/model-studio/developers/api-reference
- Anthropic: https://docs.anthropic.com/en/api
