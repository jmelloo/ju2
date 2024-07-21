<?php
    ob_start();
    session_start();
    include("conexao/conexao.php");
	if(!isset($_SESSION['indicaWinUser'])){
		header("Location: ../?acao=negado");exit;
	}
	if(is_dir("../libs/includes")){ //Validação para saber se a pasta existe
		include("../libs/includes/logout.php");
	} elseif(is_dir("../../libs/includes/")) {
		include("../../libs/includes/logout.php");
	} else {
		include("../../../../../libs/includes/logout.php");
	}
	$emailLogado = $_SESSION['indicaWinUser'];
	// seleciona a usuario logado
	try{
		$separaUsuario = $conexao->prepare("SELECT * from CLIENTES WHERE email=:emailLogado");
		$separaUsuario->bindParam('emailLogado',$emailLogado, PDO::PARAM_STR);		
		$separaUsuario->execute();
		$contar = $separaUsuario->rowCount();	
		if($contar =1){
			$loop = $separaUsuario->fetchAll();
			foreach ($loop as $show){
				$ID = $show['ID'];
				$NOME = $show['NOME'];
                $STATUS_PAGAMENTO = $show['STATUS_PAGAMENTO'];
                $METODO_PAGAMENTO = $show['METODO_PAGAMENTO'];
                $DATA_COMPRA = $show['DATA_COMPRA'];
                $EXPIRACAO = $show['EXPIRACAO'];
                $SSID = $show['SSID'];
			}
		}
	}catch (PDOWException $erro){ echo $erro;}
	$hoje = date('Y-m-d');
	$timestamp = strtotime($hoje);
	// $hoje = ("2022-03-29");
	// Contar sinais
	$contaSinais = $conexao->prepare("SELECT * FROM SINAIS WHERE DATA >= ".$timestamp." AND RESULTADO != 'NULL'");		
	$contaSinais->execute();
	$montaTabela = $contaSinais->fetchAll();

	$contaSinaisPro = $conexao->prepare("SELECT * FROM SINAIS_PROBA WHERE DATA >= ".$timestamp." AND RESULTADO != 'NULL'");		
	$contaSinaisPro->execute();
	$montaTabelaPro = $contaSinaisPro->fetchAll();


	$sinais = 0;
	$placarA = 0;
	$placarB = 0;
	foreach($montaTabela as $value){
		if($value['RESULTADO'] == 'WIN'){
			$placarA++;
		} elseif($value['RESULTADO'] == 'LOSS') {
			$placarB++;
		}
		$sinais++;
	}
	foreach($montaTabelaPro as $valueP){
		if($valueP['RESULTADO'] == 'WIN'){
			$placarA++;
		} elseif($valueP['RESULTADO'] == 'LOSS') {
			$placarB++;
		}
		$sinais++;
	}
?>