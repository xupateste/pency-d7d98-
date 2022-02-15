import React from "react";

import {useToast} from "../hooks/toast";

import {User, Context, State, Actions} from "./types";
import api from "./api/client";
import AuthScreen from "./screens/Auth";

import {useTenant} from "~/tenant/hooks";
import LoadingScreen from "~/app/screens/Loading";

const SessionContext = React.createContext({} as Context);

const SessionProvider: React.FC = ({children}) => {
  const toast = useToast();
  const {id, ...tenant} = useTenant();
  const [user, setUser] = React.useState<User | null>(null);
  const [isRestoring, toggleRestoring] = React.useState<boolean>(true);

  function signOut() {
    toggleRestoring(true);

    api
      .signOut()
      .then(() =>
        toast({
          title: "Sesión cerrada",
          description: `Chau! 👋`,
          status: "success",
        }),
      )
      .catch(() => {
        toast({
          title: "Error",
          description: "No se pudo cerrar la sesión",
          status: "error",
        });

        toggleRestoring(false);
      });
  }

  const actions: Actions = {signOut};
  const state: State = {user};

  React.useEffect(
    () =>
      api.onChange((user) => {
        if (user) {
          if (user.uid === id) {
            user.getIdToken().then((token) => {
              window.localStorage.setItem("token", token);

              setUser(user);

              toast({
                title: "Inicio de sesión correcto",
                description: `Hola ${user.email}! 👋`,
                status: "success",
              });

              toggleRestoring(false);
            });
          } else {
            window.localStorage.removeItem("token");

            api.signOut();

            toast({
              title: "Error",
              description: "El usuario no corresponde a la tienda",
              status: "error",
            });

            return toggleRestoring(false);
          }
        } else {
          window.localStorage.removeItem("token");

          setUser(user);

          return toggleRestoring(false);
        }
      }),
    [toast, id],
  );

  if (isRestoring) return <LoadingScreen color="primary" />;
  if (!user) return <AuthScreen tenant={tenant} />;

  return <SessionContext.Provider value={{state, actions}}>{children}</SessionContext.Provider>;
};

export {SessionProvider as Provider, SessionContext as default};
