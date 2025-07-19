const downloadButton = document.getElementById("BotaoDeBaixar")
const labelDeArmazenarImagens = document.getElementById("CentralizarImagensFlex")
const BotaoDeExcluirImagem = document.getElementById("BotaoDeExcluirImagem")
const InputDeAnexarImagem = document.getElementById("InputDeAnexarArquivo")
const manager = new ImageManager(InputDeAnexarImagem, labelDeArmazenarImagens)

function EffectButton(){
    downloadButton.style.backgroundColor = "black"
    downloadButton.style.color = "white"
    downloadButton.style.border = "2px solid white"
    setTimeout(() => {
        downloadButton.removeAttribute("style")
    }, 200);
}

function ExibirImagensNaTela() {
    manager.appendFromInput()
}


BotaoDeExcluirImagem.addEventListener("click", function(event) {
    event.preventDefault()
    manager.deleteSelectedImages()
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
    PDFmaker.GeneratePDFLayout(PDFReportObj, manager.getImageList())    
    EffectButton()
}

downloadButton.addEventListener("click", () => getPDFfile())