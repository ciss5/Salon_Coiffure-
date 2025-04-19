<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/config.php';
/** @var PDO $pdo */
// Récupération des données JSON envoyées par Angular
$donnees = json_decode(file_get_contents("php://input"), true);

if (!$donnees || !isset($donnees['consent'])) {
    http_response_code(400);
    echo json_encode(["message" => "Requête invalide"]);
    exit;
}

// Récupère les données
$consent = $donnees['consent'];
$ip = $_SERVER['REMOTE_ADDR']; // IP de l'utilisateur

try {
    $stmt = $pdo->prepare("INSERT INTO consentements (ip_utilisateur, statut) VALUES (:ip, :statut)");
    $stmt->execute([
        ':ip' => $ip,
        ':statut' => $consent
    ]);

    echo json_encode(["message" => "Consentement enregistré"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erreur serveur", "error" => $e->getMessage()]);
}
