# janicequach.com — task runner
# Usage: just <command>

# Development
dev:
    pnpm astro dev

build:
    pnpm astro build

preview:
    pnpm astro preview

# Code quality
lint:
    pnpm biome check src/

format:
    pnpm biome format --write src/

# CI — run before every deploy
ci: lint build

# Deploy to Cloudflare Pages
deploy: ci
    CLOUDFLARE_ACCOUNT_ID=80cc805d16aa1dd81cc6f459124b0c51 pnpm wrangler pages deploy
