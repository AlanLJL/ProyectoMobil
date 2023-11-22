import { Injectable } from '@angular/core';
import {Camera,CameraPhoto ,CameraResultType , CameraSource ,Photo } from '@capacitor/camera'
import { Filesystem , Directory} from '@capacitor/filesystem'
import { Storage } from '@ionic/storage-angular'
import { Foto} from 'src/app/models/foto.interface'


@Injectable({
  providedIn: 'root'
})

export class FotoService {
  public fotos: Foto [] = [];
  private PHOTO_STORAGE: string = 'fotos'


  constructor(private storage:Storage) { }

  public async NuevaImagenGaleria()
  {
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })

    const savedImageFile = await this.savePicture(fotoCapturada)
    this.fotos.unshift(savedImageFile)

    this.storage.set(
      this.PHOTO_STORAGE,
      JSON.stringify(this.fotos)
    );

  }
  public async savePicture(cameraPhoto: CameraPhoto){
    const base64Data = await this.readAsBase64(cameraPhoto)

    const fileName = new Date().getTime + 'jpeg';
    const saveFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })
    return{
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    }
  }
  public async readAsBase64(cameraPhoto: CameraPhoto){
    const response = await fetch(cameraPhoto.webPath!)
    const blob = await response.blob()

    return await this.convertBlobToBase64(blob) as string
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve,reject) =>{
    const reader = new FileReader
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })

  public async loadSaved() {
    const listaFoto = await this.storage.get(this.PHOTO_STORAGE)
    this.fotos = JSON.parse(listaFoto.value)|| []

    for(let foto of this.fotos){
      // lectura de las fotos almacenadas
      const readFile = await Filesystem.readFile({
        path: foto.filepath,
        directory: Directory.Data
      })

      // solo para la web
      foto.webviewPath = `data:image/jpeg;base64,${readFile.data}`
    }
  }




}
