Write-Host "=== Assets Check ===" -ForegroundColor Cyan

$rootDirs = @('interior', 'method', 'news', 'project', 'services')
foreach ($d in $rootDirs) {
    if (Test-Path $d) {
        $files = Get-ChildItem -Path $d -File
        Write-Host "Root $d ($($files.Count) files):"
        foreach ($f in $files) {
            Write-Host "   $($f.Name) ($([math]::Round($f.Length/1KB, 1)) KB)"
        }
    }
}

Write-Host "`n=== Public Images Check ===" -ForegroundColor Cyan
$publicDirs = @('interior', 'methodology', 'news', 'projects', 'services', 'site', 'drone')
foreach ($d in $publicDirs) {
    $p = "client\public\images\$d"
    if (Test-Path $p) {
        $files = Get-ChildItem -Path $p -File
        Write-Host "client/public/images/$d ($($files.Count) files):"
        foreach ($f in $files) {
            Write-Host "   $($f.Name)"
        }
    }
}
