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
    RelatorioObject()
    EffectButton()

    const jsPDF = window.jspdf.jsPDF;    
    var doc = new jsPDF({
        orientation: 'landscape',
        unit: "mm",
        format: [1008, 859] //x, y
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

    //Linha 1 horizontal (Margem)
    doc.line(5, 5, 1003, 5)

    //Linha 1 vertical (Margem)
    doc.line(5, 4, 5, 754)

    //Linha 2 horizontal (Margem)
    doc.line(5, 754, 1003, 754)

    //Linha 2 vertical (Margem)
    doc.line(1003, 5, 1003, 754)

    //Linha abaixo da logo Penske
    doc.addImage(LogoPenske, 10,0)
    doc.line(5, 100, 1003, 100)

    //Linha ao lado da logo Penske
    doc.line(130, 5, 130, 100)

    //Linha entre tipo de documento e titulo
    doc.line(130, 50, 873, 50)
    doc.text("Tipo de documento:", 135, 35)
    doc.text("Titulo:", 135, 75)

    //Linha ao lado da Revisão
    doc.line(873, 5, 873, 100)
    doc.text("Revisão:", 905, 60)

    //Linha azul abaixo da logo Penske
    doc.setDrawColor(33, 81, 168)
    doc.setLineWidth(15)
    doc.line(5, 105, 1003, 105)

    doc.setDrawColor(0, 0, 0)
    doc.setLineWidth(2)

    //data e N° Controle
    doc.text("Data:  " + RelatorioObj.DataAtual, 10, 130)
    doc.text("N° Controle: ", 800, 130)
    doc.line(876, 131, 998, 131)

    //Ação tomada
    doc.text("Embalagem avariada: " + RelatorioObj.Embalagem, 10, 180)
    doc.text("Ação tomada: " + RelatorioObj.AcaoTomada , 350, 180)

    //Peça avariada e problema
    doc.text("Peça/Embalagem avariada: " + RelatorioObj.PecaAvariada, 10, 250)
    doc.text("Descrever problema: " + RelatorioObj.Problema, 350, 250)

    //Tansportadora, placa e destino
    doc.text("Transportadora: ", 10, 350)
    doc.text(RelatorioObj.Transportadora, 130, 350)
    doc.text("Placa: " + RelatorioObj.Placa, 350, 350)

    //Tabela abaixo do horário de saída
    doc.setTextColor(255, 255, 255)
    doc.line(5, 450, 1003, 450)

    doc.setLineWidth(20)
    doc.setDrawColor(33, 81, 168)
    doc.line(5, 460, 178, 460)
    doc.text("Numero da NF", 36, 465)

    doc.setLineWidth(4)
    doc.setDrawColor(0,0,0)
    doc.line(178, 450, 178, 496)

    doc.setLineWidth(20)
    doc.setDrawColor(33, 81, 168)
    doc.line(178, 460, 380, 460)
    doc.text("Descrição do item", 212, 465)

    doc.setLineWidth(4)
    doc.setDrawColor(0,0,0)
    doc.line(380, 450, 380, 496)

    doc.setLineWidth(20)
    doc.setDrawColor(33, 81, 168)
    doc.line(380, 460, 660, 460)
    doc.text("Nome da concessionária", 430, 465)

    doc.setLineWidth(4)
    doc.setDrawColor(0,0,0)
    doc.line(660, 450, 660, 496)

    doc.setLineWidth(20)
    doc.setDrawColor(33, 81, 168)
    doc.line(660, 460, 820, 460)
    doc.text("Estado", 710, 465)

    doc.setLineWidth(4)
    doc.setDrawColor(0,0,0)
    doc.line(820, 450, 820, 496)

    doc.setLineWidth(20)
    doc.setDrawColor(33, 81, 168)
    doc.line(820, 460, 1003, 460)
    doc.text("Cidade", 880, 465)

    //Linha de baixo da tabela
    doc.setLineWidth(2)
    doc.setDrawColor(0, 0, 0)
    doc.line(5, 470, 1003, 470)

    //Linha que contém as informações
    doc.setTextColor(0,0,0)
    doc.line(5, 496, 1003, 496)
    doc.text(RelatorioObj.NF, 55, 490)
    
    doc.text(RelatorioObj.Item, 212, 490)

    doc.text(RelatorioObj.Concessionaria, 430, 490)

    doc.text(RelatorioObj.Estado, 710, 490)

    doc.text(RelatorioObj.Cidade, 880, 490)

    doc.save("Relatorio.pdf")
    }