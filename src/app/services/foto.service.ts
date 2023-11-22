import { Injectable } from '@angular/core';
import {Camera, CameraResultType , CameraSource ,Photo } from '@capacitor/camera'
import { Filesystem , Directory} from '@capacitor/filesystem'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor() { }

  public async NuevaImagenGaleria()
  {
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
  }
}
