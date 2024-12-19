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

    var text = ""

    //Número de NF
    if(document.getElementById("NFCaixaDeTexto").value != ""){
        text += document.getElementById("NFCaixaDeTexto").value + "\n"
    }else{
        alert("Preencha o número de NF!")
        return
    }

    //Estado e Cidade
    if(document.getElementById("EstadoCampoDeTexto").value != ""){
        text += document.getElementById("EstadoCampoDeTexto").value + "\n"
    }
    else{
        alert("Preencha o campo de Estado!")
        return
    }
    if(document.getElementById("CidadeCampoDeTexto").value != ""){
        text += document.getElementById("CidadeCampoDeTexto").value + "\n"
    }
    else{
        alert("Preencha o campo de Cidade!")
        return
    }

    //Material da caixa
    if(document.getElementById("CheckBoxCaixaDePapelao").checked){
        text += document.getElementById("CheckBoxCaixaDePapelao").value + "\n"
    }
    else if(document.getElementById("CheckBoxCaixaDeMadeira").checked){
        text += document.getElementById("CheckBoxCaixaDeMadeira").value + "\n"
    }
    else if(document.getElementById("CheckBoxPallet").checked){
        text += document.getElementById("CheckBoxPallet").value + "\n"
    }
    else{
        alert("Marque o material da caixa!")
        return
    }

    //Descrever problema

    if(document.getElementById("ProblemaCampoDeTexto").value != ""){
        text += document.getElementById("ProblemaCampoDeTexto").value + "\n"
    }else{
        alert("Preencha o campo de problema!")
        return
    }

    //Ação tomada

    if(document.getElementById("TrocarEmbalagem").checked){
        text += document.getElementById("TrocarEmbalagem").value + "\n"
    }else if(document.getElementById("RepararEmbalagem")){
        text += document.getElementById("RepararEmbalagem").value + "\n"
    }else if(document.getElementById("SeguirDanificada").checked){
        text += document.getElementById("SeguirDanificada").value + "\n"
    }
    else{
        alert("Marque a ação da Jaguar!")
    }

    //Anexar imagem

    EffectButton()
    
    const jsPDF = window.jspdf.jsPDF;    
    var doc = new jsPDF();
    doc.text(text, 10, 10)
    doc.save("Test.pdf")
    }
