import React, { useState, useEffect } from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './ReporteCargasTrabajo.css'; // Archivo CSS para estilos personalizados

interface ReportItem {
  ct_nombreTecnico: string;
  pendientes: number;
  terminados: number;
}

const ReporteCargasTrabajo: React.FC = () => {
  const history = useHistory();
  const [reportItems, setReportItems] = useState<ReportItem[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch('http://localhost:3000/sgi/incidencias/reporte');
        if (response.ok) {
          const data = await response.json();
          setReportItems(data as ReportItem[]);
        } else {
          console.error('Error en la respuesta del servidor:', response.statusText);
          setToastMessage('Error al obtener el reporte de cargas de trabajo');
          setShowToast(true);
        }
      } catch (error) {
        console.error('Error al obtener el reporte de cargas de trabajo:', error);
        setToastMessage('Error al conectar con el servidor');
        setShowToast(true);
      }
    };

    fetchReportData();
  }, []);

  const goHome = () => {
    history.push('/home');
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reporte de Cargas de Trabajo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="custom-content">
        <IonCard className="custom-card glass-effect">
          <IonCardHeader>
            <IonCardTitle>Cargas de Trabajo</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow className="header-row">
                <IonCol className="header-col" size="4"><strong>Nombre</strong></IonCol>                
                <IonCol className="header-col" size="2"><strong>Pendientes</strong></IonCol>
                <IonCol className="header-col" size="2"><strong>Terminados</strong></IonCol>
              </IonRow>

              {/* Renderización dinámica de filas con los datos recibidos */}
              {reportItems.map((item, index) => (
                <IonRow key={index} className="data-row">
                  <IonCol className="data-col" size="4">{item.ct_nombreTecnico}</IonCol>
                  <IonCol className="data-col" size="2">{item.pendientes}</IonCol>
                  <IonCol className="data-col" size="2">{item.terminados}</IonCol>
                </IonRow>
              ))}

              <IonRow>
                <IonCol size="12">
                  <IonButton expand="full" onClick={goHome}>Ir a Home</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
      />
    </>
  );
};

export default ReporteCargasTrabajo;
