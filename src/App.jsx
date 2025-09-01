import { useState } from "react"
import ChangeFormModel from "./formComponent/forms/ChangeFormModel"
import AvariaForm from "./formComponent/forms/AvariaForm"
import EmbarqueForm from "./formComponent/forms/EmbarqueForm"

export default function App() {
    const [formModel, setFormModel] = useState("")
    
    return(
        <>
            {formModel === "" && <ChangeFormModel setFormModel={setFormModel}/>}
            {formModel === "Avaria" && <AvariaForm setFormModel={setFormModel}/>}
            {formModel === "Embarque" && <EmbarqueForm setFormModel={setFormModel}/>}
        </>
    )
}