const botaoDeAdicionarDesc = document.getElementById("botaoDeAdicionarDesc")
const botaoDeRemoverDesc = document.getElementById("botaoDeRemoverDesc")
const downloadButton = document.getElementById("BotaoDeBaixar")

let pdfEmbarqueObj = {}
let descItems = []

function GerarEmbarqueObj() {
    const validate = new Validate()
    const currentDate = new CurrentDate().getCurrentDate()

    const doca = validate.checkTextField("DocaCaixaDeTexto")
    const placa = validate.checkTextField("PlacaCaixaDeTexto")
    const responsavel = validate.checkTextField("ResponsavelCaixaDeTexto")
    
    const chave = validate.checkCheckBoxField(".ChaveDoVeiculo")
    const calco = validate.checkCheckBoxField(".CalcoDeSeguranca")
    const docaLimpa = validate.checkCheckBoxField(".DocaLimpa")
    const plataforma = validate.checkCheckBoxField(".Plataforma")
    const trava = validate.checkCheckBoxField(".Trava")
    const guardaCorpoFixo = validate.checkCheckBoxField(".GuardaCorpoFixo")
    const guardaCorpoLateral = validate.checkCheckBoxField(".GuardaCorpoLateral")
    const veiculoBomEstado = validate.checkCheckBoxField(".VeiculoBomEstado")
    const dockLight = validate.checkCheckBoxField(".DockLight")
    const cavaleteSaider = validate.checkCheckBoxField(".CavaleteSaider")
    const veiculoSaider = validate.checkCheckBoxField(".VeiculoSaider")
    const veiculo01 = validate.checkCheckBoxField(".Veiculo01eixo")

    for(const descForm of document.querySelectorAll(".centralizarDescFlex")) {

        descItems.push({
            nItemDesc: descForm.querySelector(".TextDesc[name='NdoItem']").value,
            dataFormatada: currentDate.date,
            descricao: descForm.querySelector(".TextDesc[name='Descrição']").value,
            responsavel: descForm.querySelector(".TextDesc[name='Responsável pela inspeção']").value
        })
    }

    pdfEmbarqueObj = {
        dataFormatada: currentDate,
        doca: doca,
        placa: placa,
        responsavel: responsavel,
        chaveDoVeiculo: chave,
        calcoDeSeguranca: calco,
        docaLimpa: docaLimpa,
        plataforma: plataforma,
        trava: trava,
        guardaCorpoFixo: guardaCorpoFixo,
        guardaCorpoLateral: guardaCorpoLateral,
        veiculoBomEstado: veiculoBomEstado,
        dockLight: dockLight,
        cavaleteSaider: cavaleteSaider,
        veiculoSaider: veiculoSaider,
        veiculo01: veiculo01,
        descItems: descItems
    }
}

botaoDeAdicionarDesc.addEventListener("click", (event) => {
    event.preventDefault()
    const managerDescComponent = new ManagerDescComponent()
    managerDescComponent.add()
})

botaoDeRemoverDesc.addEventListener("click", (event) => {
    event.preventDefault()
    const managerDescComponent = new ManagerDescComponent()
    managerDescComponent.deleteChecked()
})

downloadButton.addEventListener("click", () => {
    GerarEmbarqueObj()
    const pdfEmbarque = new EmbarquePDFRepport(pdfEmbarqueObj)

    pdfEmbarque.generatePDF()
})