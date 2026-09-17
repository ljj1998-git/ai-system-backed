# ---- 构建阶段 (Builder) ----
FROM node:24.21.0-alpine AS builder

WORKDIR /app

# 启用 Corepack 以使用 pnpm（Node.js 16+ 内置）
RUN corepack enable

# 复制依赖清单文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 安装所有依赖（包含 devDependencies，构建时需要）
RUN pnpm install --frozen-lockfile

# 复制源代码并执行构建
COPY . .
RUN pnpm run build

# ---- 运行阶段 (Runner) ----
FROM node:24.21.0-alpine AS runner

WORKDIR /app

# 启用 Corepack 以使用 pnpm
RUN corepack enable

# 设置生产环境变量
ENV NODE_ENV=production

# 复制依赖清单
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 仅安装生产依赖（--prod 跳过 devDependencies）
RUN pnpm install --prod --frozen-lockfile

# 从构建阶段复制编译后的产物
COPY --from=builder /app/dist ./dist

# 暴露 NestJS 默认端口
EXPOSE 3000

# 启动命令
CMD ["node", "dist/main.js"]