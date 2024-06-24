import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import "./ExploreContainer.css";
import "./LoginComponent.css"; // Import the CSS file
import loginImage from "../assets/images/log1.jpg"; // Import the image

const LoginComponent: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState(""); // Estado para almacenar el rol
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory();

  const { signin } = useAuth();

  const handleLogin = async () => {
  try {
    const res = await signin({ ct_correo: correo, ct_clave: contraseña, ct_puesto: rol });
    if (res.status === 200) {
      setToastMessage(res.data.message);
      setShowToast(true);
      setTimeout(() => {
        history.push("/home");
      }, 700);
    }
  } catch (error) {
    setToastMessage(
      "Error al ingresar a su cuenta, verifique que los datos sean correctos"
    );
    setShowToast(true);
  }
};


  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleEmailBlur = () => {
    setIsEmailValid(validateEmail(correo));
  };

  const handleEmailInput = (e: CustomEvent) => {
    const email = e.detail.value!;
    setCorreo(email);
    setIsFormValid(email && contraseña && validateEmail(email));
  };

  const handlePasswordInput = (e: CustomEvent) => {
    const password = e.detail.value!;
    setContraseña(password);
    setIsFormValid(correo && password && validateEmail(correo));
  };

  const handleRolChange = (e: CustomEvent) => {
    const puesto = e.detail.value!;
    setRol(puesto);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <div className="login-container">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol size-md="6" size-lg="4" size-sm="8" size-xs="10">
                <IonCard className="login-card custom-bg-color">
                  <IonCardHeader className="ion-text-center">
                    <img
                      src={loginImage}
                      alt="Login Image"
                      className="login-image"
                      style={{ borderRadius: "10px" }}
                    />
                    <IonCardTitle style={{ color: "green" }}>
                      Iniciar Sesión
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <form>
                      <IonItem className="margin-bottom">
                        <IonLabel position="stacked">Correo</IonLabel>
                        <IonInput
                          type="email"
                          placeholder="correo"
                          value={correo}
                          onIonInput={handleEmailInput}
                          onBlur={handleEmailBlur}
                          style={{
                            fontSize: "14px",
                            padding: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          <IonIcon
                            slot="start"
                            icon={mailOutline}
                            className="input-icon"
                          />
                        </IonInput>
                      </IonItem>
                      {!isEmailValid && (
                        <IonLabel color="danger" className="error-message">
                          Ingrese un correo válido
                        </IonLabel>
                      )}
                      <IonItem>
                        <IonLabel position="stacked">Contraseña</IonLabel>
                        <IonInput
                          type="password"
                          placeholder="contraseña"
                          value={contraseña}
                          onIonInput={handlePasswordInput}
                          style={{
                            fontSize: "14px",
                            padding: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          <IonIcon
                            slot="start"
                            icon={lockClosedOutline}
                            className="input-icon"
                          />
                        </IonInput>
                      </IonItem>
                      <IonItem className="margin-bottom">
                        <IonLabel position="stacked">Rol</IonLabel>
                        <IonSelect
                          placeholder="Seleccione un rol"
                          value={rol}
                          onIonChange={handleRolChange}
                          interface="popover"
                          style={{
                            fontSize: "14px",
                            padding: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          <IonSelectOption value="usuario">Usuario</IonSelectOption>
                          <IonSelectOption value="admin">Administrador</IonSelectOption>
                          <IonSelectOption value="supervisor">Supervisor</IonSelectOption>
                          <IonSelectOption value="tecnico">Técnico</IonSelectOption>
                          <IonSelectOption value="encargado">Encargado</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                      <IonButton
                        expand="block"
                        color="success"
                        className="ion-margin-top"
                        onClick={handleLogin}
                        disabled={!isFormValid}
                      >
                        Entrar
                      </IonButton>
                      <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message={toastMessage}
                        duration={4000}
                        color={
                          toastMessage.includes("Error") ? "danger" : "success"
                        }
                        cssClass="custom-toast"
                      />
                    </form>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginComponent;
