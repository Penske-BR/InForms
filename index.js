var downloadButton = document.getElementById("MyButton")

function EffectButton(){
    downloadButton.style.backgroundColor = "black"
    downloadButton.style.color = "white"
    downloadButton.style.border = "2px solid white"
    setTimeout(() => {
        downloadButton.removeAttribute("style")
    }, 200);
}

function generatePDF() {

    var text = ""

    //Número de série/agrupador
    if(document.getElementById("SerieCaixaDeTexto") != ""){
        text += document.getElementById("SerieCaixaDeTexto").value + "\n"
    }else{
        alert("Preencha o número de série!")
        return
    }
    if(document.getElementById("AgrupadorCaixaDeTexto") != ""){
        text += document.getElementById("AgrupadorCaixaDeTexto").value + "\n"
    }else{
        alert("Preencha o número de agrupador!")
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

    //Ação da Jaguar

    if(document.getElementById("TrocarEmbalagem").checked){
        text += document.getElementById("TrocarEmbalagem").value
    }else if(document.getElementById("RepararEmbalagem")){
        text += document.getElementById("RepararEmbalagem").value
    }else if(document.getElementById("SeguirDanificada").checked){
        text += document.getElementById("SeguirDanificada").value
    }
    else{
        alert("Marque a ação da Jaguar!")
    }
    EffectButton()
    
    const jsPDF = window.jspdf.jsPDF;    
    var doc = new jsPDF();
    doc.text(text, 10, 10)
    doc.save("Test.pdf")
    }
