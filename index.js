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

    // if(document.getElementById("NFCaixaDeTexto").value == undefined){
    // var NumeroDaNota = document.getElementById("NFCaixaDeTexto").value
    // }
    // else{
    //     alert("Preencha o campo de NF!")
    //     return
    // }
    // if(document.getElementById("EstadoCampoDeTexto").value != ""){
    //     var Estado = document.getElementById("EstadoCampoDeTexto").value
    // }
    // else{
    //     alert("Preencha o campo de Estado!")
    //     return
    // }
    // if(document.getElementById("CidadeCampoDeTexto").value != ""){
    //     var Cidade = document.getElementById("CidadeCampoDeTexto").value
    // }
    // else{
    //     alert("Preencha o campo de Cidade!")
    //     return
    // }

    // if(document.getElementById("CheckBoxCaixaDePapelao").checked){
    //     var embalagem = document.getElementById("CheckBoxCaixaDePapelao").value
    // }
    // else if(document.getElementById("CheckBoxCaixaDeMadeira").checked){
    //     var embalagem = document.getElementById("CheckBoxCaixaDeMadeira").value
    // }
    // else if(document.getElementById("CheckBoxPallet").checked){
    //     var embalagem = document.getElementById("CheckBoxPallet").value
    // }else{
        
    //     alert("Preencha o campo do material da embalagem!")
    //     return
    // }

    // if(document.getElementById("ProblemaCampoDeTexto").value != ""){
    //     var Problema = document.getElementById("ProblemaCampoDeTexto").value
    // }else{
    //     alert("Preencha o campo de problema!")
    //     return
    // }

    // if(document.getElementById("TrocarEmbalagem").checked){
    //     var AcaoTomada = document.getElementById("TrocarEmbalagem").value
    // }
    // else if(document.getElementById("RepararEmbalagem").checked){
    //     var AcaoTomada = document.getElementById("RepararEmbalagem").value
    // }
    // else if(document.getElementById("SeguirDanificada").checked){
    //     var AcaoTomada = document.getElementById("SeguirDanificada").value
    // }
    // else{
    //     alert("Preencha o campo de ação tomada!")
    //     return
    // }

    //  RelatorioObj = {
    //     DataAtual: DataFormatada,
    //     NF: NumeroDaNota,
    //     Embalagem: embalagem,
    //     Estado: Estado,
    //     Cidade: Cidade,
    //     Problema: Problema,
    //     AcaoTomada: AcaoTomada
    // }
}

function RemoverImagens() {
    DivDeArmazenarImagens.removeChild(DivDeArmazenarImagens, lastChild)
}

function generatePDF() {
    RelatorioObject()
    EffectButton()

        let LogoPenske = "./Imgs/PenskeLogo.png"


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
    doc.text("Data: " , 10, 130)
    doc.text("N° Controle: ", 800, 130)
    doc.line(876, 131, 998, 131)

    //Ação tomada
    doc.text("Embalagem avariada: " , 10, 180)
    doc.text("Ação tomada: " , 410, 180)
    doc.text("Undefined", 600,180)
    doc.line(750, 185, 998, 185)

    //Peça avariada e problema
    doc.text("Peça/Embalagem avariada: ", 10, 250)
    doc.text("Sim", 210,250)
    doc.text("Descrever problema: ", 350, 250)
    doc.line(500, 252, 998, 252)

    //Tansportadora, placa e destino
    doc.text("Transportadora: ", 10, 350)
    doc.text("TRANSPORTADORA TRANSPORTADORA", 130, 350)
    doc.text("Placa: ", 504, 350)
    doc.text("PLAC-1234", 560, 350)
    doc.text("Destino: ", 750, 350)
    doc.text("HUB - SÃO PAULO", 830, 350)

    //Hora da saída
    doc.text("Horário saída: ", 10, 420)

    //Tabela abaixo do horário de saída
    doc.setTextColor(255, 255, 255)
    doc.line(5, 450, 1003, 450)
    doc.setLineWidth(20)
    doc.setDrawColor(33, 81, 168)
    doc.line(5, 460, 128, 460)
    doc.text("Numero da NF", 20, 465)

    doc.setLineWidth(4)
    doc.setDrawColor(0, 0, 0)
    doc.line(128, 450, 128, 470)

    doc.setLineWidth(20)
    doc.setDrawColor(33, 81, 168)
    doc.line(128, 460, 250, 460)
    doc.text("Estado", 160, 465)

    doc.setLineWidth(4)
    doc.setDrawColor(0, 0, 0)
    doc.line(128, 450, 128, 470)

    doc.setLineWidth(2)
    doc.setDrawColor(0, 0, 0)
    doc.line(5, 470, 1003, 470)

    doc.save("Relatorio.pdf")
    
    }