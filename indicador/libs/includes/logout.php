<?php
if(isset($_REQUEST['sair'])){	
	session_destroy();
	session_unset($_SESSION['alfaUser']);
	session_unset($_SESSION['alfaPass']);	
	header("Location: ../");	
}
?>