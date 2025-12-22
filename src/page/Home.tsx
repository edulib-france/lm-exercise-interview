import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton onClick={() => history.push("/profile")}>
          Go to Profile
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
