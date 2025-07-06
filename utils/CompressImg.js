class ImageCompressor {
  #compressionOptions

  constructor(options = {}) {
    this.#compressionOptions = {
      maxSizeMB: options.maxSizeMB || 1,
      maxWidthOrHeight: options.maxWidthOrHeight || 1920,
      alwaysKeepResolution: false,
      useWebWorker: true,
      initialQuality: 0.7
    }
  }

  async getBase64(imageFile) {
    try {
      const compressedFile = await imageCompression(imageFile, this.#compressionOptions)
      const base64 = await this.#convertToBase64(compressedFile)
      return base64
    } catch (error) {
      console.error('Erro ao preparar a imagem:', error)
      throw error
    }
  }

  #convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
}
