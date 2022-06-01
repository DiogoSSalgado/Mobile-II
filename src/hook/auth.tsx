import React, { createContext, useContext, useCallback, useState, useEffect,} from "react";
import { apiUser } from "../services/data/index";
import api from "../services/api";
import { IAuthState, IAuthContextData } from "../interfaces/User.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const[auth, setAuth] = useState<IAuthState>({} as IAuthState);

    const SignIn = useCallback(async ({email, password}) => {
        const response = await apiUser.login({
            email,
            password,
        });
        const {access_token, user} = response.data.data;
        api.defaults.headers.common.Authorization =   `Bearer ${access_token} `;
        setAuth({access_token, user});

        await AsyncStorage.setItem("acess_token", access_token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
    }, []);

    const register = useCallback(async ({ name, email, password }) => {
        const response = await apiUser.register({
            name,
            email,
            password,
        });
        const { access_token, user } = response.data.data;
        api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        setAuth({ access_token, user });

        await AsyncStorage.setItem("acess_token", access_token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
    }, []);
    
    const removeLocalStorage = async () => {
        await AsyncStorage.removeItem("acess_token");
        await AsyncStorage.removeItem("user");
    };

    const SignOut = useCallback(async () => {
        setAuth({} as IAuthState);
        removeLocalStorage();
        delete api.defaults.headers.common.authorization;
        await apiUser.logout();
    }, []);

    const LoadUserStorageData = useCallback(async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const user = await AsyncStorage.getItem("user");

        if (access_token && user){
            api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
            setAuth({access_token, user: JSON.parse(user) });
        }
    }, []);

    useEffect(()=> {
        LoadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                SignIn,
                SignOut,
                register,
                access_token: auth?.access_token,
                user: auth?.user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): IAuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuhtProvider");
    }

    return context;
}
export {AuthProvider, useAuth};