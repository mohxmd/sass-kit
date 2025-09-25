#!/bin/bash
# Script to update all dependencies in a Turborepo project to latest versions

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Updating all dependencies to latest versions...${NC}"

# Update root dependencies
echo -e "${YELLOW}📦 Updating root package dependencies...${NC}"
pnpm up -L

# Update workspace dependencies
echo -e "${YELLOW}📦 Updating workspace dependencies...${NC}"
pnpm -r up -L

echo -e "${GREEN}✅ Dependencies updated!${NC} Please review changes and run tests."
echo -e "🔍 You may need to resolve version conflicts manually."
echo -e "💡 Next steps: Run 'pnpm install' to ensure everything is properly installed."
