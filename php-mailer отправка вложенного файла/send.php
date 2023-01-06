<?php

use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/mailer/Exception.php';
require __DIR__ . '/mailer/PHPMailer.php';
//require __DIR__ . '/mailer/SMTP.php';

$fromAdress = 'pvd@smart-conversion.ru';       //  от кого
$toAdress   = 'pvd@smart-conversion.ru';       //  кому

//pvd@smart-conversion.ru

$subject = 'Новая заявка - НСР Монтаж';

$attachments = array();

// message that will be displayed when everything is OK :)
$okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!';

// If something goes wrong, we will display this message.
$errorMessage = 'There was an error while submitting the form. Please try again later';

$fields  = array('name' => 'Name', 'surname' => 'Surname', 'phone' => 'Phone', 'email' => 'Email', 'message' => 'Message', 'type-connect' => 'Type Connect');

$types   = array('jpg', 'png', 'gif', 'bmp', 'jpeg');

if (!empty($_POST)) {

    if (!empty($_FILES)) {

        $uploaded_array = array();

        if ($_FILES["file"]["error"] == 0) {
            $tmp_name = $_FILES["file"]["tmp_name"];
            if (!$tmp_name) {
                echo 'Вы не выбрали файл.';
            } else {

                if ($_FILES["file"]["size"] == 0) {
                    echo 'Файл слишком большой.';
                } else {

                    $name = basename($_FILES["file"]["name"]);
                    $parts = explode('.', $name);
                    $ext = array_pop($parts);
                    if (!in_array($ext, $types)) {
                        echo 'Недопустимый тип файла.';
                    } else {
                        if (move_uploaded_file($tmp_name, __DIR__ . "/send_tmp/" . $name)) {
                            $uploaded_array[] .= "Uploaded file '" . $name . "'.<br/>\n";
                            $attachments[] = __DIR__ . "/send_tmp/" . $name;
                        }
                    }
                }
            }
        }

    }

    $emailText = "<p>You have a new message from your contact form</p>";

    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email
        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value<br>";
        }
    }

    $mail = new PHPMailer();
    $mail->CharSet = "utf-8";
    //$mail->isSMTP();
    //$mail->Host = 'smtp.yandex.ru';
    //$mail->Port = 587;
    //$mail->SMTPAuth = true;
    //$mail->Username = '';
    //$mail->Password = '';
    $mail->setFrom($fromAdress);
    $mail->addReplyTo($fromAdress);
    $mail->addAddress($toAdress);
    $mail->Subject = $subject;
    $mail->msgHTML($emailText);
    foreach ($attachments as $attachment) {
        $mail->addAttachment($attachment);
    }

    if (!$mail->send()) {
        $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    } else {
        $responseArray = array('type' => 'success', 'message' => $okMessage);
    }

    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

        $encoded = json_encode($responseArray);
        header('Content-Type: application/json');
        echo $encoded;
    } else {
        echo $responseArray['message'];
    }
}
?>

<!--Переадресация на главную страницу сайта, через 3 секунды-->
<script language="JavaScript" type="text/javascript">
    function changeurl(){eval(self.location="thanks.html");}
    window.setTimeout("changeurl();",0);
</script>