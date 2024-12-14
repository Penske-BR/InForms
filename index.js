
function generatePDF() {
    var text = ""
    if(document.getElementById("CheckBoxCaixaDePapelao").checked){
        text += document.getElementById("CheckBoxCaixaDePapelao").value + "\n"
    }
    else if(document.getElementById("CheckBoxCaixaDeMadeira").checked){
        text += document.getElementById("CheckBoxCaixaDeMadeira").value + "\n"
    }
    else if(document.getElementById("CheckBoxSemCaixa").checked){
        text += document.getElementById("CheckBoxSemCaixa").value + "\n"
    }
    else{
        alert("Marque o material da caixa.")
        return
    }
    const jsPDF = window.jspdf.jsPDF;    
    var doc = new jsPDF();
    doc.text(text, 10, 10)
    doc.save("Test.pdf")
    }