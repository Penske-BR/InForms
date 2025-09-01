import "../../../styles/formComponentStyles/descriptionQuestion.css"
import "../../../styles/form.css"
import { useState, useRef } from "react"
import DescItem from "./DescItem"

export default function DescriptionQuestion({ onChange, value }) {
  const [descItems, setDescItems] = useState([])

  const centralizeDescRef = useRef(null);

  const addDescItem = () => {
    setDescItems([...descItems, { numero: "", descricao: "", responsavel: "", checked: false }])
  }

  const deleteDescItem = () => {
    setDescItems((prev) => prev.filter(item => !item.checked))
  }

  const handleChange = (index, field, newValue) => {
    const updated = [...descItems]
    updated[index] = { ...updated[index], [field]: newValue }
    setDescItems(updated)
    if (onChange) onChange(updated) // se estiver controlado pelo pai
  }

  return (
    <label htmlFor="QuestaoDesc" className="QuestionBox">
      <span>Descrição</span>
      <div id="CentralizeDesc" ref={centralizeDescRef}>
        {descItems.map((item, i) => (
          <DescItem
            key={i}
            index={i}
            value={item}
            onChange={(field, newValue) => handleChange(i, field, newValue)}
          />
        ))}
      </div>

      <button type="button" className="Button" id="botaoDeAdicionarDesc" onClick={addDescItem}>
        Adicionar Descrição
      </button>

      <button type="button" className="Button" id="botaoDeRemoverDesc" onClick={deleteDescItem}>
        Remover Descrição
      </button>
    </label>
  )
}
