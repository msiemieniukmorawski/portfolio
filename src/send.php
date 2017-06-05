<?php
if (!empty($_GET['name'])) {
	$name = $_GET['name'];
}
if (!empty($_GET['subject'])) {
	$subject = $_GET['subject'];
}
if (!empty($_GET['email'])) {
	$email = $_GET['email'];
}
if (!empty($_GET['message'])) {
	$message = $_GET['message'];
}
$adres ="msiemieniukmorawski@gmail.com";
$wiadomosc="
wiadomość wysłana z strony MS-M.pl
od:". $name."

tytuł:". $subject ."

email:". $email ."

wiadomość:". $message .

" ";

mail($adres, $subject, $wiadomosc);

?>
