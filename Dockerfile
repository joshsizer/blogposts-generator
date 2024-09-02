FROM mcr.microsoft.com/playwright:v1.35.1@sha256:057986cae15308427a7ab0661126638761367bee54675462fb8467d6f4e357e4

WORKDIR /app
COPY package.json package-lock.json tsconfig.json decs.d.ts src/ ./

RUN npm install
RUN npx playwright install
RUN npm run build

ENTRYPOINT [ "node" ]
CMD ["build/index.js"]
