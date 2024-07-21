<?php
    ob_start();
    session_start();
    include("config/conexao/conexao.php");
    function gerarSSID($size){
        $basic = 'abcdef0123456789';
        $return= "";
        for($count= 0; $size > $count; $count++){
            $return.= $basic[rand(0, strlen($basic) - 1)];
        }
        return $return;
    }
?>
<html lang="tr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>LOGIN - DOUBLE WIN</title>
    <link rel="stylesheet" href="css/estilo.css">
  </head>
  <body>
    <?php
        if(isset($_GET['acao'])){
            if(!isset($_POST['logar'])){
            
                $acao = $_GET['acao'];
                if($acao=='negado'){
                    echo '<div class="balao inatividade">
                    <strong>Sessão finalizada por inatividade.</strong>
                </div>';	
                }
                if($acao=='multipla'){
                    echo '<div class="balao inatividade">
                    <strong>Você foi deslogado por múltiplos logins detectados.</strong>
                </div>';	
                }
            }
        }
        if(isset($_POST['logar'])){
            // RECUPERAR DADOS FORM
            $email = trim(strip_tags($_POST['email']));
            $SSID = gerarSSID(32);
            // SELECIONAR BANCO DE DADOS
            $date = new DateTime();
            try{
                $result = $conexao->prepare("SELECT * from CLIENTES WHERE BINARY email=:email AND CLIENTE = 'god' AND STATUS_PAGAMENTO = 'Paga' OR CLIENTE = '1' AND BINARY email=:email AND STATUS_PAGAMENTO = 'Paga'");
                $result->bindParam(':email', $email, PDO::PARAM_STR);
                $result->execute();
                $resultado = $result->fetchAll();
                $contar = $result->rowCount();
                if($contar == 0){
                    echo '<div class="balao erro"><strong>Email não identificado, </strong> entre em contato com o suporte.</div>';
                }elseif($resultado !== []){
                    $result = $conexao->prepare("SELECT * from CLIENTES WHERE BINARY email=:email AND EXPIRACAO > ".$date->getTimestamp()." AND STATUS_PAGAMENTO = 'Paga' AND CLIENTE = 'god' OR CLIENTE = '1' AND BINARY email=:email AND EXPIRACAO > ".$date->getTimestamp()." AND STATUS_PAGAMENTO = 'Paga'");
                    $result->bindParam(':email', $email, PDO::PARAM_STR);
                    $result->execute();
                    $resultado = $result->fetchAll();
                    $contar = $result->rowCount();
                    if($contar == 0){
                        echo '<div class="balao erro"><strong>Seu indicador expirou, </strong> entre em contato com o suporte.</div>';
                    } else {
                        $result = $conexao->prepare("SELECT * from CLIENTES WHERE BINARY email=:email AND EXPIRACAO > ".$date->getTimestamp()." AND STATUS_PAGAMENTO = 'Paga' AND CLIENTE = 'god' OR CLIENTE = '1' AND BINARY email=:email AND EXPIRACAO > ".$date->getTimestamp()." AND STATUS_PAGAMENTO = 'Paga'; UPDATE CLIENTES SET SSID = '".$SSID."' WHERE email=:email");
                        $result->bindParam(':email', $email, PDO::PARAM_STR);
                        $result->execute();
                        $resultado = $result->fetchAll();
                        $contar = $result->rowCount();
                        if($contar == 0){
                            echo '<div class="balao erro"><strong>Pagamento não identificado, </strong> entre em contato com o suporte.</div>';
                        }
                    }
                }
                $contar = $result->rowCount();
                $email = $_POST['email'];
                if($contar>0){
                    $_SESSION['indicaWinUser'] = $email;
                    
                    echo '<div class="balao success">
                        <strong>Logado com Sucesso!</strong>
                    </div>';
                    $_SESSION['SSID'] = $SSID;
                    header("Refresh: 0, painel");
                }
            }catch(PDOException $e){
                echo $e;
            }
        }// se clicar no botão entrar no sistema
    ?>
    <form class="box" action="#" method="post" enctype="multipart/form-data">
      <div class="title">
        <img src="img/logo.png" style="width:330px;">
      </div>
      <input type="email" name="email" placeholder="Email" class="user-input">
      <input type="submit" name="logar" value="Acessar" class="submit-button">
    </form>
   </body>
</html>