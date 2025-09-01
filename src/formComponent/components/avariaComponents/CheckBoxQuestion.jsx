export default function CheckBoxQuestion({title, checkBoxes, value, onChange}) {
    
    function handleChange(value) {
        if (onChange) {
            onChange(value)
        }
    }

    function renderCheckBoxes() {
        return checkBoxes.map((checkbox, index) => (
            <div className="GroupOptions" key={index}>
                <label htmlFor={checkbox.trim()}>
                    <input
                        className="checkboxs"
                        id={checkbox.trim()}
                        type="radio"
                        name={title} 
                        value={checkbox}
                        checked={value === checkbox}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    {checkbox}
                </label>
            </div>
        ))
    }

    return (
        <label htmlFor={title + "Question"} id={title + "Question"} className="QuestionBox">
            <span className="Question">{title}</span>

            <div className="CentralizeFlexAlternatives">
                {renderCheckBoxes()}
            </div>
        </label>
    )
}
