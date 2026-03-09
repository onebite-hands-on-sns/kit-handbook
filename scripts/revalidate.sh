#!/bin/bash
# 핸드북 온디맨드 Revalidation 스크립트
# 사용법:
#   특정 페이지: ./scripts/revalidate.sh <slug>
#   전체 페이지: ./scripts/revalidate.sh --all

SITE_URL="${SITE_URL:-https://react-lib-kit.onebitefe.com}"
SECRET="${REVALIDATE_SECRET:-handbook-revalidate-secret-2026}"

if [ -z "$1" ]; then
  echo "사용법:"
  echo "  특정 페이지: ./scripts/revalidate.sh <slug>"
  echo "  전체 페이지: ./scripts/revalidate.sh --all"
  exit 1
fi

if [ "$1" = "--all" ]; then
  echo "전체 페이지 revalidating..."
  curl -s -X POST "$SITE_URL/api/revalidate" \
    -H "Content-Type: application/json" \
    -H "x-revalidate-secret: $SECRET" \
    -d '{}' | python3 -m json.tool
else
  echo "페이지 revalidating: $1"
  curl -s -X POST "$SITE_URL/api/revalidate" \
    -H "Content-Type: application/json" \
    -H "x-revalidate-secret: $SECRET" \
    -d "{\"slug\": \"$1\"}" | python3 -m json.tool
fi
