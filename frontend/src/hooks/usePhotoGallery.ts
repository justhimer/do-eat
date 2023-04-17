import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {

  const [photo, setPhoto] = useState<UserPhoto | undefined>(undefined);

  const takePhoto = async (): Promise<void> => {

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      // correctOrientation: false
    });

    const fileName = new Date().getTime() + '.jpeg';
    const newPhotos = {
      filepath: fileName,
      webviewPath: image.webPath,
    };

    setPhoto(newPhotos);
  };

  const choosePhoto = async (): Promise<void> => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 90,
    });

    const fileName = new Date().getTime() + '.jpeg';
    const newPhotos = {
      filepath: fileName,
      webviewPath: image.dataUrl,
    };

    setPhoto(newPhotos);
  };

  const removePhoto = async (): Promise<void> => {
    setPhoto(undefined);
  }

  return {
    photo,
    takePhoto,
    choosePhoto,
    removePhoto
  };
}