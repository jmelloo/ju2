$(document).ready(function() {

    // var script = document.createElement('script')
    // script.src = 'https://code.jquery.com/jquery-3.4.1.min.js'
    // script.type = 'text/javascript'
    // document.getElementsByTagName('head')[0].appendChild(script)

    // $("head").prepend("<script src='https://code.jquery.com/jquery-3.4.1.min.js' type='text/javascript'></script>")

    /***************/

    let minimoTotal = 0
    let tempoMinimo = 1
    let tempoMax    = 3

    /***************/

    let usuarioTelegram   = '1365614344'
    let botTelegram       = '5478878277:AAH_FjRfcOc8x1e4uwRoivWG1qDzSAGD-X4'
    let enviarNotificacao = '$.ajax({url: "https://api.telegram.org/bot' + botTelegram + '/sendMessage?chat_id=' + usuarioTelegram + '&text='
    let pulaLinha         = '+%0A+'

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

    // Importa o saldo da blaze
    let bancaInicial = document.querySelector('.currency').innerHTML.split('</span>')[1]

    // Calcula o stopWin em 20%
    let stopWin  = (bancaInicial / 1) + (bancaInicial * 0.20)

    // Calcula o stoploss em 25%
    let stopLoss = bancaInicial - (bancaInicial * 0.25)

    /***************/

    // Configuração das ações do robô
    function clicar(lugarClique) {

        if (lugarClique.click) {
            
            lugarClique.click()
            
        } else if (document.createEvent) {
            
            var eventObj = document.createEvent('MouseEvents')
            eventObj.initEvent('click',true,true)
            lugarClique.dispatchEvent(eventObj)
            
        }// else if (document.createEvent) {

    }// function clicar(lugarClique) {

    /***************/

    // Cria o botão de ligar o robô
    // let botao = '<div class="config-robo"><button id="header-deposit" class="red ligar"><i class="fas fa-play"></i> LIGAR</button></div>'

    // Insere o botão dentro da página da blaze
    // document.querySelector('.account').innerHTML += botao

    $("#casino").prepend('<div class="config-robo"><button id="header-deposit" class="red ligar"><i class="fas fa-play"></i> LIGAR</button></div>')

    // Seleciona a div do botão
    let boxBotao = document.querySelector('.config-robo')

    /***************/

    // Variáveis das posições dos elementos na tela
    var comecarJogo    = document.querySelector('.place-bet .undefined')
    var dobrarEntrada  = document.querySelector('.double')
    var dividirEntrada = document.querySelector('.half')
    var vermelho       = document.querySelector('.input-wrapper .red')
    var vermelhoWin    = ''
    var preto          = document.querySelector('.input-wrapper .black')
    var pretoWin       = ''
    var branco         = document.querySelector('.input-wrapper .white')
    var brancoWin      = ''

    /***************/

    // Ao clicar no botão, executa a ação de ligar ou desligar o robô
    boxBotao.addEventListener("click", function() {

        if (document.querySelector('.config-robo .red').classList.contains('ligar')) {
        
            statusRobo = 1

            boxBotao.innerHTML = '<div class="config-robo"><button id="header-deposit" class="red desligar"><i class="fas fa-times"></i> DESLIGAR</button></div>'
        
        } else {
        
            statusRobo = 0

            boxBotao.innerHTML = '<div class="config-robo"><button id="header-deposit" class="red ligar"><i class="fas fa-play"></i> LIGAR</button></div>'
        
        }// else if (document.querySelector('.config-robo .red').classList.contains('ligar'))

    })// boxBotao.addEventListener

    /***************/

    // Estratégia de entrar na tendência do mercado

    setInterval(function () {

        // Separa os valores das entradas no vermelho
        valorVermelho = document.querySelectorAll('.counter')[1].innerHTML.split('</span>')[0].split('R$ ')[1]

        // Validação se o vermelho ganhou a rodada = true
        vermelhoWin = document.querySelectorAll('.counter')[1].childNodes[0].classList.contains("good")

        /*******/

        // Separa os valores das entradas no branco
        valorBranco = document.querySelectorAll('.counter')[3].innerHTML.split('</span>')[0].split('R$ ')[1]

        // Validação se o branco ganhou a rodada = true
        brancoWin = document.querySelectorAll('.counter')[3].childNodes[0].classList.contains("good")

        /*******/

        // Separa os valores das entradas no preto
        valorPreto = document.querySelectorAll('.counter')[5].innerHTML.split('</span>')[0].split('R$ ')[1]

        // Validação se o preto ganhou a rodada = true
        pretoWin = document.querySelectorAll('.counter')[5].childNodes[0].classList.contains("good")

        /*******/

        // Separa o contador para poder efetuar a entrada
        timeLeft = document.querySelector('.time-left span').innerHTML.split(':')[0]

    }, 1000)

    /***************/

    setInterval(function () {
        
        // Verifica se o robô está ligado, e se o saldo atual da banca está entre o stopwin e o stoploss
        if (statusRobo != 0 && (document.querySelector('.currency').innerHTML.split('</span>')[1] < stopWin || document.querySelector('.currency').innerHTML.split('</span>')[1] > stopLoss)) {
            
            // Se o valor de apostas do vermelho for maior que o valor do preto vezes 3, ele valida a entrada
            if (valorVermelho > (valorPreto * 3) && vermelhoWin == false && valorVermelho >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax) {

                rodadaVermelho = 1

                clicar(vermelho)
                clicar(comecarJogo)
        
            } else if (document.querySelector('.currency').innerHTML.split('</span>')[1] > stopWin) {

                statusRobo = 0

                alert('STOPWIN BATIDO COM SUCESSO!')

            } else if (document.querySelector('.currency').innerHTML.split('</span>')[1] < stopLoss) {

                statusRobo = 0

                alert('STOPLOSS ATINGIDO')

            }

            /*******/
        
            // Se o valor de apostas do preto for maior que o valor do vermelho vezes 3, ele valida a entrada
            if (valorPreto > (valorVermelho * 3) && pretoWin == false && valorPreto >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax) {

                clicar(preto)
                clicar(comecarJogo)

            } else if (document.querySelector('.currency').innerHTML.split('</span>')[1] > stopWin) {

                statusRobo = 0

                alert('STOPWIN BATIDO COM SUCESSO!')

            } else if (document.querySelector('.currency').innerHTML.split('</span>')[1] < stopLoss) {

                statusRobo = 0

                alert('STOPLOSS ATINGIDO')

            }

        }// if (statusRobo != 0 && (document.querySelector('.currency').innerHTML.split('</span>')[1] < stopWin || document.querySelector('.currency').innerHTML.split('</span>')[1] > stopLoss))

    }, 3000)

})