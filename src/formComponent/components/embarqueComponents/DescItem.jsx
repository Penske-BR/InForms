export default function DescItem({ value, onChange }) {
  const handleChange = (field, newValue) => {
    if (onChange) onChange(field, newValue)
  }

  return (
    <div className="centralizarDescFlex">
      <input
        type="checkbox"
        className="CheckBoxDeDeletar"
        checked={value.checked}
        onChange={(e) => handleChange("checked", e.target.checked)}
      />
      <input
        type="number"
        className="TextDesc"
        placeholder="Nº item N/C..."
        value={value.numero}
        onChange={(e) => handleChange("numero", e.target.value)}
      />
      <input
        type="text"
        className="TextDesc"
        placeholder="Descrição..."
        value={value.descricao}
        onChange={(e) => handleChange("descricao", e.target.value)}
      />
      <input
        type="text"
        className="TextDesc"
        placeholder="Responsável..."
        value={value.responsavel}
        onChange={(e) => handleChange("responsavel", e.target.value)}
      />
    </div>
  )
}
