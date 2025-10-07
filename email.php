<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['email'];


    $to = "contact@shekarandco.com, shekar.sanda@shekarandco.com";
    $subject = "Email enquiry from contact@shekarandco.com website";
    $body = "Email: $email";

    $emailSent = mail($to, $subject, $body);

    if ($emailSent) {
        header("Location: index.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>