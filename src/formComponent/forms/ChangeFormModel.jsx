import avaria from '../../assets/texturas/avaria.png'
import embarque from '../../assets/texturas/embarque.png'
import seta from '../../assets/seta.png'
import '../../styles/formComponentStyles/changeFormModel.css'
import "../../styles/form.css"
import FormModel from '../components/changeFormComponents/FormModel'

export default function ChangeFormModel({setFormModel}) {
    
    return(
        <>
        <h1 className="title">O que você deseja registrar?</h1>

        <form>
            <FormModel 
                title={"Avaria"}
                description={"Usado para registrar não conformidades."}
                image={avaria}
                setFormModel={setFormModel}
            />
            <FormModel 
                title={"Embarque"}
                description={"Usado para registrar informações de embarques."}
                image={embarque}
                setFormModel={setFormModel}
            />
        </form>
        </>
    )
}