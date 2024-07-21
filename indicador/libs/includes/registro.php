<?php
include("../../config/conexao/conexao.php");
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$usuario = $_POST['usuario'];
$senha = md5($_POST['senha']);
$patrocinador = $_SERVER['QUERY_STRING'];
echo $patrocinador;
if($patrocinador >= 0 || $patrocinador == "id="){
    $patrocinador = NULL;
}
echo $patrocinador;
$data = date('Y-m-d H:i');

// Conexão com banco de dados para verificação de usuário existente
$verificaUsuario = $conexao->prepare("SELECT * from usuarios WHERE usuario='".$usuario."'");
$verificaUsuario->execute();
$contarUsuario = $verificaUsuario->rowCount();

// Conexão com banco de dados para verificação de email existente
$verificaEmail = $conexao->prepare("SELECT * from usuarios WHERE email='".$email."'");
$verificaEmail->execute();
$contarEmail = $verificaEmail->rowCount();

// Validação de dados
if($usuario == "" || $usuario == null || $usuario == " "){
    echo '<script language="javascript" type="text/javascript">window.location.href="../../?usuario_vazio";</script>';
} elseif($contarUsuario == 1){
    echo '<script language="javascript" type="text/javascript">window.location.href="../../?usuario_existe";</script>';
} elseif($contarEmail == 1){
    echo '<script language="javascript" type="text/javascript">window.location.href="../../?email_existe";</script>';
} else {
    if($patrocinador != NULL){
        $sql = "INSERT INTO usuarios (nome, email, telefone, usuario, senha, patrocinador, cambista, indicados, apostas, cotas, nivel, data) VALUES ('".$nome."', '".$email."', '".$telefone."', '".$usuario."', '".$senha."', '".$patrocinador."', '0', '0', '0', '0', '0', '".$data."'); UPDATE usuarios SET indicados = (indicados + 1) WHERE id='".$patrocinador."';";
    } else {
        $patrocinador = "N";
        $sql = "INSERT INTO usuarios (nome, email, telefone, usuario, senha, patrocinador, cambista, indicados, apostas, cotas, nivel, data) VALUES ('".$nome."', '".$email."', '".$telefone."', '".$usuario."', '".$senha."', '".$patrocinador."', '0', '0', '0', '0', '0', '".$data."');";
    }
}
    $q = $conexao->prepare($sql);		
    $q->execute();

    if($q) {
        header("Location: ../../?cadastrado");
    } else {
        header("Location: ../erro404");
    }
?>