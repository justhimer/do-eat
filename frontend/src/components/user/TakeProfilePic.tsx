import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import { IonActionSheet, IonButton, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonRow } from '@ionic/react';
import { add } from 'ionicons/icons';
import UserStyle from '../../scss/User.module.scss';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';

export const TakeProfilePic = () => {

  const defaultPhotoPath = "./assets/user_image/default_user_icon.png";

  const { photo, takePhoto, choosePhoto, removePhoto } = usePhotoGallery();

  // const handleActionSheetDismiss = (data: any) => {

  //   console.log('yes');

  //   if (data) {

  //     const action = data.detail.data.action;

  //     if (action === 'take_photo') {
  //       takePhoto();
  //     } else if (action === 'choose_photo') {
  //       choosePhoto();
  //     }
  //   }
  // };

  // const takePhoto = async () => {
  //   const image = await Camera.getPhoto({
  //     resultType: CameraResultType.DataUrl,
  //     quality: 90,
  //   });

  //   setPhoto(image.dataUrl);
  // };



  return (
    <>
      {/* {photo && <IonImg src={photo} />} */}
      {/* <IonGrid>
        <IonRow className={UserStyle.image_container}>
          <IonCol size="6" >
            <img
              src={photo ? photo.webviewPath : ""}
              className={UserStyle.image_box} />
            <IonFab id="change_profile_pic" horizontal='end' vertical="top">
              <IonFabButton>
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
          </IonCol>
        </IonRow>
      </IonGrid> */}

      <div className={UserStyle.image_container}>
        <img
          src={photo ? photo.webviewPath : defaultPhotoPath}
          className={UserStyle.image_box}
          id="change_profile_pic" />
      </div>

      <IonActionSheet
        trigger="change_profile_pic"
        header="Actions"
        buttons={[
          {
            text: 'Take Photo',
            handler: () => takePhoto(),
          },
          {
            text: 'Choose from Album',
            handler: () => choosePhoto(),
          },
          {
            text: 'Remove Photo',
            handler: () => removePhoto(),
          },
          {
            text: 'Cancel',
            role: 'cancel',
            data: {
              action: 'cancel'
            }
          }
        ]}
      // onDidDismiss={handleActionSheetDismiss}
      ></IonActionSheet>

      {/* <IonButton onClick={takePhoto}>Take Photo</IonButton> */}
      {/* <IonButton onClick={choosePhoto}>Choose Photo</IonButton> */}
    </>
  );
};
