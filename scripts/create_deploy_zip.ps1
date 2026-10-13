param (
    [string]$DestinationZip = "C:\Users\Pankaj\Downloads\ITLC_Hostinger_PublicHTML_Deploy.zip"
)

Write-Host "=== ITLC Hostinger 1-Click Deploy Package ===" -ForegroundColor Cyan

$distDir = "C:\Users\Pankaj\Downloads\ITLC Construction\client\dist"
$apiDir = "C:\Users\Pankaj\Downloads\ITLC Construction\api"
$stagingDir = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "ITLC_Deploy_Staging")

if (Test-Path $stagingDir) {
    Remove-Item -Path $stagingDir -Recurse -Force
}
New-Item -Path $stagingDir -ItemType Directory -Force | Out-Null

if (Test-Path $DestinationZip) {
    Remove-Item -Path $DestinationZip -Force
}

# 1. Copy everything from client\dist into staging root (will become public_html)
Write-Host "Copying client dist files to staging root..." -ForegroundColor Yellow
Get-ChildItem -Path $distDir -Recurse | ForEach-Object {
    $relPath = $_.FullName.Substring($distDir.Length).TrimStart('\', '/')
    $dest = Join-Path $stagingDir $relPath
    if ($_.PSIsContainer) {
        if (!(Test-Path $dest)) { New-Item -Path $dest -ItemType Directory -Force | Out-Null }
    } else {
        $parent = Split-Path $dest -Parent
        if (!(Test-Path $parent)) { New-Item -Path $parent -ItemType Directory -Force | Out-Null }
        Copy-Item -Path $_.FullName -Destination $dest -Force
    }
}

# 2. Copy api folder into staging\api
$destApi = Join-Path $stagingDir "api"
New-Item -Path $destApi -ItemType Directory -Force | Out-Null
Write-Host "Copying api backend to staging/api..." -ForegroundColor Yellow
Get-ChildItem -Path $apiDir -Recurse | ForEach-Object {
    $relPath = $_.FullName.Substring($apiDir.Length).TrimStart('\', '/')
    $dest = Join-Path $destApi $relPath
    if ($_.PSIsContainer) {
        if (!(Test-Path $dest)) { New-Item -Path $dest -ItemType Directory -Force | Out-Null }
    } else {
        $parent = Split-Path $dest -Parent
        if (!(Test-Path $parent)) { New-Item -Path $parent -ItemType Directory -Force | Out-Null }
        Copy-Item -Path $_.FullName -Destination $dest -Force
    }
}

# Ensure uploads folder exists with .gitkeep
$uploadsFolder = Join-Path $destApi "uploads"
if (!(Test-Path $uploadsFolder)) { New-Item -Path $uploadsFolder -ItemType Directory -Force | Out-Null }
$gitkeep = Join-Path $uploadsFolder ".gitkeep"
if (!(Test-Path $gitkeep)) { New-Item -Path $gitkeep -ItemType File -Force | Out-Null }

Write-Host "Creating ZIP: $DestinationZip" -ForegroundColor Yellow
Add-Type -AssemblyName "System.IO.Compression.FileSystem"
[System.IO.Compression.ZipFile]::CreateFromDirectory($stagingDir, $DestinationZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)

$zipSize = (Get-Item $DestinationZip).Length
Write-Host ("Successfully created: {0} ({1:N2} MB)" -f $DestinationZip, ($zipSize / 1MB)) -ForegroundColor Green

# Cleanup
Remove-Item -Path $stagingDir -Recurse -Force
Write-Host "Done!" -ForegroundColor Cyan
