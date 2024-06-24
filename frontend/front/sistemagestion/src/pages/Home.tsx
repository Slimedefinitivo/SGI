import React from 'react';
import { IonContent } from '@ionic/react';
import Formulario from '../components/Formulario';
import Menu from '../components/MenuComponent';


function Home() {
  return (
    <IonContent scrollY={true}>
      <Menu></Menu>
      {/* <Formulario></Formulario> */}
    </IonContent>
  );
}

export default Home;
