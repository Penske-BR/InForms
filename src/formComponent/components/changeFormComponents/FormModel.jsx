import seta from "../../../assets/seta.png"
export default function FormModel({title, description, image, setFormModel}) {
    
    return(
        <div className="FormModel">
            <div className="Centralize">
                    <div className="CentralizeImg">
                    <img src={image} alt=""></img>
                </div>
                
                <div className="CentralizeTxt">
                    <h2 className="FormName">{title}</h2>
                    <p>{description}</p>

                    <button type="button" onClick={() => setFormModel(title)}className="FormModelButton" id="Avaria">
                        <img src={seta} alt=""></img>
                    </button>
                </div>
            </div>
        </div>
    )
}