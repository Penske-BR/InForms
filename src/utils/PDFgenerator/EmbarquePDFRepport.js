import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PenskeLogo from "../../assets/PenskeLogo.png"
import { CurrentDate } from "../utils"

export default class EmbarquePDFRepport {
    #setFileSize() {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: "mm",
            format: [958, 1250]
        })
        return doc
    }

    #getDescItems() {
        let descItemsFormated = []
        for(let i = 0; i < this.pdfEmbarqueObj.campoDescricao.length; i++) {

            descItemsFormated.push([
                this.pdfEmbarqueObj.campoDescricao[i].numero,
                this.currentDate.date,
                this.pdfEmbarqueObj.campoDescricao[i].descricao,
                this.pdfEmbarqueObj.campoDescricao[i].responsavel
            ])
        }
        return descItemsFormated
    }

    constructor(pdfEmbarqueObj) {
        this.pdfEmbarqueObj = pdfEmbarqueObj
        this.doc = this.#setFileSize()
        this.logoPenske = PenskeLogo
        this.availableWidth = this.#getAvailableWidth()
        this.currentDate = new CurrentDate().getCurrentDate()
        this.fields = [
            ["1", "Foi recolhido a chave do veículo?", this.pdfEmbarqueObj.chaveRecolhida],
            ["2", "O veículo está utilizando calço de segurança?", this.pdfEmbarqueObj.calcoSeguranca],
            ["3", "A doca está limpa e organizada?", this.pdfEmbarqueObj.docaLimpaOrganizada],
            ["4", "A plataforma niveladora está posicionada corretamente?", this.pdfEmbarqueObj.plataformaNiveladora],
            ["5", "Está sendo utilizada a trava da porta da doca?", this.pdfEmbarqueObj.travaPortaDoca],
            ["6", "O guarda corpo fixo na rampa niveladora está em boas condições?", this.pdfEmbarqueObj.guardaCorpoRampaNiveladora],
            ["7", "O guarda corpo nas laterais da doca está em boas condições?", this.pdfEmbarqueObj.guardaCorpoLateralDoca],
            ["8", "Veículo em bom estado(porta, piso, cantos vivo, etc)?", this.pdfEmbarqueObj.veiculoBomEstado],
            ["9", "A iluminação(dock light) está funcionando?", this.pdfEmbarqueObj.iluminacaoDockLight],            
            ["10", "O cavalete da plataforma(descarregamento veículo saider) está em boas condições?", this.pdfEmbarqueObj.cavaletePlataforma],           
            ["11", "O veículo saider possui as réguas de proteção lateral?", this.pdfEmbarqueObj.veiculoSaider],           
            ["12", "O veículo com 01(um) eixo está com o cavalo atrelado?", this.pdfEmbarqueObj.veiculoUmEixoCavaloAtrelado]
        ]
        this.descriptionFields = this.#getDescItems()
    }

    #getAvailableWidth() {
        const margin = 50
        return this.doc.internal.pageSize.getWidth() - margin * 2
    }

    #setMargins_Top_Left_Right() {
        this.doc.line(50, 100, 908, 100)
        this.doc.line(50, 100, 50, 1100)
        this.doc.line(908, 100, 908, 1100)
    }

    #setInitialTextSize() {
        this.doc.setFontSize(40)
        this.doc.setFont("Helvetica", "bold")
        this.doc.setLineWidth(2)
    }

    #setHeader() {
        this.doc.addImage(this.logoPenske, "PNG", 75, 78, 120, 120)
        this.doc.setDrawColor(0, 0, 0)
        this.doc.setLineWidth(1)
        this.doc.line(220, 100, 220, 170)
        this.doc.text("Tipo de Documento: ", 225, 113)
        this.doc.text("FOR.TM.SHE.01", 470, 133)
        this.doc.line(220, 135, 788, 135)
        this.doc.text("Título: ", 225, 148)
        this.doc.text("CHECK-LIST DE DOCA", 460, 168)
        this.doc.line(788, 100, 788, 170)
        this.doc.text("Revisão: 00", 810, 140)
        this.doc.line(50, 170, 908, 170)
    }

    #generateWarningText() {
        this.doc.setDrawColor(0, 0, 0)
        this.doc.setLineWidth(30)
        this.doc.line(50, 190, 908, 190)
        this.doc.setTextColor(255, 255, 255)
        this.doc.text("PARA INICIAR AS ATIVIDADES NA DOCA É OBRIGATÓRIO O PREENCHIMENTO DESTE CHECK-LIST", 134, 195)
    }

    #setControlHeader() {
        this.doc.setTextColor(0, 0, 0)
        this.doc.setLineWidth(100)
        this.doc.setDrawColor(190, 190, 190)
        this.doc.line(101, 204, 101, 562)
        this.doc.setFontSize(60)
        this.doc.text("CONTROLE", 106, 450, { angle: 90 })
    }

    #setControlInfos() {
        const rows = [
            ["Data", this.currentDate.date],
            ["Horário", this.currentDate.time],
            ["Doca", this.pdfEmbarqueObj.doca],
            ["Placa do veículo", this.pdfEmbarqueObj.placa],
            ["Responsável pela inspeção", this.pdfEmbarqueObj.responsavel],
        ];

        autoTable(this.doc, {
            body: rows,
            startY: 205,
            margin: { left: 150},
            tableWidth: this.availableWidth,
            columnStyles: {
                0: { cellWidth: 378},
                1: { cellWidth: 380}
            },
            styles: {
                lineWidth: 0.5,
                tableWidth: "wrap",
                lineColor: [0, 0, 0],
                fontSize: 85,
                cellPadding: 15,
                halign: "center",
                valign: "middle",
            },
            headStyles: { fillColor: [255, 255, 255] },
        });
    }

    #fillLegendWarning() {
        const rows = [
            ["Legenda de preenchimento", "C = Conforme", "N/C = Não Conforme", "N/A = Não Aplicado"],
        ];

        autoTable(this.doc, {
            body: rows,
            startY: 550,
            margin: { left: 50, right: 50 },
            tableWidth: this.availableWidth,
            columnStyles: {
                0: { cellWidth: this.availableWidth * 0.3263 },
                1: { cellWidth: this.availableWidth * 0.2214 },
                2: { cellWidth: this.availableWidth * 0.2214 },
                3: { cellWidth: this.availableWidth * 0.2284 }
            },
            styles: {
                fontSize: 60,
                halign: "center",
                valign: "middle",
                cellPadding: 2,
                tableWidth: "wrap",
            },
            didParseCell(data) {
                data.cell.styles.lineWidth = { top: 0.5, right: 0, bottom: 0.5, left: 0 };
                data.cell.styles.lineColor = [0, 0, 0];
            },
            headStyles: { fillColor: [255, 255, 255] },
        });
    }

    #setCheckListFields() {
        const header = [["N°", "Itens a serem verificados", "Verificação"]];

        autoTable(this.doc, {
            head: header,
            body: this.fields,
            margin: { left: 50, right: 50 },
            tableWidth: this.availableWidth,
            columnStyles: {
                0: { cellWidth: this.availableWidth * 0.2086 },
                1: { cellWidth: this.availableWidth * 0.5233 },
                2: { cellWidth: this.availableWidth * 0.2684 }
            },
            styles: {
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                fontSize: 55,
                halign: "center",
                valign: "middle",
                tableWidth: "wrap",
                cellPadding: 10,
            },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontStyle: "bold",
            },
        });
    }

    #setDescriptionWarning(){

        const header = [["Ao observar qualquer irregularidade na doca, preencher os campos abaixo e comunicar imediatamente seu gestor ou o SHE."]]

        autoTable(this.doc,{
            head: header,
            margin: { left: 50, right: 50, top: 100},
            columnStyles: {
                0: { cellWidth: this.availableWidth * 1}
            },
            styles: {
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                fontSize: 55,
                halign: "center",
                valign: "middle",
                tableWidth: "wrap",
                cellPadding: 10,
            },
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
        })
    }

    #setDescriptionField() {
        const header = [["N° Item N/C", "Data", "Descrição", "Responsável pela inspeção"]];

        autoTable(this.doc, {
            head: header,
            body: this.descriptionFields,
            margin: { left: 50, right: 50 },
            columnStyles: {
                0: { cellWidth: this.availableWidth * 0.228},
                1: { cellWidth: this.availableWidth * 0.2284},
                2: { cellWidth: this.availableWidth * 0.3152},
                3: { cellWidth: this.availableWidth * 0.2284}
            },
            styles: {
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                fontSize: 55,
                halign: "center",
                valign: "middle",
                tableWidth: "wrap",
                cellPadding: 10,
            },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontStyle: "bold",
            },
        });
    }

    generatePDF() {
        this.#setMargins_Top_Left_Right()
        this.#setInitialTextSize()
        this.#setHeader()
        this.#generateWarningText()
        this.#setControlHeader()
        this.#setControlInfos()
        this.#fillLegendWarning()
        this.#setCheckListFields()
        this.#setDescriptionWarning()
        this.#setDescriptionField()
        this.doc.save("EmbarqueReport.pdf")
    }
}
