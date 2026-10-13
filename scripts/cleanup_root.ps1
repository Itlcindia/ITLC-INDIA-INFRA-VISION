Write-Host "=== Safe Root Clutter Cleanup ===" -ForegroundColor Cyan

$root = "c:\Users\Pankaj\Downloads\ITLC Construction"

# 1. Folders to clean from root
$foldersToRemove = @('interior', 'method', 'news', 'project', 'services', 'docs')
foreach ($f in $foldersToRemove) {
    $target = Join-Path $root $f
    if (Test-Path $target) {
        Write-Host "Removing root folder: $f" -ForegroundColor Yellow
        Remove-Item -Path $target -Recurse -Force
    }
}

# 2. Loose raw videos from root
$videosToRemove = @(
    'Modern_home_construction_time-lapse_202607111232_202607111239.mp4',
    'Modern_house_construction_timelapse_1080p_20261008112702.mp4',
    'Untitled_Scene_10-08_06_06_16_20261008114308.mp4',
    'WhatsApp Video 2026-10-07 at 1.29.25 PM.mp4'
)
foreach ($v in $videosToRemove) {
    $target = Join-Path $root $v
    if (Test-Path $target) {
        Write-Host "Removing loose video: $v" -ForegroundColor Yellow
        Remove-Item -Path $target -Force
    }
}

# 3. Loose raw images from root
$imagesToRemove = @(
    'ChatGPT Image Jul 8, 2026, 12_43_05 PM.png',
    'WhatsApp Image 2026-10-07 at 5.23.58 PM.jpeg',
    'WhatsApp Image 2026-10-07 at 5.29.52 PM.jpeg'
)
foreach ($img in $imagesToRemove) {
    $target = Join-Path $root $img
    if (Test-Path $target) {
        Write-Host "Removing loose image: $img" -ForegroundColor Yellow
        Remove-Item -Path $target -Force
    }
}

# 4. Loose root webp files
$looseWebp = Get-ChildItem -Path $root -Filter "img_*.webp" -File
foreach ($w in $looseWebp) {
    Write-Host "Removing loose root webp: $($w.Name)" -ForegroundColor Yellow
    Remove-Item -Path $w.FullName -Force
}

Write-Host "=== Root Cleanup Complete! ===" -ForegroundColor Green
