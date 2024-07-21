let minimoTotal = 0
let tempoMinimo = 1
let tempoMax    = 3

/***************/

// 0 = Desativado
// 1 = Ativado
let statusRobo = 0

// Contador de wins
let win  = 0

// Contador de loss
let loss = 0

// Limite de martingales do robô
let martinGale = 2

// Contador de rodadas do vermelho
let rodadaVermelho = 0

// Contador de rodadas do preto
let rodadaPreto = 0

// Contador de rodadas do branco
let rodadaBranco = 0

/***************/

// Configuração das ações do robô
function clicar(lugarClique){

    if (lugarClique.click) {
        
        lugarClique.click()
        
    } else if (document.createEvent) {
        
        var eventObj = document.createEvent('MouseEvents')
        eventObj.initEvent('click',true,true)
        lugarClique.dispatchEvent(eventObj)
        
    }// else if(document.createEvent){

}// function clicar(lugarClique){

/***************/

// Cria o botão de ligar o robô
let botao = '<div class="config-robo"><button id="header-deposit" class="red ligar"><i class="fas fa-play"></i> LIGAR</button></div>'

// Insere o botão dentro da página da blaze
document.querySelector('.account').innerHTML += botao

// Seleciona a div do botão
let boxBotao = document.querySelector('.config-robo')

/***************/

// Variáveis das posições dos elementos na tela

var comecarJogo    = document.querySelector('.place-bet .undefined')
var dobrarEntrada  = document.querySelector('.double')
var dividirEntrada = document.querySelector('.half')

/***************/

var vermelho    = document.querySelector('.input-wrapper .red')
var vermelhoWin = ''
var preto       = document.querySelector('.input-wrapper .black')
var pretoWin    = ''
var branco      = document.querySelector('.input-wrapper .white')
var brancoWin   = ''

/***************/

// Ao clicar no botão, executa a ação de ligar ou desligar o robô
boxBotao.addEventListener("click", function(){
    if (document.querySelector('.config-robo .red').classList.contains('ligar')) {
        statusRobo = 1
        boxBotao.innerHTML = '<div class="config-robo"><button id="header-deposit" class="red desligar"><i class="fas fa-times"></i> DESLIGAR</button></div>'
    } else {
        statusRobo = 0
        boxBotao.innerHTML = '<div class="config-robo"><button id="header-deposit" class="red ligar"><i class="fas fa-play"></i> LIGAR</button></div>'
    }
})

/***************/

// INICIO DOUBLE

$("#casino").prepend("<div class='boxContadorLinhas'><ul></ul><ul style='margin-top:-8px;'><li class='countAtual'></li></ul></div>");
$("#casino").prepend("<div class='boxCatalogadorDouble' style='width:530px!important;'></div>");
$("#casino").prepend("<div class='boxContadorDouble'><div class='btnIniciar'>Iniciar Catalogação</div><div class='btnResetar'>Reset Catalogação</div><div class='tituloContador'>Indicador de Tendência<span>% taxa de amostragem</span></div><div class='contadorBlack'></div><div class='contadorRed'></div><div class='contadorWhite'></div><div class='zoomMais'>&#10133;</div><div class='zoomMenos'>&#10134;</div></div>"); 

// ATIVA FUNÇÕES

iniciar();

// INICIA FUNCTION

function iniciar() {

    setTimeout(function() {
        
        var targetNodes      = $(".main");
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var myObserver       = new MutationObserver (mutationHandler);
        var obsConfig        = { childList: true, characterData: true, attributes: true, subtree: true };

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
                    }

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

}// iniciar

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
function jogadaAutomatizada(ultimaCor, time) {

	rodadaAut++

	/***************/

	// ANALISA SE GANHOU NO VERMELHO
	if (ultimaCor == "red" && (cAutVermelho == 1 || cAutVermelho == 2) && rodadaAut <= 4) {

		ganhouCorAut++

		rodadaAut    = 0
		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (ultimaCor == "red" && cAutVermelho > 1 && cAutVermelho <= 2 && rodadaAut <= 4)

	/***************/

	// ANALISA SE GANHOU NO PRETO
	if (ultimaCor == "black" && (cAutPreto == 1 || cAutPreto == 2) && rodadaAut <= 4) {

		ganhouCorAut++

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
	if (rodadaAut + 1 > 4) {

		perdeuAut++

		rodadaAut    = 0
		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (rodadaAut == 4)

	/***************/

	// Jogando...
    // Verifica se o robô está ligado
    if (statusRobo != 0) {

        if (jogandoAut) {

            // if (rodadaAut == 1) console.log("EST1: COMEÇANDO O JOGO...", time)

            /***************/

            cAutVermelho += 1

            for (i = 0; i < rodadaAut - 1; i++) {

                clicar(dobrarEntrada)

            }

            clicar(vermelho)
            clicar(comecarJogo)
                
        }// if (cAutVermelho <= 2)

        /***************/

        // ENTRADAS NO PRETO
        if (cAutVermelho > 2) {

            cAutPreto += 1

            clicar(preto)
            clicar(comecarJogo)

        }// if (cAutVermelho > 2)

    }// if (statusRobo != 0)

}// jogadaAutomatizada

function analisarJogos(ultimaCor, time) {

	try {

		/***************/

		// Analisar as cores sorteadas
		// if (ultimoSinal.firstChild.classList[1] == "red") {
		if (ultimaCor == "red") {

			// console.log("Saiu vermelho")

			// Continuar jogando
			if (jogandoAut) jogadaAutomatizada(ultimaCor, time)

		// } else if (ultimoSinal.firstChild.classList[1] == "black") {
	    } else if (ultimaCor == "black") {

			// console.log("Saiu preto")

			// Continuar jogando
			if (jogandoAut) jogadaAutomatizada(ultimaCor, time)

		// } else if (ultimoSinal.firstChild.classList[1] == "white") {
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

			jogadaAutomatizada(ultimaCor, time)

		}// else if (ultimaCor == "white")
		
	} catch {
		//
	}

}// analisarJogos