<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';  // Asegúrate de que la ruta al autoload.php es correcta

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $dni = $_POST["dni"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $comment = $_POST["comment"];

    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your_email@gmail.com';  // Tu dirección de correo de Gmail
        $mail->Password   = 'your_password';  // Tu contraseña de Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipientes
        $mail->setFrom('your_email@gmail.com', 'Mailer');
        $mail->addAddress('yalinita1985@gmail.com');  // Añadir un destinatario

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = 'Formulario de contacto';
        $mail->Body    = 'Nombre: ' . $name . '<br>DNI: ' . $dni . '<br>Teléfono: ' . $phone . '<br>Email: ' . $email . '<br>Comentario: ' . $comment;
        $mail->AltBody = 'Nombre: ' . $name . '\nDNI: ' . $dni . '\nTeléfono: ' . $phone . '\nEmail: ' . $email . '\nComentario: ' . $comment;

        $mail->send();
        echo 'El mensaje ha sido enviado';
    } catch (Exception $e) {
        echo "El mensaje no pudo ser enviado. Error de Mailer: {$mail->ErrorInfo}";
    }
}
?>
