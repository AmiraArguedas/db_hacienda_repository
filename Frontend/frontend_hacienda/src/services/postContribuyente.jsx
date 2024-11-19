import AWS from 'aws-sdk';
// Configura AWS S3 npm install aws-sdk
const S3_BUCKET = import.meta.env.VITE_S3_BUCKET; 
const REGION = import.meta.env.VITE_REGION; 
const s3 = new AWS.S3({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  region: REGION,
});

export const uploadImageToS3 = async (file) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name, 
      Body: file,
      ContentType: file.type,
      // ACL: 'public-read', // Se eliminó esta línea para evitar el error de ACL
    };
  
    return s3.upload(params).promise();
  };

async function postContribuyente(identificacion, primerNombre, primerApellido, segundoApellido) {
    const contribuyenteData = {
        identificacion,
        primerNombre,
        primerApellido,
        segundoApellido
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/consultar_contribuyente/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(contribuyenteData) 
        });

        if (!response.ok) {
            throw new Error('Error al guardar los datos del contribuyente');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error en el servicio:', error);
        throw error;  
    }
}

export default postContribuyente;

  