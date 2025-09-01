import { useState } from "react"

export default function ObsQuestion(props) {
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
        if (props.onChange) {
            props.onChange(e.target.value)
        }
    }

    return (
        <label 
            htmlFor={props.title + "Question"} 
            id={props.title + "Question"} 
            className="QuestionBox"
        >
            <span className="Question">{props.title}</span>

            <div className="CentralizeFlexAlternatives">
                <div className="GroupOptions ObsGroup">
                    <textarea
                        id="ObsField"
                        placeholder={props.title + "..."}
                        maxLength="579"
                        value={value}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </label>
    )
}
