import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import * as Notifications from "expo-notifications";
  import { registerForPushNotificationsAsync } from "../utlils/registerForPushnotificationsAsync";
  
  // Define the context type
  interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null;
  }
  
  // Create the context
  const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
  );
  
  // Custom hook to access notification context
  export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
      throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
  };
  
  // Props for provider
  interface NotificationProviderProps {
    children: ReactNode;
  }
  
  // Provider component
  export const NotificationProvider: React.FC<NotificationProviderProps> = ({
    children,
  }) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] =
      useState<Notifications.Notification | null>(null);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      // Register for push notifications and get Expo push token
      registerForPushNotificationsAsync().then(
        (token) => setExpoPushToken(token),
        (err) => setError(err)
      );
  
      // Listen for notifications received while the app is running
      const notificationListener = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log("🔔 Notification received while running:", notification);
          setNotification(notification);
        }
      );
  
      // Listen for user interaction with notifications
      const responseListener = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(
            "🔔 Notification Response (user interacted):",
            JSON.stringify(response, null, 2)
          );
        }
      );
  
      // Cleanup on unmount — remove listeners
      return () => {
        notificationListener.remove();
        responseListener.remove();
      };
    }, []);
  
    return (
      <NotificationContext.Provider value={{ expoPushToken, notification, error }}>
        {children}
      </NotificationContext.Provider>
    );
  };
  