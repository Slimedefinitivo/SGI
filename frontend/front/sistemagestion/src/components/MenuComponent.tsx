import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonRouterLink,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { useAuth } from '../context/authContext';
import './MenuComponent.css';

function Menu() {
  const { getTokenPayload, logout } = useAuth();
  const data = getTokenPayload();

  // Definir los roles que tienen acceso a cada sección
  const rolesConAcceso = {
    formulario: ['usuario'],
    tareasListadas: ['tecnico'],
    tareasEncargado: ['encargado'],
    tareasSupervisor: ['supervisor'], // Añadir el acceso para supervisores
    reporteCargasTrabajo: ['admin'], // Añadir el acceso para admin
    

  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {rolesConAcceso.formulario.includes(data?.puesto) && (
              <IonItem>
                <IonRouterLink routerLink="/formulario">Formulario</IonRouterLink>
              </IonItem>
            )}
            {rolesConAcceso.tareasListadas.includes(data?.puesto) && (
              <IonItem>
                <IonRouterLink routerLink="/tareasListadas">Tareas Listadas</IonRouterLink>
              </IonItem>
            )}
            {rolesConAcceso.tareasEncargado.includes(data?.puesto) && (
              <IonItem>
                <IonRouterLink routerLink="/tareasEncargado">Tareas Encargado</IonRouterLink>
              </IonItem>
            )}  

             {rolesConAcceso.tareasSupervisor.includes(data?.puesto) && (
              <IonItem>
                <IonRouterLink routerLink="/tareasSupervisor">Tareas Supervisor</IonRouterLink>
              </IonItem>
            )} 

{rolesConAcceso.reporteCargasTrabajo.includes(data?.puesto) && (
              <IonItem>
                <IonRouterLink routerLink="/reporteCargasTrabajo">Reporte Cargas Trabajo</IonRouterLink>
              </IonItem>
            )}        
             
            <IonItem>
              <IonButton onClick={logout}>Logout</IonButton>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Welcome, {data?.nombre}!</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Your user ID is: <strong>{data?.id}</strong> <br />
              Entraste con el puesto de: <strong>{data?.puesto}</strong>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Menu;
