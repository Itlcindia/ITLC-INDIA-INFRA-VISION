<?php
// INFRA VISION (by ITLC India Pvt Ltd)
// Enterprise Protected Media Upload Engine (Strict Auth, MIME Whitelist, WebP Auto-Compression)
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

// 1. Mandatory Administrative Token Authentication
$admin_session = require_admin_auth($pdo);

// 2. Validate Upload Existence
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No valid image file uploaded.']);
    exit;
}

$file = $_FILES['image'];

// 3. Size Limit (10MB Max)
if ($file['size'] > 10 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Image exceeds maximum 10MB size limit.']);
    exit;
}

// 4. Strict Extension Whitelist Check
$original_name = $file['name'];
$extension = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));
$allowed_extensions = ['jpg', 'jpeg', 'png', 'webp'];

if (!in_array($extension, $allowed_extensions, true)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid file extension. Only JPG, PNG, and WebP are permitted.']);
    exit;
}

// 5. Strict MIME Type Verification via finfo
$allowed_mime_types = ['image/jpeg', 'image/png', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime_type = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime_type, $allowed_mime_types, true)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Disallowed file content. Uploaded file is not a valid image.']);
    exit;
}

// 6. Deep Image Integrity Verification using getimagesize
$image_info = @getimagesize($file['tmp_name']);
if ($image_info === false) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Corrupt or unreadable image file.']);
    exit;
}

// 7. Secure Destination Directory
$upload_dir = __DIR__ . '/uploads/projects/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

// Ensure .htaccess prevents execution in uploads directory
$htaccess_path = __DIR__ . '/uploads/.htaccess';
if (!file_exists($htaccess_path)) {
    $htaccess_content = "# Disable script execution in uploads directory\n<FilesMatch \"\.(php|phtml|php3|php4|php5|php7|php8|phps|cgi|pl|exe|sh|html|htm)$\">\n  Order Deny,Allow\n  Deny from all\n</FilesMatch>\nOptions -Indexes -ExecCGI\n";
    @file_put_contents($htaccess_path, $htaccess_content);
}

// 8. Generate Completely Randomized Safe Filename (Zero user input in filename)
$random_token = bin2hex(random_bytes(8));
$timestamp = time();
$safe_filename = "infra_{$timestamp}_{$random_token}.webp";
$target_path = $upload_dir . $safe_filename;

// 9. Process and Convert Image to WebP
$converted = false;
if (extension_loaded('gd')) {
    $src_img = null;
    if ($mime_type === 'image/jpeg') {
        $src_img = @imagecreatefromjpeg($file['tmp_name']);
    } else if ($mime_type === 'image/png') {
        $src_img = @imagecreatefrompng($file['tmp_name']);
        if ($src_img) {
            imagepalettetotruecolor($src_img);
            imagealphablending($src_img, true);
            imagesavealpha($src_img, true);
        }
    } else if ($mime_type === 'image/webp') {
        $src_img = @imagecreatefromwebp($file['tmp_name']);
    }

    if ($src_img) {
        imagewebp($src_img, $target_path, 88); // 88% Quality WebP Compression
        imagedestroy($src_img);
        $converted = true;
    }
}

if (!$converted) {
    // If GD WebP conversion is not available, safely store with randomized filename and verified extension
    $safe_extension = ($extension === 'jpeg' ? 'jpg' : $extension);
    $safe_filename = "infra_{$timestamp}_{$random_token}.{$safe_extension}";
    $target_path = $upload_dir . $safe_filename;
    move_uploaded_file($file['tmp_name'], $target_path);
}

$permanent_url = '/api/uploads/projects/' . $safe_filename;

echo json_encode([
    'status' => 'success',
    'message' => 'Image permanently and securely saved to disk.',
    'url' => $permanent_url,
    'filename' => $safe_filename,
    'uploaded_by' => $admin_session['username']
]);
