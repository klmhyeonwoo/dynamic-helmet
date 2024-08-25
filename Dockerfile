# Puppeteer와 호환 가능한 Node.js 이미지 사용
FROM zenika/alpine-chrome:with-puppeteer

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 lock 파일 복사
COPY package.json ./
COPY pnpm-lock.yaml ./

# 종속성 설치
RUN pnpm install

# 소스 파일 복사
COPY . .

# 빌드 실행
RUN pnpm run build

# 기본 실행 명령어
CMD ["pnpm", "start"]