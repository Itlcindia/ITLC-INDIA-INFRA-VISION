Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -Path "client\public\images\interior\*.jpg"
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]85)

foreach ($f in $files) {
    try {
        $sourceImg = [System.Drawing.Image]::FromFile($f.FullName)
        $w = $sourceImg.Width
        $h = $sourceImg.Height
        $newW = 900
        $newH = [int]($h * (900.0 / $w))
        
        $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($sourceImg, 0, 0, $newW, $newH)
        
        $sourceImg.Dispose()
        $g.Dispose()
        
        $tempPath = $f.FullName + ".resized.jpg"
        $bmp.Save($tempPath, $codec, $encoderParams)
        $bmp.Dispose()
        
        Move-Item -Path $tempPath -Destination $f.FullName -Force
        $kb = [math]::Round((Get-Item $f.FullName).Length / 1KB, 1)
        Write-Host "$($f.Name) optimized to $kb KB"
    } catch {
        Write-Host "Error with $($f.Name): $_"
    }
}
