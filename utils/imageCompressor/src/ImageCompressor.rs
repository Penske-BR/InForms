use image::{DynamicImage, ImageOutputFormat::Jpeg, io::Reader as ImageReader};
use base64::{engine::general_purpose, Engine as _};
use std::io::Cursor;

pub struct ImageCompressor {
    image: DynamicImage,
}

impl ImageCompressor {
    /// Lê a imagem do buffer e cria uma nova instância do compressor
    pub fn from_bytes(input: &[u8]) -> Result<Self, String> {
        let img = ImageReader::new(Cursor::new(input))
            .with_guessed_format()
            .map_err(|e| format!("Erro ao detectar formato: {}", e))?
            .decode()
            .map_err(|e| format!("Erro ao decodificar imagem: {}", e))?;

        Ok(Self { image: img })
    }

    /// Comprime a imagem para JPEG com a qualidade definida
    pub fn compress_to_jpeg(&self, quality: u8) -> Result<Vec<u8>, String> {
        let mut buffer = Vec::new();
        self.image
            .write_to(&mut buffer, Jpeg(quality))
            .map_err(|e| format!("Erro ao comprimir imagem: {}", e))?;

        Ok(buffer)
    }

    /// Comprime e retorna como string base64 com prefixo data URI
    pub fn compress_to_base64(&self, quality: u8) -> Result<String, String> {
        let compressed = self.compress_to_jpeg(quality)?;
        let encoded = general_purpose::STANDARD.encode(compressed);
        Ok(format!("data:image/jpeg;base64,{}", encoded))
    }
}
