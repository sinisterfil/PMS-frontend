#!/bin/sh

set -e

echo "Checking dependencies..."

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting frontend..."
npm run dev
