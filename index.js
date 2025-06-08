const LogoPenske = "./Imgs/PenskeLogo.png"
const downloadButton = document.getElementById("BotaoDeBaixar")
const labelDeArmazenarImagens = document.getElementById("CentralizarImagensFlex")
const BotaoDeExcluirImagem = document.getElementById("BotaoDeExcluirImagem")
const InputDeAnexarImagem = document.getElementById("InputDeAnexarImagem")

function EfeitoDeBotao(){
    downloadButton.style.backgroundColor = "black"
    downloadButton.style.color = "white"
    downloadButton.style.border = "2px solid white"
    setTimeout(() => {
        downloadButton.removeAttribute("style")
    }, 200);
}
  
var ImagesList = []
function ExibirImagensNaTela() {
    if(ImagesList.length == 3){
        Swal.fire({
            title: 'Ops!',
            text: 'Você só pode adicionar até 3 imagens!',
            icon: 'error'
        })
        return
    }
    for(let i = 0; i < InputDeAnexarImagem.files.length; i++){
        ImagesList.push(InputDeAnexarImagem.files[i])
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

   const promises = ImagesList.map(file => {
    return new Promise((resolve) => {

        var reader = new FileReader()
        reader.onload = function() {
            var dataURL = reader.result
            var imgContainer = document.createElement("div")
            var img = document.createElement("img")
            imgContainer.className = "imgContainer"
            img.className = "ImagensAnexadas"
            img.src = dataURL
            img.title = "Foto da embalagem"
            file.imgURL = img.src
            ExibirBotaoDeDeletar(imgContainer)
            imgContainer.appendChild(img)
            labelDeArmazenarImagens.appendChild(imgContainer)
            resolve(file)
        }
        reader.readAsDataURL(file)
    })
    })
    return Promise.all(promises)
}

    BotaoDeExcluirImagem.addEventListener("click", function(event) {
        event.preventDefault()

        const ArrayDasImagens = Array.from(labelDeArmazenarImagens.getElementsByClassName("imgContainer"))
    
        for (let i = ArrayDasImagens.length - 1; i >= 0; i--) {
            const container = ArrayDasImagens[i]
            const checkbox = container.getElementsByTagName("input")[0]
            if (checkbox.checked) {
                ImagesList.splice(i, 1)
                labelDeArmazenarImagens.removeChild(container);
                InputDeAnexarImagem.value = ""
                return
            }
        }
    
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de selecionar uma imagem!',
            icon: 'error'
        });
    });

let RelatorioObj = {}
function obterDadosPDF() {
    
    const validar = new Validar()
    const DataFormatada = new DataAtual()

    const NF = validar.ValidarCampoDeTexto("NFCaixaDeTexto")
    const Agrupador = validar.ValidarCampoDeTexto("AgrupadorCaixaDeTexto")
    const Estado = validar.ValidarCampoDeTexto("EstadoCampoDeTexto")
    const Cidade = validar.ValidarCampoDeTexto("CidadeCampoDeTexto")
    const Concessionaria = validar.ValidarCampoDeTexto("ConcessionariaCampoDeTexto")
    const PartNumber = validar.ValidarCampoDeTexto("PartNumberCampoDeTexto")
    const Embalagem = validar.ValidarCampoDeTexto("EmbalagemCampoDeTexto")
    const Problema = validar.ValidarCampoDeTexto("ProblemaCampoDeTexto")

    const AcaoTomada = validar.validarCheckBox(".AcaoTomada")
    const PecaAvariada = validar.validarCheckBox(".Peca")

    const Transportadora = validar.ValidarCampoDeTexto("TransportadoraCampoDeTexto")
    const Placa = validar.ValidarCampoDeTexto("PlacaCampoDeTexto")
    const Destino = validar.ValidarCampoDeTexto("DestinoCampoDeTexto")
    const HorarioDeSaida = validar.ValidarCampoDeTexto("HorarioCampoDeTexto")

    const Obs = validar.validarCampoDeOBS()


    //TODO 
    // verificar a quantidade exata de imagens antes de modularizar a verificação das imagens.
    if(ImagesList.length < 3){
        Swal.fire({
            title: 'Ops!',
            text: 'Você esqueceu de preencher o campo de Imagens com 3 imagens!',
            icon: 'error'
        });
        return
    }

    RelatorioObj = {
        DataAtual: DataFormatada,
        NF: NF,
        Agrupador: Agrupador,
        Estado: Estado,
        Cidade: Cidade,
        Concessionaria: Concessionaria,
        PartNumber: PartNumber,
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
    obterDadosPDF()

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
        doc.text("Revisão: 01", 810, 140)


    //Informações gerais

        //Data e Agrupador
        doc.text(RelatorioObj.DataAtual, 65, 225)
        doc.line(65, 229, 220, 229)
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
        doc.text("Descrição do PartNumber", 190, 465)
        doc.setTextColor(0, 0, 0)
        doc.text(RelatorioObj.PartNumber, 190, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Nome da Concessionária", 400, 465)
        doc.setTextColor(0, 0, 0)
        doc.text(RelatorioObj.Concessionaria, 400, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Estado", 665, 465)
        doc.setTextColor(0, 0, 0)
        doc.text(RelatorioObj.Estado, 630, 490)

        doc.setTextColor(255, 255, 255)
        doc.text("Cidade", 785, 465)
        doc.setTextColor(0, 0, 0)
        doc.text(RelatorioObj.Cidade, 755, 490)

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
        
        doc.addImage(ImagesList[0].imgURL, 60, 590, 260, 150)
        doc.line(370, 580, 370, 755)
        doc.addImage(ImagesList[1].imgURL, 420, 590, 260, 150)
        doc.line(730, 580, 730, 755)
        doc.addImage(ImagesList[2].imgURL, 775, 590, 120, 150)
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
        
        var width = 105;
        var height = 798;
        var maxWidth = 750;

        var linhas = doc.splitTextToSize(RelatorioObj.Obs, maxWidth)

for (var i = 0; i < linhas.length; i++) {
    if (i > 0) {
        height = height + 50;
        width = 105;
    }
    doc.text(linhas[i], width, height);
}
    doc.save(RelatorioObj.NF + ".pdf")
    
    EfeitoDeBotao()
}

downloadButton.addEventListener("click", () => GerarPDF())