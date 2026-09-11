# Publishes the built site (dist/) to the gh-pages branch that GitHub Pages serves.
#
# Why not GitHub Actions: pushes to main would normally trigger
# .github/workflows/deploy.yml, but that workflow cannot run while the account is
# locked for a billing issue. Once billing is resolved, switch Pages back with:
#   gh api -X PUT repos/sjc-tommy/sjc-tommy.github.io/pages -f build_type=workflow
# after that, plain `git push` to main deploys again and this script is optional.

param(
  [string]$Proxy = 'http://127.0.0.1:7897',
  [string]$Repo  = 'sjc-tommy/sjc-tommy.github.io'
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

npm run build
if ($LASTEXITCODE -ne 0) { throw 'vite build failed' }

$stage = Join-Path $env:TEMP ("ghp-deploy-" + [guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory -Path $stage | Out-Null

Copy-Item -Recurse -Force (Join-Path $PSScriptRoot 'dist\*') $stage
New-Item -ItemType File -Path (Join-Path $stage '.nojekyll') | Out-Null

git -C $stage init -q -b gh-pages
git -C $stage config user.name 'sjc-tommy'
git -C $stage config user.email '223252755+sjc-tommy@users.noreply.github.com'
git -C $stage config http.version HTTP/1.1
if ($Proxy) {
  git -C $stage config http.proxy $Proxy
  git -C $stage config https.proxy $Proxy
}
git -C $stage add -A
git -C $stage commit -q -m "Publish built site"
git -C $stage remote add origin "https://github.com/$Repo.git"
git -C $stage push -f origin gh-pages
if ($LASTEXITCODE -ne 0) { throw 'push failed' }

Remove-Item -LiteralPath $stage -Recurse -Force
Write-Host ''
Write-Host "Deployed -> https://sjc-tommy.github.io/  (CDN refresh usually under a minute)"
