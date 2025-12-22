import { useEffect, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from "@ionic/react";
import {
  phoneLandscape,
  desktop,
  globe,
  logoApple,
  logoWindows,
  logoAndroid,
  informationCircle,
} from "ionicons/icons";
import {
  getPlatform,
  getOperatingSystem,
  type AppPlatform,
  type AppOperatingSystem,
} from "../utils/platform";
import "./PlatformInfo.scss";

// Types
interface PlatformData {
  platform: AppPlatform;
  operatingSystem: AppOperatingSystem;
}

interface PlatformConfig {
  icon: string;
  title: string;
  description: string;
  interaction: string;
  features: string[];
}

// Platform configurations
const platformConfigs: Record<AppPlatform, PlatformConfig> = {
  ios: {
    icon: logoApple,
    title: "iOS Mobile",
    description: "You're using an iPhone or iPad",
    interaction: "Tap to interact",
    features: ["Touch gestures", "Swipe navigation", "Haptic feedback"],
  },
  android: {
    icon: logoAndroid,
    title: "Android Mobile",
    description: "You're using an Android device",
    interaction: "Tap to interact",
    features: ["Touch gestures", "Back button navigation", "Material design"],
  },
  electron: {
    icon: desktop,
    title: "Desktop Application",
    description: "You're using the desktop app",
    interaction: "Click to interact",
    features: [
      "Keyboard shortcuts (Ctrl+C, Ctrl+V)",
      "Window management",
      "Offline support",
    ],
  },
  web: {
    icon: globe,
    title: "Web Browser",
    description: "You're using a web browser",
    interaction: "Click to interact",
    features: ["Bookmark support", "Tab navigation", "Cross-platform access"],
  },
};

const osIcons: Record<AppOperatingSystem, string> = {
  ios: logoApple,
  android: logoAndroid,
  mac: logoApple,
  windows: logoWindows,
  unknown: informationCircle,
};

export const PlatformInfo = () => {
  const [platformData, setPlatformData] = useState<PlatformData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlatformInfo = async () => {
      try {
        const [platform, operatingSystem] = await Promise.all([
          getPlatform(),
          getOperatingSystem(),
        ]);
        setPlatformData({ platform, operatingSystem });
      } catch (error) {
        console.error("Failed to load platform info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlatformInfo();
  }, []);

  if (loading) {
    return (
      <div className="platform-loading" data-testid="platform-loading">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (!platformData) {
    return null;
  }

  const config = platformConfigs[platformData.platform];
  const osIcon = osIcons[platformData.operatingSystem];

  return (
    <IonCard className="platform-info" data-testid="platform-info">
      <IonCardHeader>
        <IonCardTitle className="platform-title">
          <IonIcon icon={config.icon} className="platform-icon" />
          {config.title}
        </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p className="platform-description">{config.description}</p>

        <div className="platform-chips">
          <IonChip color="primary">
            <IonIcon icon={osIcon} />
            <IonLabel>OS: {platformData.operatingSystem}</IonLabel>
          </IonChip>
          <IonChip color="secondary">
            <IonIcon icon={phoneLandscape} />
            <IonLabel>{config.interaction}</IonLabel>
          </IonChip>
        </div>

        <IonList lines="none" className="platform-features">
          <IonItem>
            <IonLabel>
              <h3>Platform Features</h3>
            </IonLabel>
          </IonItem>
          {config.features.map((feature, index) => (
            <IonItem key={index}>
              <IonIcon icon={informationCircle} slot="start" color="medium" />
              <IonLabel>{feature}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
