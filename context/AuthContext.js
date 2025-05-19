import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("userDetails");
        console.log(user)
        if (user) {
          setUserDetails(JSON.parse(user));
        }
      } catch (e) {
        console.log("Error fetching userDetails:", e);
      }
    })();
  }, []);

    return (
        <AuthContext.Provider value={{userDetails, setUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
}