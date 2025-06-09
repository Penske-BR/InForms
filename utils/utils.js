class Validate {

  checkTextField(id) {
    const field = document.getElementById(id)
    if(!field.value){
        Swal.fire({
            title: "Ops!",
            html: `O preenchimento do campo de <span style="font-weight: bold;">${field.name}</span> é obrigatório!`,
            icon: "error"
        })
        throw new Error("Campo inválido");
    }
    return field.value
 }

  checkCheckBoxField(id) {
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

  checkObsField () {    
    if(document.getElementById("CampoDeObs").value != ""){
        var Obs = document.getElementById("CampoDeObs").value
        return Obs
    }else{
        var Obs = ""
        return Obs
    }
  }
}

class CurrentDate {
    getCurrentDate() {
        let currentDate = new Date()
        let day = String(currentDate.getDate()).padStart(2, "0")
        let month = String(currentDate.getMonth() + 1).padStart(2, "0")
        let year = currentDate.getFullYear()
        let hour = String(currentDate.getHours()).padStart(2, "0")
        let minute = String(currentDate.getMinutes()).padStart(2, "0")
        let formattedDate = `${day}/${month}/${year} - ${hour}:${minute}`
        return formattedDate
    }
}