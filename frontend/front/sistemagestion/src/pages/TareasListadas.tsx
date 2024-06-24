import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../context/authContext'; // Asegúrate de tener esta importación
import './TareasListadas.css';

const TareasListadas: React.FC = () => {
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [acceptedIncidencias, setAcceptedIncidencias] = useState<any[]>([]);
  const [descripcion, setDescripcion] = useState('');
  const [solutionTime, setSolutionTime] = useState('');
  const [observacion, setObservacion] = useState('');
  const [requiereCompra, setRequiereCompra] = useState<string>(''); // Nuevo estado para requerimiento de compra
  const [filterText, setFilterText] = useState('');
  const [estado, setEstado] = useState<number | null>(null); // Nuevo estado para el estado de la incidencia
  const [isFormValid, setIsFormValid] = useState(false); // Estado para habilitar/deshabilitar el botón de enviar
  const maxAccepted = 3;
  const history = useHistory();

  const { getTokenPayload, logout } = useAuth();
  const data = getTokenPayload();

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sgi/incidencias'); // Ajusta la URL según sea necesario
        if (Array.isArray(response.data)) {
          setIncidencias(response.data);
        } else {
          console.error('Se esperaba un array pero se recibió:', response.data);
          setIncidencias([]);
        }
      } catch (error) {
        console.error('Error al obtener incidencias:', error);
        setIncidencias([]);
      }
    };
    fetchIncidencias();
  }, []);

  useEffect(() => {
    validateForm();
  }, [descripcion, solutionTime, observacion, requiereCompra, estado]);

  const validateForm = () => {
    if (
      descripcion.trim() !== '' &&
      solutionTime.trim() !== '' &&
      observacion.trim() !== '' &&
      requiereCompra.trim() !== '' &&
      estado !== null
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleAccept = async (incidencia: any) => {
    if (
      acceptedIncidencias.length < maxAccepted &&
      !acceptedIncidencias.map((accepted) => accepted.ct_cod_incidencia).includes(incidencia.ct_cod_incidencia)
    ) {
      try {
        const newDiagnostico = {
          ct_descripcion: descripcion,
          cn_tiempoSolucion: parseInt(solutionTime, 10),
          ct_observacion: observacion,
          ct_cod_incidencia: incidencia.ct_cod_incidencia,
          ct_requiereCompra: requiereCompra, // Agregado campo requiereCompra
          cn_cod_estado: estado // Agregado campo estado
        };

        // Envío de datos al backend
        await axios.post('http://localhost:3000/diagnosticos', newDiagnostico);

        setAcceptedIncidencias([...acceptedIncidencias, incidencia]);
        // Limpia los campos después de aceptar
        setDescripcion('');
        setSolutionTime('');
        setObservacion('');
        setRequiereCompra(''); // Limpiar el campo después de aceptar
        setEstado(null); // Limpiar el campo después de aceptar
      } catch (error) {
        console.error('Error al aceptar la incidencia:', error);
      }
    }
  };

  const handleSend = async (incidencia: any) => {
    try {
      const newDiagnostico = {
        ct_descripcion: descripcion,
        cn_tiempoSolucion: parseInt(solutionTime, 10),
        ct_observacion: observacion,
        ct_cod_incidencia: incidencia.ct_cod_incidencia,
        ct_requiereCompra: requiereCompra, // Agregado campo requiereCompra
      };

      // Envío de datos al backend
      await axios.post('http://localhost:3000/sgi/diagnosticos', newDiagnostico);

      const updatedIncidencia = {
        cn_cod_estado: estado // Enviar el nuevo estado al backend
      };

      await axios.put(`http://localhost:3000/sgi/incidencias/${incidencia.ct_cod_incidencia}`, updatedIncidencia);

      // Limpia los campos después de enviar
      setDescripcion('');
      setSolutionTime('');
      setObservacion('');
      setRequiereCompra(''); // Limpiar el campo después de enviar
      setEstado(null); // Limpiar el campo después de enviar
    } catch (error) {
      console.error('Error al enviar la incidencia:', error);
    }
  };

  const goHome = () => {
    history.push('/home');
  };

  const getColorForPriority = (priority: string | undefined) => {
    switch (priority) {
      case 'Alta':
        return { color: '#FFB3B3', priorityOrder: 1 };
      case 'Media':
        return { color: '#FFFFB3', priorityOrder: 2 };
      case 'Baja':
        return { color: '#B3FFB3', priorityOrder: 3 };
      default:
        return { color: '#FFFFFF', priorityOrder: 4 };
    }
  };

  const filteredIncidencias = incidencias.filter(
    (incidencia) =>
      incidencia.ct_nombreTecnico === data?.nombre && // Filtra por el nombre del técnico actual
      (incidencia.ct_lugar.toLowerCase().includes(filterText.toLowerCase()) ||
      incidencia.ct_cod_incidencia.toLowerCase().includes(filterText.toLowerCase()) ||
      new Date(incidencia.cd_fechaHora).toLocaleDateString().includes(filterText.toLowerCase()))
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Incidencias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonIcon icon={searchOutline} slot="start" />
          {filterText ? null : <IonLabel position="floating">Buscar</IonLabel>}
          <IonInput value={filterText} onIonChange={(e) => setFilterText(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>ID del tecnico actual: {data?.id || 'ID no disponible'}</IonLabel>
          <IonLabel>Nombre del tecnico actual: {data?.nombre || 'Nombre no disponible'}</IonLabel>
        </IonItem>

        {Array.isArray(filteredIncidencias) && filteredIncidencias.length > 0 ? (
          <IonList className="card-list">
            {filteredIncidencias
              .sort((a, b) => {
                // Ordenar por prioridad: Alta (rojo), Media (amarillo), Baja (verde)
                const priorityOrderA = getColorForPriority(a.ct_prioridad).priorityOrder;
                const priorityOrderB = getColorForPriority(b.ct_prioridad).priorityOrder;
                return priorityOrderA - priorityOrderB;
              })
              .map((incidencia) => {
                const { color } = getColorForPriority(incidencia.ct_prioridad);
                return (
                  <IonCard
                    key={incidencia.ct_cod_incidencia}
                    className={`card ${color === 'red' ? 'card-red' : color === 'yellow' ? 'card-yellow' : 'card-green'}`}
                    style={{ backgroundColor: color }}
                  >
                    <IonCardHeader>
                      <IonCardTitle>{incidencia.ct_titulo}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{incidencia.ct_descripcion}</p>
                      <p>Lugar: {incidencia.ct_lugar}</p>
                      <p>Fecha: {new Date(incidencia.cd_fechaHora).toLocaleDateString()}</p>
                      <p>Prioridad: {incidencia.ct_prioridad}</p>
                      <p>ID usuario creo incidencia: {incidencia.cn_cod_usuario}</p>
                      <p>ID Encargado asigno incidencia: {incidencia.cn_cod_encargado}</p>
                      <p>Nombre Tecnico Asignado: {incidencia.ct_nombreTecnico}</p>

                      <IonItem>
                        <IonLabel>Consecutivo: {incidencia.ct_cod_incidencia}</IonLabel>
                      </IonItem>
                      {acceptedIncidencias.map((accepted) => accepted.ct_cod_incidencia).includes(incidencia.ct_cod_incidencia) ? (
                        <IonLabel>Tarea Aceptada</IonLabel>
                      ) : (
                        <IonButton
                          onClick={() => handleAccept(incidencia)}
                          disabled={acceptedIncidencias.length >= maxAccepted || acceptedIncidencias.map((accepted) => accepted.ct_cod_incidencia).includes(incidencia.ct_cod_incidencia)}
                        >
                          Aceptar
                        </IonButton>
                      )}

                      <div>
                        <IonItem>
                          <IonLabel>Descripción:</IonLabel>
                          <IonInput value={descripcion} onIonChange={(e) => setDescripcion(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                          <IonLabel>Tiempo de Solución (minutos):</IonLabel>
                          <IonInput type="number" value={solutionTime} onIonChange={(e) => setSolutionTime(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                          <IonLabel>Observaciones:</IonLabel>
                          <IonInput value={observacion} onIonChange={(e) => setObservacion(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                          <IonLabel>Requiere Compra:</IonLabel>
                          <IonSelect value={requiereCompra} onIonChange={(e) => setRequiereCompra(e.detail.value)}>
                            <IonSelectOption value="SI">Sí</IonSelectOption>
                            <IonSelectOption value="NO">No</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                        <IonItem>
                          <IonLabel>Estado:</IonLabel>
                          <IonSelect value={estado} onIonChange={(e) => setEstado(e.detail.value)}>
                            <IonSelectOption value={3}>En revision</IonSelectOption>
                            <IonSelectOption value={4}>En reparacion</IonSelectOption>
                            <IonSelectOption value={5}>Pendiente Compra</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </div>

                      <IonButton onClick={() => handleSend(incidencia)} disabled={!isFormValid}>
                        Enviar Diagnóstico
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                );
              })}
          </IonList>
        ) : (
          <p>No hay incidencias disponibles.</p>
        )}

        <IonButton onClick={goHome}>Ir a Home</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TareasListadas;
