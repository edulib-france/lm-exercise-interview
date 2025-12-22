import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { mail, call, location } from "ionicons/icons";
import { PlatformInfo } from "../components/PlatformInfo";
import "./Profile.scss";

// Types
interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

// Mock data
const userProfile: UserProfile = {
  name: "Youssouf SOKHONA",
  role: "Senior Developer",
  email: "youssouf28.sok@gmail.com",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  avatar: "https://i.pravatar.cc/150?img=3",
};

export const Profile = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding profile-content">
        <IonCard className="profile-card">
          <IonCardHeader className="profile-header">
            <IonAvatar className="profile-avatar">
              <img src={userProfile.avatar} alt={userProfile.name} />
            </IonAvatar>
            <IonCardTitle>{userProfile.name}</IonCardTitle>
            <IonCardSubtitle>{userProfile.role}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList lines="none">
              <IonItem>
                <IonIcon icon={mail} slot="start" color="primary" />
                <IonLabel>{userProfile.email}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={call} slot="start" color="primary" />
                <IonLabel>{userProfile.phone}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={location} slot="start" color="primary" />
                <IonLabel>{userProfile.location}</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Platform Info Component */}
        <PlatformInfo />
      </IonContent>
    </IonPage>
  );
};
