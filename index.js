const LogoPenske = "./Imgs/PenskeLogo.png"
const downloadButton = document.getElementById("BotaoDeBaixar")
const labelDeArmazenarImagens = document.getElementById("CentralizarImagensFlex")
const BotaoDeExcluirImagem = document.getElementById("BotaoDeExcluirImagem")
const InputDeAnexarImagem = document.getElementById("InputDeAnexarImagem")
const btnTest = document.getElementById("btnTest")

function EffectButton(){
    downloadButton.style.backgroundColor = "black"
    downloadButton.style.color = "white"
    downloadButton.style.border = "2px solid white"
    setTimeout(() => {
        downloadButton.removeAttribute("style")
    }, 200);
}

let ArrayDeElementos = []
function ExibirImagensNaTela() {
    for(let i = 0; i < InputDeAnexarImagem.files.length; i++){
        ArrayDeElementos.push(InputDeAnexarImagem.files[i])
    }

    while (labelDeArmazenarImagens.firstChild) {
        labelDeArmazenarImagens.removeChild(labelDeArmazenarImagens.firstChild);
    }

    function ExibirBotaoDeDeletar(ElementoPai) {
                var CheckBoxDeDeletar = document.createElement("input")
                CheckBoxDeDeletar.type = "checkbox"
                CheckBoxDeDeletar.className = "CheckBoxDeDeletar"
                ElementoPai.appendChild(CheckBoxDeDeletar)
                return CheckBoxDeDeletar
    }

    ArrayDeElementos.forEach(file => {
        var reader = new FileReader()
        reader.onload = function() {
            var dataURL = reader.result
            var imgContainer = document.createElement("div")
            var img = document.createElement("img")
            imgContainer.className = "imgContainer"
            img.className = "ImagensAnexadas"
            img.src = dataURL
            img.title = "Foto da embalagem"
            ExibirBotaoDeDeletar(imgContainer)
            imgContainer.appendChild(img)
            labelDeArmazenarImagens.appendChild(imgContainer)
        }
        reader.readAsDataURL(file)
    })
}

BotaoDeExcluirImagem.addEventListener("click", function() {
    const ArrayDasImagens = Array.from(labelDeArmazenarImagens.getElementsByClassName("imgContainer"))

    for(let i = ArrayDasImagens.length -1; i >= 0; i--){
        const container = ArrayDasImagens[i]
        const checkbox = container.getElementsByTagName("input")[0]
        if(checkbox.checked){
            labelDeArmazenarImagens.removeChild(container)
            ArrayDeElementos.splice(i, 1)
        }
    }
})

let RelatorioObj = {}
function RelatorioObject() {
    let DataAtual = new Date()
    let dia = String(DataAtual.getDate()).padStart(2, "0")
    let mes = String(DataAtual.getMonth() + 1).padStart(2, "0")
    let ano = DataAtual.getFullYear()
    let hora = String(DataAtual.getHours()).padStart(2, "0")
    let minuto = String(DataAtual.getMinutes()).padStart(2, "0")
    let DataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minuto}`

    if(document.getElementById("NFCaixaDeTexto").value != ""){
    var NumeroDaNota = document.getElementById("NFCaixaDeTexto").value
    }
    else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de NF!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("AgrupadorCaixaDeTexto").value != ""){
        var Agrupador = document.getElementById("AgrupadorCaixaDeTexto").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Agrupador!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("EstadoCampoDeTexto").value != ""){
        var Estado = document.getElementById("EstadoCampoDeTexto").value
    }
    else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Estado!',
            icon: 'error'
        });
        return
    }
    if(document.getElementById("CidadeCampoDeTexto").value != ""){
        var Cidade = document.getElementById("CidadeCampoDeTexto").value
    }
    else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Cidade!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("ConcessionariaCampoDeTexto").value != ""){
        var Concessionaria = document.getElementById("ConcessionariaCampoDeTexto").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Concessionária!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("ItemCampoDeTexto").value != ""){
        var Item = document.getElementById("ItemCampoDeTexto").value   
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Item!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("EmbalagemCampoDeTexto").value != ""){
        var Embalagem = document.getElementById("EmbalagemCampoDeTexto").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Embalagem!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("ProblemaCampoDeTexto").value != ""){
        var Problema = document.getElementById("ProblemaCampoDeTexto").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Problema!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("TrocarEmbalagem").checked){
        var AcaoTomada = document.getElementById("TrocarEmbalagem").value
    }
    else if(document.getElementById("RepararEmbalagem").checked){
        var AcaoTomada = document.getElementById("RepararEmbalagem").value
    }
    else if(document.getElementById("SeguirDanificada").checked){
        var AcaoTomada = document.getElementById("SeguirDanificada").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Ação tomada!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("SimVolumeAvariado").checked){
        var PecaAvariada = document.getElementById("SimVolumeAvariado").value
    }
    else if(document.getElementById("NaoVolumeAvariado").checked){
        var PecaAvariada = document.getElementById("NaoVolumeAvariado").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Peça avariada!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("TransportadoraCampoDeTexto").value != ""){
        var Transportadora = document.getElementById("TransportadoraCampoDeTexto").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Transportadora!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("PlacaCampoDeTexto").value != ""){
        var Placa = document.getElementById("PlacaCampoDeTexto").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Placa!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("DestinoCampoDeTexto").value != ""){
        var Destino = document.getElementById("DestinoCampoDeTexto")
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Destino!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("HorarioCampoDeTexto").value != ""){
        var HorarioDeSaida = document.getElementById("HorarioCampoDeTexto").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Horário de saída!',
            icon: 'error'
        });
        return
    }

    if(document.getElementById("CampoDeObs").value != ""){
        var Obs = document.getElementById("CampoDeObs").value
    }else{
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Observação!',
            icon: 'error'
        });
        return
    }

    RelatorioObj = {
        DataAtual: DataFormatada,
        NF: NumeroDaNota,
        Agrupador: Agrupador,
        Estado: Estado,
        Cidade: Cidade,
        Concessionaria: Concessionaria,
        Item: Item,
        Embalagem: Embalagem,
        Problema: Problema,
        AcaoTomada: AcaoTomada,
        PecaAvariada: PecaAvariada,
        Transportadora: Transportadora,
        Placa: Placa,
        Destino: Destino,
        HorarioDeSaida: HorarioDeSaida,
        Obs: Obs
    }
}

function GerarPDF() {
    RelatorioObject()
    EffectButton()

    const jsPDF = window.jspdf.jsPDF;    
    var doc = new jsPDF({
        orientation: 'portrait',
        unit: "mm",
        format: [958, 1250] //x, y
    });

    //x1, y1, x2, y2

    doc.setFontSize(40)
    doc.setFont("Helvetica","bold")
    doc.setLineWidth(2)

    //Margem

        //Superior
        doc.line(50, 100, 908, 100)

        //Esquerda
        doc.line(50, 100, 50, 1100)

        //Direita
        doc.line(908, 100, 908, 1100)

        //Inferior
        doc.line(50, 1100, 908, 1100)


    //Cabeçalho

        doc.addImage(LogoPenske,"PNG", 75, 78, 120, 120)

        //Linha azul abaixo do Logo Penske
        doc.setDrawColor(32, 79, 146)
        doc.setLineWidth(20)
        doc.line(50, 180, 908, 180)

        //Divisória entre logo e  cabeçalho
        doc.setDrawColor(0,0,0)
        doc.setLineWidth(1)
        doc.line(220, 100, 220, 170)

        //Tipo de Documento e Título
        doc.text("Tipo de Documento: ", 225, 113)
        doc.text("FOR.NISS.OPE.01", 470, 133)
        doc.line(220, 135, 788, 135)
        doc.text("Título: ", 225, 148)
        doc.text("Relatório de Inspeção", 460, 168)

        //Revisão
        doc.line(788, 100, 788, 170)
        doc.text("Revisão: 00", 810, 140)


    //Informações gerais

        //Data e Agrupador
        doc.text(RelatorioObj.DataAtual, 65, 225)
        doc.line(108, 229, 220, 229)
        doc.text("N° da NF:  " + RelatorioObj.NF, 700, 225)
        doc.line(770, 229, 908, 229)

        //Embalagem, Peça avariada e Problema
        doc.text("Embalagem avariada:  " + RelatorioObj.Embalagem, 65, 280)
        doc.line(216, 282, 300, 282)
        doc.text("Peça avariada:  " + RelatorioObj.PecaAvariada, 400, 280)
        doc.line(504, 280, 600, 280)
        doc.text("Problema:  " + RelatorioObj.Problema, 680, 280)
        doc.line(756, 280, 908, 280)

        //Ação tomada, Transportadora e Placa
        doc.text("Ação tomada:  " + RelatorioObj.AcaoTomada, 65, 335)
        doc.line(164, 335, 300, 335)
        doc.text("Transportadora:  " + RelatorioObj.Transportadora, 400, 335)
        doc.line(515, 335, 600, 335)
        doc.text("Placa:  " + RelatorioObj.Placa, 680, 335)
        doc.line(730, 335, 908, 335)

        //Destino e Horario de saída
        doc.text("Horário de saída:  " + RelatorioObj.HorarioDeSaida, 65, 400)
        doc.line(188, 400, 240, 400)
        doc.text("Destino:  " + RelatorioObj.Destino, 400, 400)
        doc.line(458, 400, 600, 400)


    //Tabela

        //Linhas
        doc.setDrawColor(32, 79, 146)
        doc.setLineWidth(24)
        doc.line(50, 460, 908, 460) //Linha Azul

        doc.setDrawColor(0,0,0)
        doc.setLineWidth(2)

        doc.line(50, 500, 908, 500)//Linha inferior

        //Divisórias
        doc.line(165, 450, 165, 500)//D1
        doc.line(370, 450, 370, 500)//D2
        doc.line(625, 450, 625, 500)//D3
        doc.line(750, 450, 750, 500)//D4

        //Informações
        doc.setTextColor(255, 255,  255)
        doc.text("Agrupador", 75, 465)
        doc.setTextColor(0,0,0)
        doc.text(RelatorioObj.Agrupador, 75, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Descrição do item", 190, 465)
        doc.setTextColor(0, 0, 0)
        doc.text(RelatorioObj.Item, 190, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Nome da Concessionária", 400, 465)
        doc.setTextColor(0, 0, 0)
        doc.text(RelatorioObj.Concessionaria, 400, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Estado", 665, 465)
        doc.setTextColor(0, 0, 0)
        doc.text(RelatorioObj.Estado, 665, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Cidade", 785, 465)
        doc.setTextColor(0, 0, 0)
        doc.text(RelatorioObj.Cidade, 785, 490)

    //Campo das imagens

        //Linha azul
        doc.setDrawColor(32, 79, 146)
        doc.setLineWidth(24)
        doc.line(50, 570, 908, 570)
        doc.setTextColor(255,255,255)
        doc.text("Fotos do produto avariado", 400, 575)

        //Imagens
        doc.setLineWidth(2)
        doc.setDrawColor(0,0,0)
        doc.addImage("./Imgs/Imagem.png", 60, 590, 260, 150)
        doc.line(370, 580, 370, 755)
        doc.addImage("./Imgs/Peca.png", 420, 590, 260, 150)
        doc.line(730, 580, 730, 755)
        doc.addImage("./Imgs/Imagem.png", 775, 590, 120, 150)
        doc.line(50, 754, 908, 754)

        //Campo de obs
        doc.setTextColor(0,0,0)
        doc.text("OBS:", 60, 800)
        doc.line(100, 800, 854, 800)
        doc.line(100, 850, 854, 850)
        doc.line(100, 900, 854, 900)
        doc.line(100, 950, 854, 950)
        doc.line(100, 1000, 854, 1000)
        doc.line(100, 1050, 854, 1050)

    doc.save("Relatorio.pdf")
}