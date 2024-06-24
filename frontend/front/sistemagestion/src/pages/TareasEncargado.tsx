import React, { useState, useEffect } from 'react';
import './TareaEncargado.css';
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

const TareasEncargado: React.FC = () => {
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [tecnicos, setTecnicos] = useState<string[]>([]);

  const { getTokenPayload, logout } = useAuth();
  const data = getTokenPayload();

  const rolesConAcceso = {
    formulario: ['usuario'],
    tareasListadas: ['admin', 'supervisor', 'tecnico'],
    tareasEncargado: ['encargado'],
  };

  const [codUsuario, setCodUsuario] = useState(data?.id.toString() || '');

  const [costos, setCostos] = useState<number | undefined>(undefined);
  const [duracion, setDuracion] = useState<number | undefined>(undefined);
  const [prioridad, setPrioridad] = useState<string>('');
  const [riesgo, setRiesgo] = useState<string>('');
  const [afectacion, setAfectacion] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState<string>('');

  const [filterLugar, setFilterLugar] = useState<string>('');
  const [filterFecha, setFilterFecha] = useState<string>('');
  const [filterConsecutivo, setFilterConsecutivo] = useState<string>('');

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const history = useHistory();

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sgi/incidencias');
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

    const fetchTecnicos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sgi/tecnicos');
        setTecnicos(response.data.map((tecnico: { ct_nombre: string }) => tecnico.ct_nombre));
      } catch (error) {
        console.error('Error al obtener técnicos:', error);
      }
    };

    fetchIncidencias();
    fetchTecnicos();
  }, []);

  const handleAccept = async (incidencia: any) => {
    const updatedFields = {
      cn_costos: costos,
      cn_duracion: duracion,
      ct_prioridad: prioridad,
      ct_riesgo: riesgo,
      ct_afectacion: afectacion,
      ct_categoria: categoria,
      ct_tecnico: tecnicoSeleccionado,
      cn_cod_encargado: parseInt(codUsuario, 10),
      cn_cod_estado: 2,  // Cambiar el estado a 2
      ct_nombreTecnico: tecnicoSeleccionado
    };
  
    try {
      const response = await axios.put(`http://localhost:3000/sgi/incidencias/${incidencia.ct_cod_incidencia}`, updatedFields);
      if (response.status === 200) {
        // Construir el nuevo estado
        const newEstado = {
          cn_cod_estado: 2,
          estado: { ct_descripcion: 'Asignado' } // Puedes ajustar la descripción según tu necesidad
        };
  
        // Actualizar estadosxincidencias
        const updatedIncidencias = incidencias.map(item => {
          if (item.ct_cod_incidencia === incidencia.ct_cod_incidencia) {
            const updatedEstados = [...item.estadosxincidencias, newEstado];
            return { ...item, ...updatedFields, estadosxincidencias: updatedEstados };
          }
          return item;
        });
  
        setIncidencias(updatedIncidencias);
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
    setCostos(undefined);
    setDuracion(undefined);
    setPrioridad('');
    setRiesgo('');
    setAfectacion('');
    setCategoria('');
    setTecnicoSeleccionado('');
  };

  const goHome = () => {
    history.push('/home');
  };

  const filteredIncidencias = incidencias.filter((incidencia) =>
    (filterLugar === '' || incidencia.ct_lugar.toLowerCase().includes(filterLugar.toLowerCase())) &&
    (filterFecha === '' || new Date(incidencia.cd_fechaHora).toLocaleDateString().includes(filterFecha)) &&
    (filterConsecutivo === '' || incidencia.ct_cod_incidencia.toLowerCase().includes(filterConsecutivo.toLowerCase()))
  );

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
              <IonItem className="filter-lugar">
                <IonLabel position="floating" className="custom-label">Filtrar por Lugar</IonLabel>
                <IonInput className="custom-input" value={filterLugar} onIonChange={(e) => setFilterLugar(e.detail.value!)}></IonInput>
              </IonItem>
              <IonItem className="filter-fecha">
                <IonLabel position="floating" className="custom-label">Filtrar por Fecha</IonLabel>
                <IonInput className="custom-input" value={filterFecha} onIonChange={(e) => setFilterFecha(e.detail.value!)}></IonInput>
              </IonItem>
              <IonItem className="filter-consecutivo">
                <IonLabel position="floating" className="custom-label">Filtrar por Consecutivo</IonLabel>
                <IonInput className="custom-input" value={filterConsecutivo} onIonChange={(e) => setFilterConsecutivo(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        {filteredIncidencias.length > 0 ? (
          filteredIncidencias.map((incidencia) => {
            // Obtener la última descripción del estado
            const lastState = incidencia.estadosxincidencias.slice(-1)[0];
            const lastStateDescription = lastState ? lastState.estado.ct_descripcion : 'Descripción no disponible';

            return (
              <div key={incidencia.ct_cod_incidencia} className="ion-margin incidence-card">
                <IonItem lines="none">
                  <IonLabel className="custom-label">Consecutivo Actual: {incidencia.ct_cod_incidencia}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel className="custom-label">Título: {incidencia.ct_titulo}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel className="custom-label">Descripción: {incidencia.ct_descripcion}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel className="custom-label">Creado por el Usuario: {incidencia.cn_cod_usuario}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel className="custom-label">Estado: {lastState ? lastState.cn_cod_estado : 'Estado no disponible'}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel className="custom-label">Descripción del Estado: {lastStateDescription}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel className="custom-label">Fecha y Hora: {new Date(incidencia.cd_fechaHora).toLocaleString()}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel className="custom-label">Lugar: {incidencia.ct_lugar}</IonLabel>
                </IonItem>

                {/* Aquí puedes agregar los inputs y selects para actualizar los datos */}
                <IonGrid>
                  <IonRow>
                    <IonCol>
                    <IonItem>
                <IonLabel position="floating" className="custom-label" >Costos</IonLabel>
                <IonInput type="number" className="custom-input" value={costos !== undefined ? costos.toString() : ''} onIonChange={(e) => setCostos(parseInt(e.detail.value!, 10))} placeholder="&#x20A1;
"></IonInput>
              </IonItem>
                    </IonCol>
                    <IonCol>
                    <IonItem>
  <IonLabel position="floating" className="custom-label">Duración</IonLabel>
  <IonSelect
    className="custom-select"
    value={duracion !== undefined ? duracion.toString() : ''}
    onIonChange={(e) => setDuracion(parseInt(e.detail.value!, 10))}
    interface="popover"
  >
    <IonSelectOption value="30">30 minutos</IonSelectOption>
    <IonSelectOption value="60">1 hora</IonSelectOption>
    <IonSelectOption value="90">1 hora 30 minutos</IonSelectOption>
    <IonSelectOption value="120">2 horas</IonSelectOption>
    {/* Agrega más opciones según sea necesario */}
  </IonSelect>
</IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                    <IonItem>
                <IonLabel position="floating" className="custom-label">Prioridad</IonLabel>
                <IonSelect className="custom-select" value={prioridad} onIonChange={(e) => setPrioridad(e.detail.value!)}>
                  <IonSelectOption className="custom-select-option" value="Alta">Alta</IonSelectOption>
                  <IonSelectOption className="custom-select-option" value="Media">Media</IonSelectOption>
                  <IonSelectOption className="custom-select-option" value="Baja">Baja</IonSelectOption>
                </IonSelect>
              </IonItem>

                    </IonCol>
                    <IonCol>
                    <IonItem>
                <IonLabel position="floating" className="custom-label">Riesgo</IonLabel>
                <IonSelect className="custom-select" value={riesgo} onIonChange={(e) => setRiesgo(e.detail.value!)}>
                  <IonSelectOption className="custom-select-option" value="Alto">Alto</IonSelectOption>
                  <IonSelectOption className="custom-select-option" value="Medio">Medio</IonSelectOption>
                  <IonSelectOption className="custom-select-option" value="Bajo">Bajo</IonSelectOption>
                </IonSelect>
              </IonItem>

                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                    <IonItem>
                <IonLabel position="floating" className="custom-label">Afectación</IonLabel>
                <IonSelect className="custom-select" value={afectacion} onIonChange={(e) => setAfectacion(e.detail.value!)}>
                  <IonSelectOption className="custom-select-option" value="Alta">Alta</IonSelectOption>
                  <IonSelectOption className="custom-select-option" value="Media">Media</IonSelectOption>
                  <IonSelectOption className="custom-select-option" value="Baja">Baja</IonSelectOption>
                </IonSelect>
              </IonItem>

                    </IonCol>
                    <IonCol>
                    <IonItem>
                <IonLabel position="floating" className="custom-label">Categoría</IonLabel>
                <IonSelect className="custom-select" value={categoria} onIonChange={(e) => setCategoria(e.detail.value!)}>
                  <IonSelectOption className="custom-select-option" value="Reparacion">Reparacion</IonSelectOption>
                  <IonSelectOption className="custom-select-option" value="Natural">Natural</IonSelectOption>
                  <IonSelectOption className="custom-select-option" value="Red">Red</IonSelectOption>
                </IonSelect>
              </IonItem>

                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="custom-item">
                        <IonLabel position="floating" className="custom-label">Seleccionar Técnico</IonLabel>
                        <IonSelect className="custom-select" value={tecnicoSeleccionado} onIonChange={(e) => setTecnicoSeleccionado(e.detail.value!)}>
                          {tecnicos.map((tecnico, index) => (
                            <IonSelectOption key={index} value={tecnico}>
                              {tecnico}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                <IonButton expand="block" color="primary" onClick={() => handleAccept(incidencia)}>Guardar</IonButton>
              </div>
            );
          })
        ) : (
          <p>No se encontraron incidencias.</p>
        )}
        <IonButton expand="block" color="tertiary" onClick={goHome}>Regresar</IonButton>
        <IonToast isOpen={showToast} message={toastMessage} duration={3000} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default TareasEncargado;
