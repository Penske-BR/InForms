import { useState } from "react"
import "../../styles/form.css"
import SwitchFormModel from "../components/switchFormModel"
import TextQuestion from "../components/avariaComponents/TextQuestion"
import CheckBoxQuestion from "../components/avariaComponents/CheckBoxQuestion"
import DescriptionQuestion from "../components/embarqueComponents/DescriptionQuestion"
import DownloadButton from "../components/DownloadButton"
import EmbarquePDFRepport from "../../utils/PDFgenerator/EmbarquePDFRepport"
import { Validate } from "../../utils/utils"

export default function EmbarqueForm({setFormModel}) {
  const [formData, setFormData] = useState({
    doca: "",
    placa: "",
    responsavel: "",
    chaveRecolhida: "",
    calcoSeguranca: "",
    docaLimpaOrganizada: "",
    plataformaNiveladora: "",
    travaPortaDoca: "",
    guardaCorpoRampaNiveladora: "",
    guardaCorpoLateralDoca: "",
    veiculoBomEstado: "",
    iluminacaoDockLight: "",
    cavaletePlataforma: "",
    veiculoSaider: "",
    veiculoUmEixoCavaloAtrelado: "",
    campoDescricao: []
  })

  const updateFormValues = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      return updated
    })
  }

  function generatePDFfile(e) {
    e.preventDefault()
    const PDFgenerator = new EmbarquePDFRepport(formData)
    PDFgenerator.generatePDF()
  }

  return (
    <form>
      <SwitchFormModel setFormModel={setFormModel}/>
      <h1 className="title">Check List</h1>

      <TextQuestion 
        title={["Doca"]} 
        value={formData.doca} 
        onChange={val => updateFormValues("doca", val)} 
      />

      <TextQuestion 
        title={["Placa do veículo"]} 
        placeholder={"Placa"} 
        value={formData.placa} 
        onChange={val => updateFormValues("placa", val)} 
      />

      <TextQuestion 
        title={["Responsável pela inspeção"]} 
        placeholder={"Responsável"} 
        value={formData.responsavel} 
        onChange={val => updateFormValues("responsavel", val)} 
      />

      <CheckBoxQuestion 
        title={["Foi recolhido a chave do veículo?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.chaveRecolhida} 
        onChange={val => updateFormValues("chaveRecolhida", val)} 
      />

      <CheckBoxQuestion 
        title={["O veículo está utilizando calço de segurança?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.calcoSeguranca} 
        onChange={val => updateFormValues("calcoSeguranca", val)} 
      />

      <CheckBoxQuestion 
        title={["A doca está limpa e organizada?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.docaLimpaOrganizada} 
        onChange={val => updateFormValues("docaLimpaOrganizada", val)} 
      />

      <CheckBoxQuestion 
        title={["A plataforma niveladora está posicionada corretamente?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.plataformaNiveladora} 
        onChange={val => updateFormValues("plataformaNiveladora", val)} 
      />

      <CheckBoxQuestion 
        title={["Está sendo utilizada a trava da porta da doca?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.travaPortaDoca} 
        onChange={val => updateFormValues("travaPortaDoca", val)} 
      />

      <CheckBoxQuestion 
        title={["O guarda corpo fixo na rampa niveladora está em boas condições?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.guardaCorpoRampaNiveladora} 
        onChange={val => updateFormValues("guardaCorpoRampaNiveladora", val)} 
      />

      <CheckBoxQuestion 
        title={["O guarda corpo nas laterais da doca está em boas condições?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.guardaCorpoLateralDoca} 
        onChange={val => updateFormValues("guardaCorpoLateralDoca", val)} 
      />

      <CheckBoxQuestion 
        title={["Veículo em bom estado (porta, piso, cantos vivos, etc)?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.veiculoBomEstado} 
        onChange={val => updateFormValues("veiculoBomEstado", val)} 
      />

      <CheckBoxQuestion 
        title={["A iluminação (dock light) está funcionando?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.iluminacaoDockLight} 
        onChange={val => updateFormValues("iluminacaoDockLight", val)} 
      />

      <CheckBoxQuestion 
        title={["O cavalete da plataforma (descarregamento veículo saider) está em boas condições?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.cavaletePlataforma} 
        onChange={val => updateFormValues("cavaletePlataforma", val)} 
      />

      <CheckBoxQuestion 
        title={["O veículo saider possui as réguas de proteção lateral?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.veiculoSaider} 
        onChange={val => updateFormValues("veiculoSaider", val)} 
      />

      <CheckBoxQuestion 
        title={["O veículo com 01 (um) eixo está com o cavalo atrelado?"]} 
        checkBoxes={["C", "N/C", "N/A"]} 
        value={formData.veiculoUmEixoCavaloAtrelado} 
        onChange={val => updateFormValues("veiculoUmEixoCavaloAtrelado", val)} 
      />

      <DescriptionQuestion value={formData.campoDescricao} onChange={(val) => updateFormValues("campoDescricao", val)}/>

      <DownloadButton onSubmit={generatePDFfile} />
    </form>
  )
}
