FROM mcr.microsoft.com/playwright:v1.35.0-jammy@sha256:7f3d0d31d15183c008caf7057b084364d7731a2090c2132f5dd733f55342f7b7

WORKDIR /app
COPY package.json package-lock.json tsconfig.json decs.d.ts src/ ./

RUN npm install
RUN npx playwright install
RUN npm run build

ENTRYPOINT [ "node" ]
CMD ["build/index.js"]
