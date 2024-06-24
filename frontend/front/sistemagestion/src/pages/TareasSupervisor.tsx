import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const TareasSupervisor: React.FC = () => {
  const [incidencias, setIncidencias] = useState<{
    [key: string]: {
      ct_titulo: string;
      ct_descripcion: string;
      ct_lugar: string;
      justificacionDeCierre: string;
      estadoDeCierre: string;
      estado: string;
      descripcionEstado: string;
    };
  }>({});
  const [consecutivo, setConsecutivo] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const history = useHistory();
  const { getTokenPayload } = useAuth();
  const data = getTokenPayload();

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sgi/incidencias');
        if (Array.isArray(response.data)) {
          const formattedIncidencias = response.data.reduce((acc, incidencia) => {
            acc[incidencia.ct_cod_incidencia] = {
              ct_titulo: incidencia.ct_titulo,
              ct_descripcion: incidencia.ct_descripcion,
              ct_lugar: incidencia.ct_lugar,
              justificacionDeCierre: '',
              estadoDeCierre: '',
              estado: incidencia.cn_cod_estado,
              descripcionEstado: incidencia.estadosxincidencias.slice(-1)[0]?.estado?.ct_descripcion || 'Descripción no disponible',
            };
            return acc;
          }, {} as {
            [key: string]: {
              ct_titulo: string;
              ct_descripcion: string;
              ct_lugar: string;
              justificacionDeCierre: string;
              estadoDeCierre: string;
              estado: string;
              descripcionEstado: string;
            };
          });
          setIncidencias(formattedIncidencias);
        } else {
          console.error('Se esperaba un array pero se recibió:', response.data);
          setIncidencias({});
        }
      } catch (error) {
        console.error('Error al obtener incidencias:', error);
        setIncidencias({});
      }
    };

    fetchIncidencias();
  }, []);

  const handleCreate = async () => {
    const newIncidencia = {
      ct_cod_incidencia: consecutivo,
      ct_titulo: 'Nuevo Título',
      ct_descripcion: 'Nueva Descripción',
      ct_lugar: 'Nuevo Lugar',
      cn_cod_usuario: 1,
      cn_cod_estado: 1,
      cn_costos: 0,
      ct_prioridad: 'Alta',
      ct_riesgo: 'Alto',
      ct_afectacion: 'Media',
      ct_categoria: 'Nueva Categoría',
    };

    try {
      const response = await axios.post('http://localhost:3000/sgi/incidencias', newIncidencia);
      if (response.status === 200) {
        setToastMessage('Nueva incidencia creada con éxito');
        setShowToast(true);
        clearFields();
      } else {
        setToastMessage('Error al crear la incidencia');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error al crear la incidencia:', error);
      setToastMessage('Error al crear la incidencia');
      setShowToast(true);
    }
  };

  const handleUpdate = async (incidenciaId: string) => {
    const updatedFields = {
      ct_titulo: incidencias[incidenciaId].ct_titulo,
      ct_descripcion: incidencias[incidenciaId].ct_descripcion,
      ct_lugar: incidencias[incidenciaId].ct_lugar,
      ct_justificacionDeCierre: incidencias[incidenciaId].justificacionDeCierre,
      ct_estadoDeCierre: incidencias[incidenciaId].estadoDeCierre,
      cn_cod_estado: parseInt(incidencias[incidenciaId].estadoDeCierre, 10),
      ct_descripcionEstado: incidencias[incidenciaId].descripcionEstado,
    };

    try {
      const response = await axios.put(`http://localhost:3000/sgi/incidencias/${incidenciaId}`, updatedFields);
      if (response.status === 200) {
        setToastMessage('Datos actualizados y guardados con éxito');
        clearFields();
      } else {
        setToastMessage('Error al guardar los datos actualizados');
      }
    } catch (error) {
      console.error('Error al enviar datos actualizados al servidor:', error);
      setToastMessage('Error al guardar los datos actualizados');
    }
    setShowToast(true);
  };

  const clearFields = () => {
    setConsecutivo('');
    setIncidencias(
      Object.keys(incidencias).reduce((acc, key) => {
        acc[key] = {
          ct_titulo: '',
          ct_descripcion: '',
          ct_lugar: '',
          justificacionDeCierre: '',
          estadoDeCierre: '',
          estado: '',
          descripcionEstado: '',
        };
        return acc;
      }, {} as {
        [key: string]: {
          ct_titulo: string;
          ct_descripcion: string;
          ct_lugar: string;
          justificacionDeCierre: string;
          estadoDeCierre: string;
          estado: string;
          descripcionEstado: string;
        };
      })
    );
  };

  const goHome = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Incidencias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              {/* Aquí van tus filtros existentes */}
            </IonCol>
          </IonRow>
        </IonGrid>

        {Object.keys(incidencias).length > 0 ? (
          Object.keys(incidencias).map((id) => (
            <div key={id} className="ion-margin incidence-card">
              <IonItem>
                <IonLabel>Número de Incidencia: {id}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Título: {incidencias[id].ct_titulo}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Descripción: {incidencias[id].ct_descripcion}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Estado: {incidencias[id].estado}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Descripción del Estado: {incidencias[id].descripcionEstado}</IonLabel>
              </IonItem>
              
              
             
              <IonItem>
                <IonLabel position="floating" >Justificación de Cierre</IonLabel>
                <IonInput
                  value={incidencias[id].justificacionDeCierre}
                  placeholder="Ingrese la justificación de cierre"
                  onIonChange={(e) => {
                    const value = e.detail.value!;
                    setIncidencias({
                      ...incidencias,
                      [id]: {
                        ...incidencias[id],
                        justificacionDeCierre: value,
                      },
                    });
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Estado de Cierre</IonLabel>
                <IonSelect
                  value={incidencias[id].estadoDeCierre}
                  onIonChange={(e) => {
                    const value = e.detail.value!;
                    setIncidencias({
                      ...incidencias,
                      [id]: {
                        ...incidencias[id],
                        estadoDeCierre: value,
                      },
                    });
                  }}
                >
                  <IonSelectOption value="7">Aceptado</IonSelectOption>
                  <IonSelectOption value="8">Rechazado</IonSelectOption>
                  <IonSelectOption value="9">Cerrado</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonButton expand="full" onClick={() => handleUpdate(id)}>
                Actualizar Incidencia
              </IonButton>
            </div>
          ))
        ) : (
          <IonItem>
            <IonLabel>No se encontraron incidencias</IonLabel>
          </IonItem>
        )}

        <IonButton expand="full" onClick={goHome}>
          Regresar
        </IonButton>
        <IonToast isOpen={showToast} message={toastMessage} duration={3000} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default TareasSupervisor;
