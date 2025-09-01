import Swal from "sweetalert2";
class Validate {
  constructor(Obj){
    this.formData = Obj
    this.requiredFields = ["NF","Agrupador","Local","PartNumber","Embalagem","Problema","AcaoTomada","PecaAvariada","Transportadora","Placa","Destino","HorarioDeSaida"]
  }


  checkTextField() {
    for (const key of this.requiredFields) {
      const value = this.formData[key];
      if (value === undefined || value === "") {
        this.#showAlert(key)
        throw new Error("Todos os campos devem ser preenchidos!")
      }
    }
  }


 #showAlert(props){
    Swal.fire({
      title: "Ops!",
      html: `O preenchimento do campo de <span style="font-weight: bold;">${props}</span> é obrigatório!`,
      icon: "error"
  })
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

        return {
          date: `${day}/${month}/${year}`,
          time: `${hour}:${minute}`
        }
    }
}

export {Validate, CurrentDate}