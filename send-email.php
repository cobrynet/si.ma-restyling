<?php
// Abilita CORS se necessario
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Verifica che sia una richiesta POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
    exit;
}

// Recupera i dati dal POST
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$organization = isset($_POST['organization']) ? trim($_POST['organization']) : 'Non specificata';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$department = isset($_POST['department']) ? trim($_POST['department']) : '';
$departmentEmail = isset($_POST['departmentEmail']) ? trim($_POST['departmentEmail']) : '';

// Validazione base
if (empty($name) || empty($email) || empty($phone) || empty($message) || empty($departmentEmail)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Tutti i campi obbligatori devono essere compilati']);
    exit;
}

// Validazione email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email non valida']);
    exit;
}

// Costruisci il messaggio email
$subject = "Richiesta da $name per $department";
$emailBody = "Nuova richiesta dal form contatti SI.MA\n\n";
$emailBody .= "Dipartimento: $department\n";
$emailBody .= "Nome: $name\n";
$emailBody .= "Email: $email\n";
$emailBody .= "Telefono: $phone\n";
$emailBody .= "Organizzazione: $organization\n\n";
$emailBody .= "Messaggio:\n$message\n\n";
$emailBody .= "---\n";
$emailBody .= "Questo messaggio è stato inviato dal form contatti del sito SI.MA";

// Headers per l'email
$headers = "From: noreply@assistenzalavanderie.it\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Invia l'email
if (mail($departmentEmail, $subject, $emailBody, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Email inviata con successo']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore nell\'invio dell\'email']);
}
?>
