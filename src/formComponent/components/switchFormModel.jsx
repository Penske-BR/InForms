export default function SwitchFormModel({setFormModel}) {
    return(
        <button className="ChangeFormModelButton" onClick={() => setFormModel("")}><span>Voltar</span></button>
    )
}