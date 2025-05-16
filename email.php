<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $to = "naresh.narnapati@reymould.com";
    $subject = "Email enquiry from Hygenixseeds.com website";
    $body = "Name: $firstName $lastName\nEmail: $email\nPhone: $phone\nMessage:\n$message";

    $emailSent = mail($to, $subject, $body);

    if ($emailSent) {
        header("Location: index.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>