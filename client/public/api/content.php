<?php
// INFRA VISION (by ITLC India Pvt Ltd)
// Central Dynamic CMS Content REST API with Enterprise Token Authorization
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Auto-create tbl_pages_content if missing
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `tbl_pages_content` (
          `page_key` VARCHAR(50) PRIMARY KEY,
          `content_json` LONGTEXT NOT NULL,
          `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
} catch (Exception $e) {}

// Public Read Access (GET)
if ($method === 'GET') {
    $page = $_GET['page'] ?? 'all';

    try {
        if ($page === 'all') {
            $stmt = $pdo->query("SELECT `page_key`, `content_json` FROM `tbl_pages_content`");
            $rows = $stmt->fetchAll();
            $data = [];
            foreach ($rows as $row) {
                $data[$row['page_key']] = json_decode($row['content_json'], true);
            }
            // Seamlessly sync dedicated MySQL image and video tables
            if (empty($data['siteImages'])) {
                try {
                    $imgStmt = $pdo->query("SELECT * FROM `tbl_site_images`");
                    $siteImgs = $imgStmt->fetchAll();
                    if ($siteImgs) $data['siteImages'] = $siteImgs;
                } catch (Exception $e) {}
            }
            if (empty($data['siteVideos'])) {
                try {
                    $vidStmt = $pdo->query("SELECT * FROM `tbl_site_videos`");
                    $siteVids = $vidStmt->fetchAll();
                    if ($siteVids) $data['siteVideos'] = $siteVids;
                } catch (Exception $e) {}
            }
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            $stmt = $pdo->prepare("SELECT `content_json` FROM `tbl_pages_content` WHERE `page_key` = ? LIMIT 1");
            $stmt->execute([$page]);
            $row = $stmt->fetch();
            if ($row) {
                echo json_encode(['status' => 'success', 'data' => json_decode($row['content_json'], true)]);
            } else {
                echo json_encode(['status' => 'not_found', 'data' => null]);
            }
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Unable to retrieve page content.']);
    }
    exit;
}

// Protected Write Access (POST) - Enforces Administrative Bearer Token Verification
if ($method === 'POST') {
    // 1. Mandatory Admin Authorization Check
    $admin_session = require_admin_auth($pdo);

    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    // Strict alphanumeric sanitization to prevent path traversal or parameter injection
    $page_key = preg_replace('/[^a-zA-Z0-9_-]/', '', $input['page_key'] ?? '');
    $content_data = $input['content_data'] ?? null;

    if (!$page_key || $content_data === null) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Valid page_key and content_data are required.']);
        exit;
    }

    try {
        $json_str = is_string($content_data) ? $content_data : json_encode($content_data, JSON_UNESCAPED_UNICODE);
        $stmt = $pdo->prepare("
            INSERT INTO `tbl_pages_content` (`page_key`, `content_json`)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE `content_json` = VALUES(`content_json`)
        ");
        $stmt->execute([$page_key, $json_str]);

        echo json_encode([
            'status' => 'success',
            'message' => "Successfully synchronized '{$page_key}' data to Hostinger MySQL database.",
            'updated_by' => $admin_session['username']
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to save content data.']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
