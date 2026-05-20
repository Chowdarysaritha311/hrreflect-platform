#!/bin/bash
# ─────────────────────────────────────────────────────────
# HRReflect — One-Click Deploy Script for Contabo VPS
# Run this on the server: bash deploy.sh
# ─────────────────────────────────────────────────────────

set -e
GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo -e "${GREEN}"
echo "╔══════════════════════════════════════╗"
echo "║   HRReflect Deploy Script v1.0       ║"
echo "╚══════════════════════════════════════╝"
echo -e "${NC}"

# ── Step 1: Pull latest code ──────────────────────────────
echo -e "${YELLOW}📥 Step 1: Pulling latest code from GitHub...${NC}"
git pull origin main
echo -e "${GREEN}✅ Code updated${NC}\n"

# ── Step 2: Backend setup ─────────────────────────────────
echo -e "${YELLOW}⚙️  Step 2: Setting up backend...${NC}"
cd backend
npm install --omit=dev
echo -e "${GREEN}✅ Backend dependencies installed${NC}\n"

# ── Step 3: Check .env file ───────────────────────────────
if [ ! -f .env ]; then
  echo -e "${RED}⚠️  WARNING: backend/.env file not found!${NC}"
  echo "Please create it from .env.example:"
  echo "  cp .env.example .env && nano .env"
  echo ""
fi
cd ..

# ── Step 4: Build frontend ────────────────────────────────
echo -e "${YELLOW}🔨 Step 3: Building frontend...${NC}"
cd frontend
npm install --omit=dev
npm run build
echo -e "${GREEN}✅ Frontend built successfully${NC}\n"
cd ..

# ── Step 5: Restart backend ───────────────────────────────
echo -e "${YELLOW}🔄 Step 4: Restarting backend...${NC}"
if command -v pm2 &> /dev/null; then
  cd backend
  pm2 restart hrreflect-api 2>/dev/null || pm2 start src/server.js --name hrreflect-api
  pm2 save
  cd ..
  echo -e "${GREEN}✅ Backend restarted with PM2${NC}\n"
else
  echo -e "${RED}⚠️  PM2 not found. Install it: npm install -g pm2${NC}"
  echo "Then run: cd backend && pm2 start src/server.js --name hrreflect-api"
fi

echo -e "${GREEN}"
echo "╔══════════════════════════════════════╗"
echo "║   ✅ Deployment Complete!             ║"
echo "╚══════════════════════════════════════╝"
echo -e "${NC}"
echo "All changes are now live on hrreflect.com"
