const { fileUpload } = require("../../helpers/fileUpload")
import cloudinary from 'cloudinary'
//usa del dashboard 
cloudinary.config({ 
    cloud_name: 'dvcd2pqo6', 
    api_key: '633164388672796', 
    api_secret: 'CDKdWP4WA07kYs-63P1g2cKRUTM' 
  });


describe('Pruebas a FileUpload', () => {
    test('debe cargar un archivo y retornar url', async (done) => {
        //subida de una imagen
        const resp= await fetch('https://static.vecteezy.com/system/resources/thumbnails/000/246/312/original/mountain-lake-sunset-landscape-first-person-view.jpg')
        const blob= await resp.blob();
        const file= new File([blob],'foto.png')
        //llamada de la funcion
        const url= await fileUpload(file)
        expect(typeof url).toBe('string')//comprobamos que se haya subido
   
        //id de la imagen
        const segments=url.split('/');//para cortar es el split
        const id= segments[segments.length-1].replace('.jpg','')//utima posicion y le quito el .png
        
        //borrando imagenes que se usaron de prueba npm install cloudinary --save-dev 
        cloudinary.v2.api.delete_resources(id, {}, ()=>{
            done();//done para que espere a eliminarse
        });

    })
    test('debe retornar un error', async () => {
        const file= new File([],'foto.png')
        const url= await fileUpload(file)
        expect(url).toBe(null)//en el codigo puse que si hay un error sea null
    })
})
