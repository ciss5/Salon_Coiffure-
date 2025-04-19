<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

// Autoriser les requêtes depuis Angular
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Lire le JSON envoyé par Angular
$data = json_decode(file_get_contents('php://input'), true);

// Vérification simple
if (!$data || empty($data['nom']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(['status' => 'error', 'message' => 'Veuillez remplir tous les champs.']);
    exit;
}

$nom = htmlspecialchars($data['nom']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$telephone = htmlspecialchars($data['telephone'] ?? '');
$sujet = htmlspecialchars($data['sujet'] ?? 'Message depuis le site');
$message = htmlspecialchars($data['message']);

$mail = new PHPMailer(true);

try {
    // Paramètres du serveur SMTP (Infomaniak ou autre)
   /* $mail->isSMTP();
    $mail->Host = 'mail.infomaniak.com';  // Serveur SMTP d'Infomaniak
    $mail->SMTPAuth = true;
    $mail->Username = 'ton_email@ton_domaine.com'; // Ton adresse e-mail Infomaniak
    $mail->Password = 'mot_de_passe_de_ton_email'; // Ton mot de passe e-mail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;*/
    // Configuration du serveur SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'mamegorciss5@gmail.com';
    $mail->Password = 'qegbdkzqdnlcfzzn'; // mot de passe SMTP
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Destinataire
    $mail->setFrom($email, $nom);
    $mail->addAddress('mamegorciss5@gmail.com'); // Où tu veux recevoir le message

    // Contenu
    $mail->isHTML(false);
    $mail->Subject = $sujet;
    $mail->Body    = "Nom : $nom\nEmail : $email\nTéléphone : $telephone\n\nMessage :\n$message";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Message envoyé avec succès.']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => "Erreur d'envoi : {$mail->ErrorInfo}"]);
}
?>
