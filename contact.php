<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect data from form
    $name    = $_POST['name'];
    $number  = $_POST['number'];
    $email   = $_POST['email'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    // Recipient email
    $to = "naresh.narnapati@reymould.com";

    // Email subject and body
    $subject = "Email Enquiry from shekarandco.com website";
    $body = "Name: $name\n"
          . "Email: $email\n"
          . "Phone: $number\n"
          . "Service Interested: $service\n"
          . "Message:\n$message";

    // Send the email
    $emailSent = mail($to, $subject, $body);

    // Redirect based on result
    if ($emailSent) {
        header("Location: contact.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>
