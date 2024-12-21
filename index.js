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

        let LogoPenske = "./Imgs/LogoPenske.png"

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
        orientation: 'portrait',
        unit: "mm",
        format: [297, 297] //x, y
    });

    // var ImagemAnexada = document.getElementsByClassName("ImagensAnexadas")
    // Array.from(ImagemAnexada).forEach(Imagem => {
    //     var imgData = Imagem.src
    //     doc.addImage(imgData, "JPEG", 10, y, 50, 50)
    //     y += 60
    // });

    //x1, y1, x2, y2

    doc.setLineWidth(2)

    //Linha 1 horizontal (Margem)
    doc.line(5, 5, 205, 5)

    //Linha 1 vertical (Margem)
    doc.line(5, 4, 5, 294)

    //Linha 2 horizontal (Margem)
    doc.line(5, 293, 205, 293)

    //Linha 2 vertical (Margem)
    doc.line(204, 5, 205, 294)

    doc.addImage(LogoPenske, 5,0)
    doc.save("Test.pdf")
    
    }