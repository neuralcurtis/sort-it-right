<?php
header('Content-Type: application/json; charset=utf-8'); // Встановіть заголовок для JSON-відповіді

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Тільки POST-запити підтримуються.");
    }

    if (!isset($_FILES['image'])) {
        throw new Exception("Файл не надіслано.");
    }

    $targetDir = "uploads/";
    if (!is_dir($targetDir)) {
        if (!mkdir($targetDir, 0777, true)) {
            throw new Exception("Не вдалося створити папку для збереження.");
        }
    }

    $targetFile = $targetDir . basename($_FILES['image']['name']);
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
        throw new Exception("Не вдалося зберегти файл.");
    }

    echo json_encode([
        "status" => "success",
        "message" => "Файл збережено!",
        "path" => $targetFile
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
