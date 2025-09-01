import "../../../styles/formComponentStyles/attachPhoto.css"
import ImageManager from "../../../utils/ImageManager.js"
import { useEffect, useRef } from "react"

export default function AttachPhoto({ setImageList}) {
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const imageManagerRef = useRef(null)

  useEffect(() => {
    imageManagerRef.current = new ImageManager(inputRef.current, containerRef.current)
  }, [])

    function handleFiles(event) {
    const files = Array.from(event.target.files)

    setImageList(prev => {
        const newList = [...prev, ...files]

        if (imageManagerRef.current) {
            imageManagerRef.current.renderFromList(newList)
        }

        return newList
    })

    event.target.value = null
    }

    function deleteSelectedImg() {
        const deletedFiles = imageManagerRef.current.deleteSelectedImages()

        setImageList(deletedFiles)
    }

    return(
        <label htmlFor="FileQuestion" id="FileQuestion" className="QuestionBox">
            <span className="Question">Anexar foto</span>
                    <button className="DeleteImgButton" id="DeleteImgButton" onClick={() => {deleteSelectedImg()}}>
                        <img src="src\assets\trash-can.png" alt=""></img>
                    </button>

                    <button className="AttachPhotoButton" id="AttachPhotoButton">
                        <p>Anexar foto</p>
                        <input className="AttachFileInput" id="AttachFileInput" type="file" accept="image/*" name="AttachFileInput" multiple ref={inputRef} onChange={ handleFiles}></input>
                    </button>

                    <div className="CentralizeImgsFlex" id="CentralizeImgsFlex" ref={containerRef}>
                    </div>
        </label>
    )
}