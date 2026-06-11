# Vercel 환경변수 설정 및 배포 스크립트
# 사전: npx vercel login 완료 필요

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

if (-not (Test-Path .env.local)) {
    Write-Error ".env.local 파일이 없습니다. GEMINI_API_KEY를 먼저 설정하세요."
}

$envContent = Get-Content .env.local -Raw
$apiKey = if ($envContent -match 'GEMINI_API_KEY=(.+)') { $Matches[1].Trim() } else { $null }
$model = if ($envContent -match 'GEMINI_MODEL=(.+)') { $Matches[1].Trim() } else { "gemini-2.5-flash-lite" }

if (-not $apiKey) {
    Write-Error "GEMINI_API_KEY가 .env.local에 없습니다."
}

Write-Host "Vercel 프로젝트 연결 중..."
npx vercel link --yes

Write-Host "환경변수 등록 중 (production, preview, development)..."
$apiKey | npx vercel env add GEMINI_API_KEY production preview development
$model | npx vercel env add GEMINI_MODEL production preview development

Write-Host "프로덕션 배포 중..."
npx vercel --prod --yes

Write-Host "완료!"
