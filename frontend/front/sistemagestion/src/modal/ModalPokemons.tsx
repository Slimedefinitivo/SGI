// ModalPokemons.js
import React from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const ModalPokemons: React.FC<{ showModal: boolean, setShowModal: (show: boolean) => void, acceptedPokemons: any[], userEmail: string }> = ({ showModal, setShowModal, acceptedPokemons, userEmail }) => {
  return (
    <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Accepted Pokemons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Usuario Conectado: {userEmail}</p>
        <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalPokemons;
