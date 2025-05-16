<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  
    $email = $_POST['email'];


    $to = "naresh.narnapati@reymould.com";
    $subject = "Email enquiry from Hygenixseeds.com website";
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