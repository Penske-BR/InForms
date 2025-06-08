class Validar {

  ValidarCampoDeTexto = (id) =>{
    const campo = document.getElementById(id)
    if(!campo.value){
        Swal.fire({
            title: "Ops!",
            html: `O preenchimento do campo de <span style="font-weight: bold;">${campo.name}</span> é obrigatório!`,
            icon: "error"
        })
        throw new Error("Campo inválido");
    }
    return campo.value
 }

  validarCheckBox = (id) => {
    const checkboxes = document.querySelectorAll(id)
  
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        return checkboxes[i].value
      }
    }
    Swal.fire({
        title: "Ops!",
        html: `O preenchimento do campo de <span style="font-weight: bold;">${checkboxes[0].name}</span> é obrigatório!`,
        icon: "error"
    })
    throw new Error("Nenhum checkbox foi marcado")
  }

  validarCampoDeOBS = () => {    
    if(document.getElementById("CampoDeObs").value != ""){
        var Obs = document.getElementById("CampoDeObs").value
        return Obs
    }else{
        var Obs = ""
        return Obs
    }
  }
}

class DataAtual {
    gerarDataAtual() {
        let DataAtual = new Date()
        let dia = String(DataAtual.getDate()).padStart(2, "0")
        let mes = String(DataAtual.getMonth() + 1).padStart(2, "0")
        let ano = DataAtual.getFullYear()
        let hora = String(DataAtual.getHours()).padStart(2, "0")
        let minuto = String(DataAtual.getMinutes()).padStart(2, "0")
        let DataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minuto}`
        return DataFormatada
    }
}