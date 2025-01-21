let LogoPenske = "./Imgs/PenskeLogo.png"
var downloadButton = document.getElementById("MyButton")
var DivDeArmazenarImagens = document.getElementById("ArmazenarImagens")
var labelDeArmazenarImagens = document.getElementById("QuestaoArquivo")

function EffectButton(){
    downloadButton.style.backgroundColor = "black"
    downloadButton.style.color = "white"
    downloadButton.style.border = "2px solid white"
    setTimeout(() => {
        downloadButton.removeAttribute("style")
    }, 200);
}

function ExibirImagensNaTela(event) {
    var input = event.target

    Array.from(input.files).forEach(file => {
        var reader = new FileReader()
        reader.onload = function() {
            var dataURL = reader.result
            var img = document.createElement("img")
            img.className = "ImagensAnexadas"
            img.src = dataURL
            labelDeArmazenarImagens.appendChild(img)
            console.log(dataURL)
        }
        reader.readAsDataURL(file)
    })
}

function RelatorioObject() {
    let DataAtual = new Date()
    let dia = String(DataAtual.getDate()).padStart(2, "0")
    let mes = String(DataAtual.getMonth() + 1).padStart(2, "0")
    let ano = DataAtual.getFullYear()
    let hora = String(DataAtual.getHours()).padStart(2, "0")
    let minuto = String(DataAtual.getMinutes()).padStart(2, "0")
    let DataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minuto}`

    if(document.getElementById("NFCaixaDeTexto").value != undefined){
    var NumeroDaNota = document.getElementById("NFCaixaDeTexto").value
    }
    else{
        alert("Preencha o campo de NF!")
        return
    }

    if(document.getElementById("EstadoCampoDeTexto").value != ""){
        var Estado = document.getElementById("EstadoCampoDeTexto").value
    }
    else{
        alert("Preencha o campo de Estado!")
        return
    }
    if(document.getElementById("CidadeCampoDeTexto").value != ""){
        var Cidade = document.getElementById("CidadeCampoDeTexto").value
    }
    else{
        alert("Preencha o campo de Cidade!")
        return
    }
    if(document.getElementById("ConcessionariaCampoDeTexto").value != ""){
        var Concessionaria = document.getElementById("ConcessionariaCampoDeTexto").value
    }else{
        alert("Preencha o campo de Concessionária!")
        return
    }

    if(document.getElementById("ItemCampoDeTexto").value != ""){
        var Item = document.getElementById("ItemCampoDeTexto").value   
    }else{
        alert("Preencha o campo de Item!")
        return
    }

    if(document.getElementById("EmbalagemCampoDeTexto") != ""){
        var Embalagem = document.getElementById("EmbalagemCampoDeTexto").value
    }else{
        alert("Preencha o campo de Embalagem!")
        return
    }

    if(document.getElementById("ProblemaCampoDeTexto").value != ""){
        var Problema = document.getElementById("ProblemaCampoDeTexto").value
    }else{
        alert("Preencha o campo de Problema!")
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
        alert("Preencha o campo de Ação tomada!")
    }

    if(document.getElementById("SimVolumeAvariado").checked){
        var PecaAvariada = document.getElementById("SimVolumeAvariado").value
    }
    else if(document.getElementById("NaoVolumeAvariado").checked){
        var PecaAvariada = document.getElementById("NaoVolumeAvariado").value
    }else{
        alert("Preencha o campo de Peça avariada!")
        return
    }

    if(document.getElementById("TransportadoraCampoDeTexto").value != ""){
        var Transportadora = document.getElementById("TransportadoraCampoDeTexto").value
    }else{
        alert("Preencha o campo de Transportadora!")
        return
    }

    if(document.getElementById("PlacaCampoDeTexto").value != ""){
        var Placa = document.getElementById("PlacaCampoDeTexto").value
    }else{
        alert("Preencha o campo de Placa!")
        return
    }

    RelatorioObj = {
        DataAtual: DataFormatada,
        NF: NumeroDaNota,
        Estado: Estado,
        Cidade: Cidade,
        Concessionaria: Concessionaria,
        Item: Item,
        Embalagem: Embalagem,
        Problema: Problema,
        AcaoTomada: AcaoTomada,
        PecaAvariada: PecaAvariada,
        Transportadora: Transportadora,
        Placa: Placa
    }
}

function RemoverImagens() {
    DivDeArmazenarImagens.removeChild(DivDeArmazenarImagens, lastChild)
}

function GerarPDF() {
    EffectButton()

            RelatorioObj = {
        DataAtual: "11/02/2007",
        NF: "178290",
        Estado: "Bahia",
        Cidade: "Xique-Xique",
        Concessionaria: "BOX-Concessionária",
        Item: "Parachoque",
        Embalagem: "Papelão",
        Problema: "Peça quebrada",
        AcaoTomada: "Seguiu danificada",
        PecaAvariada: "Sim",
        Transportadora: "Jolivann",
        Placa: "OSKM2939"
    }

    const jsPDF = window.jspdf.jsPDF;    
    var doc = new jsPDF({
        orientation: 'portrait',
        unit: "mm",
        format: [958, 1500] //x, y
    });

    // var ImagemAnexada = document.getElementsByClassName("ImagensAnexadas")
    // Array.from(ImagemAnexada).forEach(Imagem => {
    //     var imgData = Imagem.src
    //     doc.addImage(imgData, "JPEG", 10, y, 50, 50)
    //     y += 60
    // });

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
        doc.text("Data:  01/02/2024", 65, 225)
        doc.line(108, 229, 220, 229)
        doc.text("N° da NF:  545123", 700, 225)
        doc.line(770, 229, 908, 229)

        //Embalagem, Peça avariada e Problema
        doc.text("Embalagem avariada:  Papelão", 65, 280)
        doc.line(216, 282, 300, 282)
        doc.text("Peça avariada:  Sim", 400, 280)
        doc.line(504, 280, 600, 280)
        doc.text("Problema:  Caixa amassada", 680, 280)
        doc.line(756, 280, 908, 280)

        //Ação tomada, Transportadora e Placa
        doc.text("Ação tomada:  Seguiu danificada", 65, 335)
        doc.line(164, 335, 300, 335)
        doc.text("Transportadora:  PENSKE", 400, 335)
        doc.line(515, 335, 600, 335)
        doc.text("Placa:  OVK-8293", 680, 335)
        doc.line(730, 335, 908, 335)

        //Destino e Horario de saída
        doc.text("Horário de saída:  17:00", 65, 400)
        doc.line(188, 400, 240, 400)
        doc.text("Destino  HUB SP/RJ", 400, 400)
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
        doc.text("546789", 75, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Descrição do item", 190, 465)
        doc.setTextColor(0, 0, 0)
        doc.text("Para-choque", 190, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Nome da Concessionária", 400, 465)
        doc.setTextColor(0, 0, 0)
        doc.text("Katana Veículos LTDA", 400, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Estado", 665, 465)
        doc.setTextColor(0, 0, 0)
        doc.text("GO", 665, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Cidade", 785, 465)
        doc.setTextColor(0, 0, 0)
        doc.text("Goiania", 785, 490)

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
        doc.addImage("./Imgs/Imagem1e2.png", 60, 590, 260, 150)
        doc.line(370, 580, 370, 755)
        doc.addImage("./Imgs/Imagem1e2.png", 420, 590, 260, 150)
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