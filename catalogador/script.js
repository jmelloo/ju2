var idbot 		   = '5478878277:AAH_FjRfcOc8x1e4uwRoivWG1qDzSAGD-X4'
var idSalaInfinita = '-1001507376152'
var idSalaOfc 	   = '-1001643479428'
var pathname  	   = $(location).attr('pathname')

/***************/

// AUMENTA E DIMINUI BOX VELAS

$(document).ready(function() {
	
	// var script = document.createElement('script')
	// 	script.src  = 'https://testes.iphonelab.net/script-aut.js'
	// 	script.type = 'text/javascript'
	// document.getElementsByTagName('body')[0].appendChild(script)

	/***************/

	$('.zoomMenos').on('click', function(){ 

		var largura = $(".boxCatalogadorDouble").width()
		var diminuir = largura - 1
	    $('.boxCatalogadorDouble').animate({"width" : ""+diminuir+""}, 0)

	})

	$('.zoomMais').on('click', function(){ 

		var largura = $(".boxCatalogadorDouble").width()
		var aumentar = largura + 40
	    $('.boxCatalogadorDouble').animate({"width" : ""+aumentar+""}, 0)

	})

})

// INICIO DOUBLE

if (pathname == "/pt/games/double") {

	$("#casino").prepend("<div class='boxContadorLinhas'><ul></ul><ul style='margin-top:-8px;'><li class='countAtual'></li></ul></div>")
	$("#casino").prepend("<div class='boxCatalogadorDouble' style='width:530px!important;'></div>")
	$("#casino").prepend("<div class='boxContadorDouble'><div class='btnIniciar'>Iniciar Catalogação</div><div class='btnResetar'>Reset Catalogação</div><div class='tituloContador'>Indicador de Tendência<span>% taxa de amostragem</span></div><div class='contadorBlack'></div><div class='contadorRed'></div><div class='contadorWhite'></div><div class='zoomMais'>&#10133;</div><div class='zoomMenos'>&#10134;</div></div>")

	/***************/
	
	// Cria o botão de ligar o robô
	// $("#casino").prepend('<div id="btnChamarRobo"><button id="header-deposit" class="red"><i class="fas fa-play"></i> CHAMAR</button></div>')
	
	// let boxBtnChamar  = document.getElementById('btnChamarRobo')
	
	// boxBtnChamar.addEventListener("click", () => {
	// 	var script = document.createElement('script')
	// 		script.src = 'https://testes.iphonelab.net/script-aut.js'
	// 		script.type = 'text/javascript'
	// 	document.getElementsByTagName('body')[0].appendChild(script)
	// })
	
	/***************/

	// ATIVA FUNÇÕES

	$(".btnIniciar").click(function() {
		iniciar()
	});

	$(".btnResetar").click(function() {
		window.location.reload(true)
	});

	// INICIA FUNCTION

	function iniciar() {

		setTimeout(function() {
			
			var targetNodes      = $(".main")
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver
			var myObserver       = new MutationObserver (mutationHandler)
			var obsConfig        = { childList: true, characterData: true, attributes: true, subtree: true }

			//--- Add a target node to the observer. Can only add one node at a time.
			targetNodes.each ( function () {
				myObserver.observe (this, obsConfig);
			});

			function mutationHandler (mutationRecords) {

				var verificaMudanca = $("#roulette-slider").attr("class"); 

				if (verificaMudanca == "start") {
					
					var ultimoNumero = $(".casino-recent .entry:first").html()
					var ultimaClass  = $(".casino-recent .sm-box:first").attr("class")

					let date = new Date()
					let time = date.toLocaleTimeString("pt-BR", {
						timeStyle: "short",       //Serão retornado apenas horas e minutos.  
						hour12: false,            //Formato de 24h, suprimindo sufixos AM e PM.
						numberingSystem: "latn"   //Resulado em algarismos indo-arábicos.
					})

					$(".boxCatalogadorDouble").append(ultimoNumero)
					$(".boxCatalogadorDouble .sm-box:last").append("<span>"+time+"</span><b>"+ultimaClass+"</b>")

					// CAPTURA QUANTIDADE
					var countBlack = $('.boxCatalogadorDouble .black').length
					var countRed   = $('.boxCatalogadorDouble .red').length
					var countWhite = $('.boxCatalogadorDouble .white').length
					var numBlack   = countBlack
					var numRed     = countRed
					var numWhite   = countWhite
					var numTotal   = countBlack + countRed + countWhite
					var option = {
						style: 'percent'
					};
					var formatter = new Intl.NumberFormat("en-US", option)
					var percentFormatBlack = formatter.format(numBlack / numTotal)
					var percentFormatRed   = formatter.format(numRed / numTotal)
					var percentFormatWhite = formatter.format(numWhite / numTotal)
					
					$(".contadorBlack").html(percentFormatBlack)
					$(".contadorRed").html(percentFormatRed)
					$(".contadorWhite").html(percentFormatWhite)

					// CONTA ITENS POR LINHA
					var linhas = $(".boxCatalogadorDouble .sm-box:nth-child(-n+15)").text()	

					const linha_qtd_black = (linhas.match(/black/g) || []).length
					const linha_qtd_red   = (linhas.match(/red/g) || []).length
					const linha_qtd_white = (linhas.match(/white/g) || []).length

					var qtd_linhas = linha_qtd_black + linha_qtd_red + linha_qtd_white

					$(".boxContadorLinhas .countAtual").html("<div class='qtdblack'>"+linha_qtd_black+"</div><div class='qtdred'>"+linha_qtd_red+"</div><div class='qtdwhite'>"+linha_qtd_white+"</div>")
					
					if (qtd_linhas == "15") {
						$(".boxContadorLinhas ul:first").append("<li><div class='qtdblack'>"+linha_qtd_black+"</div><div class='qtdred'>"+linha_qtd_red+"</div><div class='qtdwhite'>"+linha_qtd_white+"</div></li>")
						$(".boxCatalogadorDouble b").remove()
						$(".countAtual").html("")
					}// if (qtd_linhas == "15")

					// ALERTA
					if (qtd_linhas == "11") {

						const alert_qtd_black = (linhas.match(/black/g) || []).length
						const alert_qtd_red = (linhas.match(/red/g) || []).length

						if ((alert_qtd_black == "1") || (alert_qtd_red == "1")) {
							$(".alertar").fadeIn();
						}// if ((alert_qtd_black == "1") || (alert_qtd_red == "1"))

					}// if (qtd_linhas == "11")

					// Okado
					let ultCor = null
					if (ultimoNumero.match(/black/g)) ultCor = "black"
					if (ultimoNumero.match(/red/g))   ultCor = "red"
					if (ultimoNumero.match(/white/g)) ultCor = "white"

					analisarJogos(ultCor, time)

				}// if (verificaMudanca == "start")
				
			}// mutationHandler
		
		}, 500);

		$(".btnIniciar").fadeOut(0);
		$(".btnResetar").fadeIn(0);
		// console.log("Iniciou");

	}// iniciar

}// if (pathname == "/pt/games/double")

/***************/

boxCatalogador = document.querySelector('.boxCatalogadorDouble')

let cAutVermelho = 0
let cAutPreto    = 0
let rodadaAut    = 0
let jogandoAut   = false
let ganhouCorAut = 0
let ganhouBcoAut = 0
let perdeuAut    = 0

let cVermelho    = 0
let cPreto       = 0
let rodada       = 0
let rodadaWin    = 0
let jogando      = false
let ganhouCor    = 0
let ganhouBco    = 0
let perdeu       = 0

// EST1: ACERTIVO
function jogoAcertivo(ultimaCor, time) {

	rodadaAut++

	/***************/

	// ANALISA SE O BRANCO FOI SORTEADO EM SEGUIDA
	if (ultimaCor == "white" && boxCatalogador.lastChild.previousElementSibling.firstChild.classList[1] == "white") {

		ganhouBcoAut++
			
		// console.log("EST1: MISERAVI ACERTÔ NO BRANCO! " + ganhouCorAut + ", Rodada " + rodadaAut, time)

		$.ajax({
			url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaOfc + "&text=⚪️⚪️⚪️ WINZADA DE CARA NO BRANCO 🤑🤑 ⚪️⚪️⚪️+%0A+PLACAR ATUAL " + ganhouCor + " X " + perdeu + " 🚀🚀",
		});

		// console.log("EST1: AGUARDANDO NOVO BRANCO PARA RECOMEÇAR!")

		rodadaAut    = 0
		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (ultimaCor == "white")

	/***************/

	// ANALISA SE GANHOU NO VERMELHO
	if (ultimaCor == "red" && (cAutVermelho == 1 || cAutVermelho == 2) && rodadaAut <= 4) {

		ganhouCorAut++

		// console.log("EST1: GANHOU NO VERMELHO! " + ganhouCorAut + ", Rodada " + rodadaAut, time)

		let msg = (rodadaAut < 2) ? "✅✅ WINNNN ✅✅+%0A+🔴 PAGOU DE PRIMEIRA 🔴+%0A+PLACAR ATUAL " + ganhouCorAut + " X " + perdeuAut + " 🚀🚀" : "✅✅ WINNNN ✅✅+%0A+🔴 PAGOU NO GALE " + (rodadaAut-1) + " 🔴+%0A+PLACAR ATUAL " + ganhouCorAut + " X " + perdeuAut + " 🚀🚀"

		$.ajax({
			url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaOfc + "&text=" + msg
		})
		
		// console.log("EST1: AGUARDANDO NOVO BRANCO PARA RECOMEÇAR!")

		rodadaAut    = 0
		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (ultimaCor == "red" && cAutVermelho > 1 && cAutVermelho <= 2 && rodadaAut <= 4)

	/***************/

	// ANALISA SE GANHOU NO PRETO
	if (ultimaCor == "black" && (cAutPreto == 1 || cAutPreto == 2) && rodadaAut <= 4) {

		ganhouCorAut++

		// console.log("EST1: GANHOU NO PRETO! " + ganhouCorAut + ", Rodada " + rodadaAut, time)

		let msg = (rodadaAut < 2) ? "✅✅ WINNNN ✅✅+%0A+⚫️ PAGOU DE PRIMEIRA ⚫️+%0A+PLACAR ATUAL " + ganhouCorAut + " X " + perdeuAut + " 🚀🚀" : "✅✅ WINNNN ✅✅+%0A+ ⚫️ PAGOU NO GALE " + (rodadaAut-1) + " ⚫️+%0A+PLACAR ATUAL " + ganhouCorAut + " X " + perdeuAut + " 🚀🚀"

		$.ajax({
			url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaOfc + "&text=" + msg
		})

		// console.log("EST1: AGUARDANDO NOVO BRANCO PARA RECOMEÇAR!")

		rodadaAut    = 0
		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (ultimaCor == "black" && cAutPreto > 1 && cAutPreto <= 2 && rodadaAut <= 4)

	/***************/

	// FINALIZA JOGADAS
	if (cAutPreto == 2) {

		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (cAutPreto == 2)

	/***************/

	// SE ESTIVER NA QUINTA RODADA, PERDEU E PARA O ROBÔ
	if (rodadaAut > 4) {

		perdeuAut++

		// console.log("EST1: PERDEU!", time)
		$.ajax({
			url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaOfc + "&text=❌❌❌ LOSS ❌❌❌"
		})
		// console.log("EST1: FIM DO JOGO! " + perdeuAut + ", Rodada " + rodadaAut)
		// console.log("EST1: AGUARDANDO NOVO BRANCO PARA RECOMEÇAR!")

		rodadaAut    = 0
		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (rodadaAut == 4)

	/***************/

	// Jogando...
	if (jogandoAut) {

		// if (rodadaAut == 1) console.log("EST1: COMEÇANDO O JOGO...", time)

		/***************/

		cAutVermelho += 1

		// ENTRADAS NO VERMELHO
		if (cAutVermelho <= 2) {

			// console.log("EST1: ENTRA NO VERMELHO " + cAutVermelho + ", Rodada " + rodadaAut)

			let msg = rodadaAut > 1 ? "ENTRA NO GALE " + (rodadaAut-1) : "OBEDEÇA O GERENCIAMENTO"

			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaOfc + "&text=✅ SINAL CONFIRMADO ✅+%0A+🔴 ENTRAR NO VERMELHO 🔴+%0A+" + msg
			})
			
		}// if (cAutVermelho <= 2)

		/***************/

		// ENTRADAS NO PRETO
		if (cAutVermelho > 2) {

			cAutPreto += 1

			// console.log("EST1: ENTRA NO PRETO " + cAutPreto + ", Rodada " + rodadaAut)

			let msg = rodadaAut > 1 ? "ENTRA NO GALE " + (rodadaAut-1) : "OBEDEÇA O GERENCIAMENTO"

			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaOfc + "&text=✅ SINAL CONFIRMADO ✅+%0A+⚫️ ENTRAR NO PRETO ⚫️+%0A+" + msg
			})

		}// if (cAutVermelho > 2)

	}// if (jogandoAut)

}// jogadaAutomatizada

// EST2: INFINITO
function jogoInfinito(ultimaCor, time) {

	rodada++
	rodadaWin++

	/***************/

	// Analisa se ganhou na última jogada
	if (ultimaCor == "red" && (cVermelho == 1 || cVermelho == 2)) {

		ganhouCor++
		// console.log("EST2: GANHOU NO VERMELHO " + ganhouCor + " vezes, Rodada " + rodada, time)

		let msg = (rodadaWin < 2) ? "✅✅ WINNNN ✅✅+%0A+🔴 PAGOU DE PRIMEIRA 🔴+%0A+PLACAR ATUAL " + ganhouCor + " X " + perdeu + " 🚀🚀" : "✅✅ WINNNN ✅✅+%0A+🔴 PAGOU NO GALE " + (rodadaWin-1) + " 🔴+%0A+PLACAR ATUAL " + ganhouCor + " X " + perdeu + " 🚀🚀"

		$.ajax({
			url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
		})

		// console.log("EST2: VITÓRIA NA RODADA " + rodadaWin)

		rodadaWin = 0
		// rodada    = 0
		// cVermelho = 0
		// cPreto    = 0

	}// if (ultimaCor == "red" && (cVermelho == 1 || cVermelho == 2))

	/***************/

	if (ultimaCor == "white" && rodadaWin > 1) {
		
		ganhouCor++
		ganhouBco++

		let msg = (rodadaWin == 2) ? "✅✅ WINNNN ✅✅+%0A+⚪️ O BRANCO PAGOU ⚪️+%0A+PLACAR ATUAL " + ganhouCor + " X " + perdeu + " 🚀🚀" : "✅✅ WINNNN ✅✅+%0A+⚪️ PAGOU NO GALE " + (rodadaWin-1) + " ⚪️+%0A+PLACAR ATUAL " + ganhouCor + " X " + perdeu + " 🚀🚀"

		$.ajax({
			url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
		})

		rodadaWin = 0
		rodada    = 0

	}

	if (ultimaCor == "black" && (cPreto == 1 || cPreto == 2)) {

		ganhouCor++
		// console.log("EST2: GANHOU NO PRETO " + ganhouCor + " vezes, Rodada " + rodada, time)

		let msg = (rodadaWin < 2) ? "✅✅ WINNNN ✅✅+%0A+⚫️ PAGOU DE PRIMEIRA ⚫️+%0A+PLACAR ATUAL " + ganhouCor + " X " + perdeu + " 🚀🚀" : "✅✅ WINNNN ✅✅+%0A+⚫️ PAGOU NO GALE " + (rodadaWin-1) + " ⚫️+%0A+PLACAR ATUAL " + ganhouCor + " X " + perdeu + " 🚀🚀"

		$.ajax({
			url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
		})

		// console.log("EST2: VITÓRIA NA RODADA " + rodadaWin)

		rodadaWin = 0
		// rodada    = 0
		// cVermelho = 0
		// cPreto    = 0

	}// if (ultimaCor == "black" && cPreto > 1 && cPreto <= 2)

	/***************/

	// RECOMEÇA ANÁLISE
	if (cPreto == 2) {

		rodada    = 0
		cVermelho = 0
		cPreto    = 0

	}// if (cPreto == 2)

	/***************/

	// IDENTIFICA SE O BRANCO FOI SORTEADO EM SEGUIDA
	if (ultimaCor == "white" && boxCatalogador.lastChild.previousElementSibling.firstChild.classList[1] == "white") {

		ganhouBco++

		// console.log("EST2: MISERAVI ACERTÔ NO BRANCO! " + ganhouBco + " vezes, Rodada " + rodada, time)

		$.ajax({
			url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=⚪️⚪️⚪️ WINZADA DE CARA NO BRANCO 🤑🤑 ⚪️⚪️⚪️+%0A+PLACAR ATUAL " + ganhouCor + " X " + perdeu + " 🚀🚀",
		});

		// console.log("EST2: VITÓRIA NA RODADA " + rodadaWin)

		rodadaWin = 0
		rodada    = 0
		// cVermelho = 0
		// cPreto    = 0	

	} else {

		cVermelho += 1

		// ENTRADAS NO VERMELHO
		if (cVermelho <= 2) {
	
			// console.log("EST2: ENTRA NO VERMELHO " + cVermelho + ", Rodada " + rodada)

			let msg = rodadaWin > 1 ? "ENTRA NO GALE " + (rodadaWin-1) : "OBEDEÇA O GERENCIAMENTO"

			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=🔴 ENTRAR NO VERMELHO 🔴+%0A+" + msg
			});
		
		}// if (cVermelho <= 2)
	
		/***************/
	
		// ENTRADAS NO PRETO
		if (cVermelho > 2) {
	
			cPreto += 1
	
			// console.log("EST2: ENTRA NO PRETO " + cPreto + ", Rodada " + rodada)

			let msg = rodadaWin > 1 ? "ENTRA NO GALE " + (rodadaWin-1) : "OBEDEÇA O GERENCIAMENTO"

			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=⚫️ ENTRAR NO PRETO ⚫️+%0A+" + msg
			});
	
		}// if (cVermelho > 2)

	}// else if (rodada > 1 && ultimaCor == "white")

}// jogar

function analisarJogos(ultimaCor, time) {

	try {

		// boxCatalogador = document.querySelector('.boxCatalogadorDouble')
		// ultimoSinal    = boxCatalogador.lastChild
		// penultimoSinal = boxCatalogador.lastChild.previousElementSibling

		/***************/

		// Analisar as cores sorteadas
		if (ultimaCor == "red") {

			// console.log("Saiu vermelho")

			// Continuar jogando
			if (jogando) jogoInfinito(ultimaCor, time)
			if (jogandoAut) jogoAcertivo(ultimaCor, time)

	    } else if (ultimaCor == "black") {

			// console.log("Saiu preto")

			// Continuar jogando
			if (jogando) jogoInfinito(ultimaCor, time)
			if (jogandoAut) jogoAcertivo(ultimaCor, time)

		} else if (ultimaCor == "white") {

			// Começar a jogar
			// console.log("Saiu branco")

			jogando   = true
			cVermelho = 0
			cPreto    = 0
			rodada    = 0
			
			jogandoAut   = true
			cAutVermelho = 0
			cAutPreto    = 0
			rodadaAut    = 0

			jogoInfinito(ultimaCor, time)
			jogoAcertivo(ultimaCor, time)

		}// else if (ultimaCor == "white")
		
	} catch {
		//
	}

}// analisarJogos