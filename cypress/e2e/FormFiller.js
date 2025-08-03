export default class FormFiller {
    #visitHomePage(){
        cy.visit('http://127.0.0.1:5500/')
    }
    #checkFormPage(formModel){
        if(formModel === 'avaria'){
            const avariaForm = new FillAvariaForm()
            avariaForm.choseAvariaForm()
            avariaForm.fillForm()
        }else if(formModel === 'embarque'){
            const embarqueForm = new FillEmbarqueForm()
            embarqueForm.choseEmbarqueForm()
            embarqueForm.fillForm()
        }else{
            throw new Error("Modelo de formulário inválido. Use 'avaria' ou 'embarque'.");
        }
    }

    fill(formModel){
        this.#visitHomePage()
        this.#checkFormPage(formModel)
    }
}

class FillAvariaForm {

    choseAvariaForm(){
        cy.get('#relatorioDeAvaria').click()
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

    fillForm(){
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

class FillEmbarqueForm {

    choseEmbarqueForm(){
        cy.get('#relatorioDeEmbarque').click()
    }

    #fillDocaField(){
        cy.get('#DocaCaixaDeTexto').type('Doca 1')
    }

    #fillPlacaField(){
        cy.get('#PlacaCaixaDeTexto').type('ABC-1234')
    }

    #fillChaveDoVeiculoField(){
        cy.get('#SimChaveRecolhida').check()
    }

    #fillCalcoDeSegurancaField(){
        cy.get('#NaoCalcoDeSeguranca').check()
    }

    #fillDocaLimpaField(){
        cy.get('#NaoDocaLimpa').check()
    }

    #fillPlataformaField(){
        cy.get('#SimPlataforma').check()
    }

    #fillTravaField(){
        cy.get('#SimTrava').check()
    }

    #fillGuardaCorpoFixoField(){
        cy.get('#SimGuardaCorpoFixo').check()
    }

    #fillGuardaCorpoLateralField(){
        cy.get('#SimGuardaCorpoLateral').check()
    }

    #fillVeiculoBomEstadoField(){
        cy.get('#SimVeiculoBomEstado').check()
    }

    #fillDockLightField(){
        cy.get('#SimDockLight').check()
    }

    #fillCavaleteSaiderField(){
        cy.get('#SimCavaleteSaider').check()
    }

    #fillVeiculoSaiderField(){
        cy.get('#SimVeiculoSaider').check()
    }

    #fillVeiculo01eixoField(){
        cy.get('#SimVeiculo01eixo').check()
    }

    #fillObsField(){
        cy.get('#CampoDeObs').type('Tudo certo com a doca.')
    }

    fillForm(){
        this.#fillDocaField()
        this.#fillPlacaField()
        this.#fillChaveDoVeiculoField()
        this.#fillCalcoDeSegurancaField()
        this.#fillDocaLimpaField()
        this.#fillPlataformaField()
        this.#fillTravaField()
        this.#fillGuardaCorpoFixoField()
        this.#fillGuardaCorpoLateralField()
        this.#fillVeiculoBomEstadoField()
        this.#fillDockLightField()
        this.#fillCavaleteSaiderField()
        this.#fillVeiculoSaiderField()
        this.#fillVeiculo01eixoField()
        this.#fillObsField() 
    }
}