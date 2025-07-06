class ImageManager {
    #inputElement
    #containerElement
    #maxImages
    #imageList = []

    constructor(inputElement, containerElement, maxImages = 3) {
        this.#inputElement = inputElement
        this.#containerElement = containerElement
        this.#maxImages = maxImages
    }

    getImageList() {
        return this.#imageList
    }

    appendFromInput() {
        if (!this.#canAddMoreImages()) {
            this.#showLimitReachedAlert()
            return false
        }
        this.#addFilesFromInput()
        this.#render()
        return true
    }

    #render() {
        this.#clearContainer()
        return this.#renderImages()
    }

    deleteSelectedImages() {
        const imgContainers = Array.from(this.#containerElement.getElementsByClassName("imgContainer"))
        let anyDeleted = false

        for (let i = imgContainers.length - 1; i >= 0; i--) {
            const container = imgContainers[i]
            const checkbox = container.querySelector("input[type='checkbox']")
            if (checkbox && checkbox.checked) {
                this.#imageList.splice(i, 1)
                this.#containerElement.removeChild(container)
                anyDeleted = true
            }
        }

        if (anyDeleted) {
            this.#inputElement.value = ""
        } else {
            Swal.fire({
                title: 'Ops!',
                text: 'Você esqueceu de selecionar uma imagem!',
                icon: 'error'
            })
        }
    }

    #canAddMoreImages() {
        return this.#imageList.length + this.#inputElement.files.length <= this.#maxImages
    }

    #showLimitReachedAlert() {
        Swal.fire({
            title: 'Oops!',
            text: `You can only add up to ${this.#maxImages} images!`,
            icon: 'error'
        })
    }

    #addFilesFromInput() {
        for (let file of this.#inputElement.files) {
            this.#imageList.push(file)
        }
    }

    #clearContainer() {
        while (this.#containerElement.firstChild) {
            this.#containerElement.removeChild(this.#containerElement.firstChild)
        }
    }

    #createDeleteCheckbox() {
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.className = "CheckBoxDeDeletar"
        return checkbox
    }

    #renderImages() {
        const promises = this.#imageList.map(file => {
            return new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = () => {
                    const dataURL = reader.result

                    const imgContainer = document.createElement("div")
                    imgContainer.className = "imgContainer"

                    const img = document.createElement("img")
                    img.className = "ImagensAnexadas"
                    img.src = dataURL
                    img.title = "Foto da embalagem"
                    file.imgURL = img.src

                    const checkbox = this.#createDeleteCheckbox()
                    imgContainer.appendChild(checkbox)
                    imgContainer.appendChild(img)

                    this.#containerElement.appendChild(imgContainer)

                    resolve(file)
                }
                reader.readAsDataURL(file)
            })
        })

        return Promise.all(promises)
    }
}
