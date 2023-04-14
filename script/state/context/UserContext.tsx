"use client";

// export default function ({children}:any) {
//     return <>
//         {children}
//     </>
// }
export interface ILoginForm {
  email?: string;
  password?: string;
}

export interface IUser {
  email: string;
  name: string;
}

// export const ACCESS_TOKEN = "access_token";
// export const IS_LOGIN = "isLogin";



import { useRouter } from "next/router";
// import { parseCookies, setCookie } from "nookies";
import { createContext, FC, useContext, useEffect, useState } from "react";
// import { ILoginForm, IUser } from "../../constant/auth";
import User from "../service/User";
// import useSWR from "swr";

// import { ACCESS_TOKEN, IS_LOGIN } from "@/constants/auth";
// import { ILoginForm, IUser } from "@/models/user";
// import API from "@/service/instance";

interface IAuthContext {
  jwt: string | undefined;
  user: IUser | undefined;
  login: (body: ILoginForm) => Promise<void>;
  demo: () => Promise<void>;
//   logout: () => void;
}

export const Auth = createContext<IAuthContext | null>(null);

interface IProps {
  session: {
    user: IUser;
    jwt: string;
  };  
  children: JSX.Element;
}

const AuthProvider: FC<IProps> = (props) => {
  const { session: session, children } = props;
//   const cookies = parseCookies();
//   const router = useRouter();

  const [user, setUser] = useState<IUser | undefined>(session.user);
  
  const [userInfo, s__userInfo] = useState<IUser>(session.user)
//   const { data: userInfo } = useSWR<IUser>(
//     cookies?.access_token ? `/user` : null,
//   );

  useEffect(() => {
    console.log("setUser",userInfo)
    setUser(userInfo);
  }, [userInfo]);

  const demo = async () => {
    try {
        const login = await User.demo()
        console.log("demo login user attempt", login, )
        if (!login) {
            return null
        }
        
        s__userInfo({email:login.user.email,name:login.user.full_name,})
        return login;
      } catch (error: any) {
        console.error(error);
        return error.response;
      } finally {
        console.log("Finally Login");
      }
  }
  const login = async (body: ILoginForm) => {
    try {
        const login = await User.login(body)
        console.log("login user attempt", login, body)
        if (!login) {
            return null
        }
        
        s__userInfo({email:login.user.email,name:login.user.full_name,})
        return login;
      } catch (error: any) {
        console.error(error);
        return error.response;
      } finally {
        console.log("Finally Login");
      }
    };

  return (
    <Auth.Provider
      value={{
        jwt: session.jwt,
        login,
        demo,
        // logout,
        user,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth) as IAuthContext;

export default AuthProvider;


//   const logout = () => {
//     try {
//       document.cookie =
//         ACCESS_TOKEN + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//       document.cookie =
//         IS_LOGIN + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//       router.push("/login");
//     } finally {
//       console.log("Logout Finally");
//     }
//   };