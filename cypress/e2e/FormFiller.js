export default class FormFiller {
    #visitHomePage(){
        cy.visit('http://127.0.0.1:5500/')
    }
    #checkFormPage(formModel){
        if(formModel === 'avaria'){
            cy.get('#relatorioDeAvaria').click()
        }else if(formModel === 'embarque'){
            cy.get('#relatorioDeEmbarque').click()
        }else{
            throw new Error("Modelo de formulário inválido. Use 'avaria' ou 'embarque'.");
        }
    }
    #fillNFidentifiersFields(){
        cy.get('#NFCaixaDeTexto').type('640981')
        cy.get('#AgrupadorCaixaDeTexto').type('566981')
    }

    #fillLocationFields(){
        cy.get('#EstadoCampoDeTexto').type('SP')
        cy.get('#CidadeCampoDeTexto').type('Taboão da Serra')
        cy.get('#ConcessionariaCampoDeTexto').type('BOX LTDA')
    }

    #fillProductFields(){
        cy.get('#PartNumberCampoDeTexto').type('FK89-1234')
        cy.get('#EmbalagemCampoDeTexto').type('Papelão')
        cy.get('#NaoVolumeAvariado').check()
    }

    #fillProblemField(){
        cy.get('#ProblemaCampoDeTexto').type('Caixa amassada')
    }

    #fillActionField(){
        cy.get('#TrocarEmbalagem').check()
    }

    #fillTransportFields(){
        cy.get('#TransportadoraCampoDeTexto').type('Moving XYZ')
        cy.get('#PlacaCampoDeTexto').type('SKMA-9098')
        cy.get('#DestinoCampoDeTexto').type('HUB-SP')
    }

    #fillDeparturetimeField(){
        cy.get('#HorarioCampoDeTexto').type('10:30')
    }

    #fillObsField(){
        cy.get('#CampoDeObs').type('A DHL fez birra na troca da embalagem, mas o produto chegou em bom estado.')
    }

    #clickDonwloadButton(){
        cy.get('#BotaoDeBaixar').click()
    }

    fillForm(formModel){
        this.#visitHomePage()
        this.#checkFormPage(formModel)
        this.#fillNFidentifiersFields()
        this.#fillLocationFields()
        this.#fillProductFields()
        this.#fillProblemField() 
        this.#fillActionField()
        this.#fillTransportFields()
        this.#fillDeparturetimeField()
        this.#fillObsField() 
    }
}