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

function RemoverImagens() {
    DivDeArmazenarImagens.removeChild(DivDeArmazenarImagens, lastChild)
}

function generatePDF() {
    EffectButton()

        let LogoPenske = "./Imgs/PenskeLogo.png"

        let DataAtual = new Date()
        let dia = String(DataAtual.getDate()).padStart(2, "0")
        let mes = String(DataAtual.getMonth() + 1).padStart(2, "0")
        let ano = DataAtual.getFullYear()
        let hora = String(DataAtual.getHours()).padStart(2, "0")
        let minuto = String(DataAtual.getMinutes()).padStart(2, "0")

        let DataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minuto}`

        let NF = document.getElementById("NFCaixaDeTexto")
    

    const jsPDF = window.jspdf.jsPDF;    
    var doc = new jsPDF({
        orientation: 'landscape',
        unit: "mm",
        format: [1008, 759] //x, y
    });

    // var ImagemAnexada = document.getElementsByClassName("ImagensAnexadas")
    // Array.from(ImagemAnexada).forEach(Imagem => {
    //     var imgData = Imagem.src
    //     doc.addImage(imgData, "JPEG", 10, y, 50, 50)
    //     y += 60
    // });

    //x1, y1, x2, y2

    doc.setFontSize(40)
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
    doc.text("Data: " + DataFormatada, 10, 130)
    doc.text("N° Controle: ", 800, 130)
    doc.line(876, 131, 998, 131)

    doc.save("Test.pdf")
    
    }