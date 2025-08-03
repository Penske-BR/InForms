const centralizarDesc = document.getElementById("centralizarDesc")

class ManagerDescComponent {
    #getFields() {
        const descGroup = document.createElement("div")
        const checkboxDeletar = document.createElement("input")
        const nItemDesc = document.createElement("input")
        const descricao = document.createElement("input")
        const responsavel = document.createElement("input")

        return { descGroup, checkboxDeletar, nItemDesc, descricao, responsavel }
    }

    #settingProps({ descGroup, checkboxDeletar, nItemDesc, descricao, responsavel }) {
        descGroup.className = "centralizarDescFlex"
        checkboxDeletar.className = "CheckBoxDeDeletar"
        nItemDesc.className = "TextDesc"
        descricao.className = "TextDesc"
        responsavel.className = "TextDesc"

        checkboxDeletar.type = "checkbox"
        nItemDesc.type = "number"
        nItemDesc.placeholder = "Nº item N/C..."
        descricao.placeholder = "Descrição..."
        responsavel.placeholder = "Responsável..."

        checkboxDeletar.name = "checkboxDeletar"
        nItemDesc.name = "NdoItem"
        descricao.name = "Descrição"
        responsavel.name = "Responsável pela inspeção"
    }

    add() {
        const fields = this.#getFields()
        this.#settingProps(fields)

        const { descGroup, checkboxDeletar, nItemDesc, descricao, responsavel } = fields

        descGroup.appendChild(checkboxDeletar)
        descGroup.appendChild(nItemDesc)
        descGroup.appendChild(descricao)
        descGroup.appendChild(responsavel)

        centralizarDesc.appendChild(descGroup)
    }

    deleteChecked() {
        const checkboxes = centralizarDesc.querySelectorAll(".CheckBoxDeDeletar")
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const grupo = checkbox.closest(".centralizarDescFlex")
                if (grupo) {
                    grupo.remove()
                }
            }
        })
    }
}
