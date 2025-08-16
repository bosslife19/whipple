import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [userDetails, setUserDetails] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [userPoint, setUserPoint] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("userDetails");
        if (user) {
          setUserDetails(JSON.parse(user));
        }

        const balance = await AsyncStorage.getItem("userBalance");
        if (balance) {
          setUserBalance(parseFloat(balance));
        }

        const point = await AsyncStorage.getItem("userPoint");
        if (point) {
          setUserPoint(parseFloat(point));
        }
      } catch (e) {
        console.log("Error fetching userDetails:", e);
      }
    })();
  }, []);

    return (
        <AuthContext.Provider value={{
          userDetails, setUserDetails, setUserBalance, userBalance, setUserPoint, userPoint
          }}>
            {children}
        </AuthContext.Provider>
    )
}