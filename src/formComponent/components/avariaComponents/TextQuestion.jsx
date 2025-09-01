export default function TextQuestion({ title, placeholder, value = [], onChange }) {
    const handleChange = (index, newValue) => {
        const updated = [...value]
        updated[index] = newValue
        onChange(updated)
    }

    function renderTextInputs() {
        return title.map((item, index) => (
            <div className="GroupOptions" key={index}>
                <input
                    className="Textbox"
                    id={item.trim() + "TextBox"}
                    type="text"
                    name={item.trim()}
                    placeholder={placeholder ? placeholder + "..." : item + "..."}
                    maxLength="15"
                    value={value[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                />
            </div>
        ))
    }

    return (
        <div id={title.join("-") + "Question"} className="QuestionBox">
            <span className="Question">{title.join(", ")}</span>

            <div className="CentralizeFlexAlternatives">
                {renderTextInputs()}
            </div>
        </div>
    )
}
