class GeneratePDFLayout{
    setFileSize() {
        const jsPDF = window.jspdf.jsPDF;    
        var doc = new jsPDF({
            orientation: 'portrait',
            unit: "mm",
            format: [958, 1250]
        })
        return doc
    }

    constructor(){
        this.doc = this.setFileSize();
    }

    setInitialTextSize() {
        this.doc.setFontSize(40)
        this.doc.setFont("Helvetica","bold")
        this.doc.setLineWidth(2)
    }

    setMargins_Top_Left_Right_Bottom() {
        this.doc.line(50, 100, 908, 100)
        this.doc.line(50, 100, 50, 1100)
        this.doc.line(908, 100, 908, 1100)
        this.doc.line(50, 1100, 908, 1100)
    }

    setHeader() {
        this.doc.addImage(LogoPenske,"PNG", 75, 78, 120, 120)

        this.doc.setDrawColor(32, 79, 146)
        this.doc.setLineWidth(20)
        this.doc.line(50, 180, 908, 180)

        this.doc.setDrawColor(0,0,0)
        this.doc.setLineWidth(1)
        this.doc.line(220, 100, 220, 170)

        this.doc.text("Tipo de Documento: ", 225, 113)
        this.doc.text("FOR.NISS.OPE.01", 470, 133)
        this.doc.line(220, 135, 788, 135)
        this.doc.text("Título: ", 225, 148)
        this.doc.text("Relatório de Inspeção", 460, 168)

        this.doc.line(788, 100, 788, 170)
        this.doc.text("Revisão: 01", 810, 140)
    }

    setInfos(PDFReportObj) {
        this.doc.text(PDFReportObj.CurrentDate, 65, 225)
        this.doc.line(65, 229, 220, 229)
        this.doc.text("N° da NF:  " + PDFReportObj.NF, 700, 225)
        this.doc.line(770, 229, 908, 229)

        this.doc.text("Embalagem avariada:  " + PDFReportObj.Embalagem, 65, 280)
        this.doc.line(216, 282, 300, 282)
        this.doc.text("Peça avariada:  " + PDFReportObj.PecaAvariada, 400, 280)
        this.doc.line(504, 280, 600, 280)
        this.doc.text("Problema:  " + PDFReportObj.Problema, 680, 280)
        this.doc.line(756, 280, 908, 280)

        this.doc.text("Ação tomada:  " + PDFReportObj.AcaoTomada, 65, 335)
        this.doc.line(164, 335, 300, 335)
        this.doc.text("Transportadora:  " + PDFReportObj.Transportadora, 400, 335)
        this.doc.line(515, 335, 600, 335)
        this.doc.text("Placa:  " + PDFReportObj.Placa, 680, 335)
        this.doc.line(730, 335, 908, 335)

        this.doc.text("Horário de saída:  " + PDFReportObj.HorarioDeSaida, 65, 400)
        this.doc.line(188, 400, 240, 400)
        this.doc.text("Destino:  " + PDFReportObj.Destino, 400, 400)
        this.doc.line(458, 400, 600, 400)
    }

    createTable() {
        this.doc.setDrawColor(32, 79, 146)
        this.doc.setLineWidth(24)
        this.doc.line(50, 460, 908, 460)

        this.doc.setDrawColor(0,0,0)
        this.doc.setLineWidth(2)

        this.doc.line(50, 500, 908, 500)

        this.doc.line(165, 450, 165, 500)
        this.doc.line(370, 450, 370, 500)
        this.doc.line(625, 450, 625, 500)
        this.doc.line(750, 450, 750, 500)
    }

    setTableInfos(PDFReportObj) {
        this.doc.setTextColor(255, 255,  255)
        this.doc.text("Agrupador", 75, 465)
        this.doc.setTextColor(0,0,0)
        this.doc.text(PDFReportObj.Agrupador, 75, 490)

        this.doc.setTextColor(255, 255, 255)
        this.doc.text("Descrição do PartNumber", 190, 465)
        this.doc.setTextColor(0, 0, 0)
        this.doc.text(PDFReportObj.PartNumber, 190, 490)

        this.doc.setTextColor(255, 255, 255)
        this.doc.text("Nome da Concessionária", 400, 465)
        this.doc.setTextColor(0, 0, 0)
        this.doc.text(PDFReportObj.Concessionaria, 400, 490)

        this.doc.setTextColor(255, 255, 255)
        this.doc.text("Estado", 665, 465)
        this.doc.setTextColor(0, 0, 0)
        this.doc.text(PDFReportObj.Estado, 630, 490)

        this.doc.setTextColor(255, 255, 255)
        this.doc.text("Cidade", 785, 465)
        this.doc.setTextColor(0, 0, 0)
        this.doc.text(PDFReportObj.Cidade, 755, 490)
    }

    createImageField(ImagesList){
        this.doc.setDrawColor(32, 79, 146)
        this.doc.setLineWidth(24)
        this.doc.line(50, 570, 908, 570)
        this.doc.setTextColor(255,255,255)
        this.doc.text("Fotos do produto avariado", 400, 575)

        this.doc.setLineWidth(2)
        this.doc.setDrawColor(0,0,0)
        
        this.doc.addImage(ImagesList[0].imgURL, 60, 590, 260, 150)
        this.doc.line(370, 580, 370, 755)
        this.doc.addImage(ImagesList[1].imgURL, 420, 590, 260, 150)
        this.doc.line(730, 580, 730, 755)
        this.doc.addImage(ImagesList[2].imgURL, 775, 590, 120, 150)
        this.doc.line(50, 754, 908, 754)
    }

    createObsField() {
        this.doc.setTextColor(0,0,0)
        this.doc.text("OBS:", 60, 800)
        this.doc.line(100, 800, 854, 800)
        this.doc.line(100, 850, 854, 850)
        this.doc.line(100, 900, 854, 900)
        this.doc.line(100, 950, 854, 950)
        this.doc.line(100, 1000, 854, 1000)
        this.doc.line(100, 1050, 854, 1050)
    }

    setObsInfo(PDFReportObj){
        var width = 105;
        var height = 798;
        var maxWidth = 750;

        var lines = this.doc.splitTextToSize(PDFReportObj.Obs, maxWidth)

        for (var i = 0; i < lines.length; i++) {
            if (i > 0) {
                height = height + 50;
                width = 105;
            }
            this.doc.text(lines[i], width, height);
        }
    }
}