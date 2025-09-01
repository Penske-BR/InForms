import { useState } from "react"
import "../../styles/form.css"
import SwitchFormModel from "../components/switchFormModel"
import TextQuestion from "../components/avariaComponents/TextQuestion"
import CheckBoxQuestion from "../components/avariaComponents/CheckBoxQuestion"
import DownloadButton from "../components/DownloadButton"
import ObsQuestion from "../components/avariaComponents/ObsQuestion"
import AttachPhoto from "../components/avariaComponents/AttachPhoto"
import AvariaPDF from "../../utils/PDFgenerator/AvariaPDF"
import { Validate } from "../../utils/utils"

export default function AvariaForm({setFormModel}) {
  const [formData, setFormData] = useState({
    NF:"",
    Agrupador:"",
    Local:"",
    PartNumber:"",
    Embalagem:"",
    Problema:"",
    AcaoTomada:"",
    PecaAvariada:"",
    Transportadora:"",
    Placa:"",
    Destino:"",
    HorarioDeSaida:"",
  })
  const [imageList, setImageList] = useState([])

  const updateFormValues = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      return updated
    })
  }

  function validateAll(obj){
    const validate = new Validate(obj)
    validate.checkTextField()
  }

  function generatePDFfile(e) {
    e.preventDefault()
    validateAll(formData)
    if(formData.Obs === undefined){
        formData.Obs = ""
    }
    const pdfGenerator = new AvariaPDF()
    pdfGenerator.GeneratePDFLayout(formData, imageList)
  }

  return (
    <form>
      <SwitchFormModel setFormModel={setFormModel}/>
      <h1 className="title">
        Relatório<br />
        não conformidades
      </h1>

      <TextQuestion title={["NF"]} value={formData.NF} onChange={(val) => updateFormValues("NF", val)} />
      <TextQuestion title={["Agrupador"]} value={formData.Agrupador} onChange={(val) => updateFormValues("Agrupador", val)} />
      <TextQuestion title={["Estado", "Cidade", "Concessionária."]} value={formData.Local} onChange={(val) => updateFormValues("Local", val)} />
      <TextQuestion title={["Part number"]} value={formData.PartNumber} onChange={(val) => updateFormValues("PartNumber", val)} />
      <TextQuestion title={["Material da embalagem"]} value={formData.Embalagem} onChange={(val) => updateFormValues("Embalagem", val)} />
      <TextQuestion title={["Descreva o Problema"]} value={formData.Problema} onChange={(val) => updateFormValues("Problema", val)} />

      <CheckBoxQuestion
        title={"Ação tomada"}
        checkBoxes={["Troca da embalagem", "Reparo da embalagem", "Seguiu danificada"]}
        value={formData.AcaoTomada}
        onChange={(val) => updateFormValues("AcaoTomada", val)}
      />

      <CheckBoxQuestion
        title={"Peça avariada"}
        checkBoxes={["Sim", "Não"]}
        value={formData.PecaAvariada}
        onChange={(val) => updateFormValues("PecaAvariada", val)}
      />

      <TextQuestion title={["Transportadora"]} value={formData.Transportadora} onChange={(val) => updateFormValues("Transportadora", val)} />
      <TextQuestion title={["Placa"]} value={formData.Placa} onChange={(val) => updateFormValues("Placa", val)} />
      <TextQuestion title={["Destino"]} value={formData.Destino} onChange={(val) => updateFormValues("Destino", val)} />
      <TextQuestion title={["Horário de saída"]} value={formData.HorarioDeSaida} onChange={(val) => updateFormValues("HorarioDeSaida", val)} />

      <ObsQuestion title={"Observação"} value={formData.Obs} onChange={(val) => updateFormValues("Obs", val)} />
      <AttachPhoto imageList={imageList} setImageList={setImageList} />

      <DownloadButton onSubmit={(e) => generatePDFfile(e)}/>
    </form>
  )
}