// INICIO DOUBLE

$("#casino").prepend("<div class='boxContadorLinhas'><ul></ul><ul style='margin-top:-8px;'><li class='countAtual'></li></ul></div>");
$("#casino").prepend("<div class='boxCatalogadorDouble' style='width:530px!important;'></div>");
$("#casino").prepend("<div class='boxContadorDouble'><div class='btnIniciar'>Iniciar Catalogação</div><div class='btnResetar'>Reset Catalogação</div><div class='tituloContador'>Indicador de Tendência<span>% taxa de amostragem</span></div><div class='contadorBlack'></div><div class='contadorRed'></div><div class='contadorWhite'></div><div class='zoomMais'>&#10133;</div><div class='zoomMenos'>&#10134;</div></div>"); 

// ATIVA FUNÇÕES

$( ".btnIniciar" ).click(function() {
    iniciar();
});

$( ".btnResetar" ).click(function() {
    window.location.reload(true);
});

let minimoTotal = 0
let tempoMinimo = 1
let tempoMax    = 3

/***************/

// Variáveis das posições dos elementos na tela

var comecarJogo     = ''
var dobrarEntrada   = ''
var dividirEntrada  = ''

/***************/

var vermelho    = ''
var vermelhoWin = ''
var preto       = ''
var pretoWin    = ''
var branco      = ''
var brancoWin   = ''

/***************/

// Importa o saldo da blaze
let bancaInicial = ''

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

        comecarJogo     = document.querySelector('.place-bet .undefined')
        dobrarEntrada   = document.querySelector('.double')
        dividirEntrada  = document.querySelector('.half')

        /***************/

        vermelho = document.querySelector('.input-wrapper .red')
        vermelhoWin = ''
        preto    = document.querySelector('.input-wrapper .black')
        pretoWin = ''
        branco   = document.querySelector('.input-wrapper .white')
        brancoWin = ''

        /***************/
        
        // Importa o saldo da blaze

        bancaInicial = document.querySelector('.currency').innerHTML.split('</span>')[1]

        /***************/

        // Ao clicar no botão, executa a ação de ligar ou desligar o robô
        boxBotao.addEventListener("click", function() {

            if (document.querySelector('.config-robo .red').classList.contains('ligar')) {
                statusRobo = 1
                boxBotao.innerHTML = '<div class="config-robo"><button id="header-deposit" class="red desligar"><i class="fas fa-times"></i> DESLIGAR</button></div>'
                
            } else {
                statusRobo = 0
                boxBotao.innerHTML = '<div class="config-robo"><button id="header-deposit" class="red ligar"><i class="fas fa-play"></i> LIGAR</button></div>'
            }

        })

        /***************/

        // Estratégia de entrar na tendência do mercado

        setInterval(function () {

            // Separa os valores das entradas no vermelho
            valorVermelho = document.querySelectorAll('.counter')[1].innerHTML.split('</span>')[0].split('R$ ')[1]

            // Validação se o vermelho ganhou a rodada = true
            vermelhoWin = document.querySelectorAll('.counter')[1].childNodes[0].classList.contains("good")

            /***************/

            // Separa os valores das entradas no branco
            valorBranco = document.querySelectorAll('.counter')[3].innerHTML.split('</span>')[0].split('R$ ')[1]

            // Validação se o branco ganhou a rodada = true
            brancoWin = document.querySelectorAll('.counter')[3].childNodes[0].classList.contains("good")

            /***************/

            // Separa os valores das entradas no preto
            valorPreto = document.querySelectorAll('.counter')[5].innerHTML.split('</span>')[0].split('R$ ')[1]

            // Validação se o preto ganhou a rodada = true
            pretoWin = document.querySelectorAll('.counter')[5].childNodes[0].classList.contains("good")

            /***************/

            // Separa o contador para poder efetuar a entrada
            timeLeft = document.querySelector('.time-left span').innerHTML.split(':')[0]

        }, 1000)

        /***************/

        setInterval(function () {
            
            // Verifica se o robô está ligado, e se o saldo atual da banca está entre o stopwin e o stoploss
            if(statusRobo != 0 && (document.querySelector('.currency').innerHTML.split('</span>')[1] < stopWin || document.querySelector('.currency').innerHTML.split('</span>')[1] > stopLoss)){
                // Se o valor de apostas do vermelho for maior que o valor do preto vezes 3, ele valida a entrada
                if(valorVermelho > (valorPreto * 3) && document.querySelectorAll('.counter')[1].childNodes[0].classList.contains("good") == false && valorVermelho >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax){

                    validaEntrada = 1
                    if(validaEntrada == 1){

                        rodadaVermelho = 1
                        clicar(vermelho)
                        // clicar(dobrarEntrada)
                        clicar(comecarJogo)
            
                    }

                    validaEntrada = 0

                } 

                else if (document.querySelector('.currency').innerHTML.split('</span>')[1] > stopWin) {

                    statusRobo = 0
                    alert('STOPWIN BATIDO COM SUCESSO!')

                } 

                else if (document.querySelector('.currency').innerHTML.split('</span>')[1] < stopLoss) {

                    statusRobo = 0
                    alert('STOPLOSS ATINGIDO')

                }

            }

        }, 3000)
    
    }, 500);

    $(".btnIniciar").fadeOut(0);
    $(".btnResetar").fadeIn(0);
    // console.log("Iniciou");

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

	// ANALISA SE O BRANCO FOI SORTEADO EM SEGUIDA
	if (ultimaCor == "white" && boxCatalogador.lastChild.previousElementSibling.firstChild.classList[1] == "white") {

		ganhouBcoAut++

		rodadaAut    = 0
		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (ultimaCor == "white")

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
	if (rodadaAut > 4) {

		perdeuAut++

		rodadaAut    = 0
		cAutVermelho = 0
		cAutPreto    = 0
		jogandoAut   = false

	}// if (rodadaAut == 4)

	/***************/

	// Jogando...
	if (jogandoAut) {

		/***************/

		cAutVermelho += 1

        validaEntrada = 1
        if (validaEntrada == 1) {

            console.log("cAutVermelho", cAutVermelho, "preto", preto, "cAutvermelho", cAutVermelho, "vermelho", vermelho)

            if (cAutVermelho <= 2) {

                clique = clicar(preto)

            } else if (cAutVermelho > 2) {

                clique = clicar(vermelho)

            }

            for (i = 0; i <= rodadaWin-1; i++) {

                if (rodadaWin-1 == -1) {

                    if(ultimoGale >= 0) {

                        for (e = 0; e <= ultimoGale; e++) {

                            clicar(dividirEntrada)

                        }
                    }

                    escolheCor()
                    clicar(comecarJogo)

                } else {

                    escolheCor()
                    clicar(dobrarEntrada)
                    clicar(comecarJogo)
                    ultimoGale = rodadaWin
                }

            }

        }

        validaEntrada = 0

		/***************/

	}// if (jogandoAut)

}// jogadaAutomatizada

function analisarJogos(ultimaCor, time) {

	try {

		/***************/

		// Analisar as cores sorteadas
		// if (ultimoSinal.firstChild.classList[1] == "red") {
		if (ultimaCor == "red") {

			if (jogando) jogar(ultimaCor, time)
			if (jogandoAut) jogadaAutomatizada(ultimaCor, time)

		// } else if (ultimoSinal.firstChild.classList[1] == "black") {
	    } else if (ultimaCor == "black") {

			if (jogando) jogar(ultimaCor, time)
			if (jogandoAut) jogadaAutomatizada(ultimaCor, time)

		// } else if (ultimoSinal.firstChild.classList[1] == "white") {
		} else if (ultimaCor == "white") {

			jogando   = true
			cVermelho = 0
			cPreto    = 0
			rodada    = 0
			
			jogandoAut   = true
			cAutVermelho = 0
			cAutPreto    = 0
			rodadaAut    = 0

			jogar(ultimaCor, time)
			jogadaAutomatizada(ultimaCor, time)

		}// else if (ultimaCor == "white")
		
	} catch {}

}// analisarJogos