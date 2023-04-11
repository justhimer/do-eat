import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import { IonActionSheet, IonButton, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonRow } from '@ionic/react';
import { add } from 'ionicons/icons';
import UserStyle from '../../scss/User.module.scss';
import { usePhotoGallery, UserPhoto } from '../../hooks/usePhotoGallery';

export interface TakeProfilePicProps {
  photo?: UserPhoto;
}

export const TakeProfilePic = (props: TakeProfilePicProps) => {

  const defaultPhotoPath = "./assets/user_image/default_user_icon.png";

  return (
    <>

      <div className={UserStyle.image_container}>
        <img
          src={props.photo ? props.photo.webviewPath : defaultPhotoPath}
          className={UserStyle.image_box}
          id="change_profile_pic" />
      </div>

    </>
  );
};
