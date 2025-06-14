const downloadButton = document.getElementById("BotaoDeBaixar")
const labelDeArmazenarImagens = document.getElementById("CentralizarImagensFlex")
const BotaoDeExcluirImagem = document.getElementById("BotaoDeExcluirImagem")
const InputDeAnexarImagem = document.getElementById("InputDeAnexarImagem")

function EffectButton(){
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

let PDFReportObj = {}
function getPDFObjData() {
    
    const validate = new Validate()
    const currentDate = new CurrentDate().getCurrentDate()

    const NF = validate.checkTextField("NFCaixaDeTexto")
    const Agrupador = validate.checkTextField("AgrupadorCaixaDeTexto")
    const Estado = validate.checkTextField("EstadoCampoDeTexto")
    const Cidade = validate.checkTextField("CidadeCampoDeTexto")
    const Concessionaria = validate.checkTextField("ConcessionariaCampoDeTexto")
    const PartNumber = validate.checkTextField("PartNumberCampoDeTexto")
    const Embalagem = validate.checkTextField("EmbalagemCampoDeTexto")
    const Problema = validate.checkTextField("ProblemaCampoDeTexto")

    const AcaoTomada = validate.checkCheckBoxField(".AcaoTomada")
    const PecaAvariada = validate.checkCheckBoxField(".Peca")

    const Transportadora = validate.checkTextField("TransportadoraCampoDeTexto")
    const Placa = validate.checkTextField("PlacaCampoDeTexto")
    const Destino = validate.checkTextField("DestinoCampoDeTexto")
    const HorarioDeSaida = validate.checkTextField("HorarioCampoDeTexto")

    const Obs = validate.checkObsField()


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

    PDFReportObj = {
        CurrentDate: currentDate,
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

function getPDFfile() {
    getPDFObjData()
    const PDFmaker = new PDFLayout()

    PDFmaker.GeneratePDFLayout(PDFReportObj, ImagesList)

    PDFmaker.doc.save(PDFReportObj.NF + ".pdf")
    
    EffectButton()
}

downloadButton.addEventListener("click", () => getPDFfile())