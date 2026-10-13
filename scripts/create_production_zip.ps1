param (
    [string]$DestinationZip = "C:\Users\Pankaj\Downloads\ITLC_Construction_Production.zip"
)

Write-Host "=== ITLC Construction Production Packaging ===" -ForegroundColor Cyan

$sourceDir = "C:\Users\Pankaj\Downloads\ITLC Construction"
$stagingDir = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "ITLC_Package_Staging")

if (Test-Path $stagingDir) {
    Remove-Item -Path $stagingDir -Recurse -Force
}
New-Item -Path $stagingDir -ItemType Directory -Force | Out-Null

if (Test-Path $DestinationZip) {
    Remove-Item -Path $DestinationZip -Force
}

# Directories and files to exclude explicitly:
# 1. node_modules (heavy, OS-specific dependencies; installed via npm install)
# 2. .git / .github (version control metadata)
# 3. .vscode / .idea (IDE user configs)
# 4. cache and log files (*.log, npm-debug.log)
# 5. OS files (Thumbs.db, .DS_Store, desktop.ini)

Write-Host "Copying files to staging directory while ignoring unwanted files..." -ForegroundColor Yellow

$excludePatterns = @(
    "\\node_modules",
    "\\\.git",
    "\\\.vscode",
    "\\\.idea",
    "\.log$",
    "Thumbs\.db$",
    "\.DS_Store$",
    "desktop\.ini$"
)

$allFiles = Get-ChildItem -Path $sourceDir -Recurse -File

$copiedCount = 0
$ignoredCount = 0
$totalSize = 0

foreach ($file in $allFiles) {
    $relPath = $file.FullName.Substring($sourceDir.Length).TrimStart('\', '/')
    
    # Check if file should be ignored
    $isIgnored = $false
    foreach ($pattern in $excludePatterns) {
        if ($file.FullName -match $pattern) {
            $isIgnored = $true
            break
        }
    }

    if ($isIgnored) {
        $ignoredCount++
        continue
    }

    $destPath = Join-Path $stagingDir $relPath
    $destFolder = Split-Path -Path $destPath -Parent
    if (!(Test-Path $destFolder)) {
        New-Item -Path $destFolder -ItemType Directory -Force | Out-Null
    }

    Copy-Item -Path $file.FullName -Destination $destPath -Force
    $copiedCount++
    $totalSize += $file.Length
}

Write-Host ("Copied {0} files ({1:N2} MB) into staging. Ignored {2} files." -f $copiedCount, ($totalSize / 1MB), $ignoredCount) -ForegroundColor Green

Write-Host "Creating ZIP archive: $DestinationZip" -ForegroundColor Yellow
Add-Type -AssemblyName "System.IO.Compression.FileSystem"
[System.IO.Compression.ZipFile]::CreateFromDirectory($stagingDir, $DestinationZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)

$zipSize = (Get-Item $DestinationZip).Length
Write-Host ("Successfully created: {0} ({1:N2} MB)" -f $DestinationZip, ($zipSize / 1MB)) -ForegroundColor Green

# Cleanup staging
Remove-Item -Path $stagingDir -Recurse -Force
Write-Host "Staging cleanup done." -ForegroundColor Cyan
