import { IonButton, IonIcon } from "@ionic/react";
import UserStyle from '../../scss/User.module.scss';
import { logoFacebook } from "ionicons/icons";

const onFacebookLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    const authURL = 'https://www.facebook.com/dialog/oauth'
    const search = new URLSearchParams()
    search.set('client_id', process.env.REACT_APP_FACEBOOK_APP_ID + "")
    search.set(
        'redirect_uri',
        `${window.location.origin}/facebook-callback`
    )
    search.set('response_type', 'code')
    search.set('state', '')
    search.set('scope', 'email,public_profile')
    window.location.href = `${authURL}?${search.toString()}`
}

export function FacebookLogin() {
    return (
        <IonButton onClick={onFacebookLogin} className={UserStyle.button}><IonIcon icon={logoFacebook}></IonIcon>Facebook Login</IonButton>
    )
}