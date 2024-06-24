import React, { useState, useEffect } from 'react';
import { IonInput, IonItem, IonLabel, IonList, IonButton, IonContent, IonToast } from '@ionic/react';
import './FormularioComponent.css';
import logoImage from '../assets/images/log1.jpg';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Formulario() {
  const { getTokenPayload } = useAuth();
  const data = getTokenPayload();

  const rolesConAcceso = {
    formulario: ['usuario'],
    tareasListadas: ['admin', 'supervisor', 'tecnico'],
    tareasEncargado: ['encargado'],
  };

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [consecutive, setConsecutive] = useState(() => {
    const savedConsecutive = localStorage.getItem('consecutive');
    return savedConsecutive ? parseInt(savedConsecutive, 10) : 1;
  });
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lugar, setLugar] = useState('');
  const [codUsuario, setCodUsuario] = useState(data?.id.toString() || '');
  const [codEstado, setCodEstado] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      setCurrentTime(timeString);

      const dateString = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      setCurrentDate(dateString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateConsecutive = () => {
    const now = new Date();
    const year = now.getFullYear();
    const consecutiveString = String(consecutive).padStart(6, '0');
    return `${year}-${consecutiveString}`;
  };

  const incrementConsecutive = () => {
    setConsecutive(prevConsecutive => {
      const newConsecutive = prevConsecutive + 1;
      localStorage.setItem('consecutive', newConsecutive.toString());
      return newConsecutive;
    });
  };

  const goHome = () => {
    history.push('/home');
  };

  const validateForm = () => {
    if (!titulo || !descripcion || !lugar || !codUsuario) {
      setToastMessage('Todos los campos son requeridos.');
      setShowToast(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const newConsecutive = generateConsecutive();
    const dataToSend = {
      ct_cod_incidencia: newConsecutive,
      ct_titulo: titulo,
      ct_descripcion: descripcion,
      ct_lugar: lugar,
      cn_cod_usuario: parseInt(codUsuario, 10),
      cn_cod_estado: codEstado // Estado inicial
    };

    console.log('Datos enviados:', dataToSend);

    try {
      const response = await fetch('http://localhost:3000/sgi/incidencias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        const result = await response.json();
        setToastMessage('Incidencia guardada exitosamente.');
        setShowToast(true);

        incrementConsecutive(); // Incrementa el consecutivo después de un envío exitoso

        // Guardar en el historial de estados
        const estadoHistorial = {
          cn_cod_incidencia: newConsecutive,
          cn_cod_estado: codEstado
        };

        await fetch('http://localhost:3000/sgi/estadosxincidencias', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(estadoHistorial)
        });
      } else {
        const errorResult = await response.json();
        console.error('Error en respuesta:', errorResult);
        setToastMessage('Error al guardar la incidencia.');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setToastMessage('Error al conectar con el servidor.');
      setShowToast(true);
    }
  };

  return (
    <IonContent scrollY={true}>
      <IonList className="custom-list">
        <div className="image-container">
          <img src={logoImage} alt="Logo" className="form-logo" style={{ width: '20%' }} />
        </div>

        <IonItem className="custom-item" color="success">
          <IonLabel>Hora Actual: {currentTime}</IonLabel>
        </IonItem>

        <IonItem className="custom-item" color="success">
          <IonLabel>Fecha Actual: {currentDate}</IonLabel>
        </IonItem>

        <IonItem className="custom-item">
          <IonLabel>Consecutivo: {generateConsecutive()}</IonLabel>
        </IonItem>

        <IonItem className="custom-item">
          <IonLabel position="floating" className="custom-label">Titulo</IonLabel>
          <IonInput
            type="text"
            placeholder="Ingrese el titulo"
            className="custom-input"
            value={titulo}
            onIonChange={e => setTitulo(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem className="custom-item">
          <IonLabel position="floating" className="custom-label">Descripcion</IonLabel>
          <IonInput
            type="text"
            placeholder="Ingrese la descripcion"
            className="custom-input"
            value={descripcion}
            onIonChange={e => setDescripcion(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem className="custom-item">
          <IonLabel position="floating" className="custom-label">Lugar</IonLabel>
          <IonInput
            type="text"
            placeholder="Ingrese el lugar"
            className="custom-input"
            value={lugar}
            onIonChange={e => setLugar(e.detail.value!)}
          ></IonInput>
        </IonItem>

        {rolesConAcceso.formulario.includes(data?.puesto) && (
          <IonItem className="custom-item">
            <IonLabel position="floating" className="custom-label">Quien Solicita</IonLabel>
            <IonInput
              type="text"
              placeholder="Ingrese el número de cédula"
              className="custom-input"
              value={codUsuario}
              onIonChange={e => setCodUsuario(e.detail.value!)}
            ></IonInput>
          </IonItem>
        )}

        <IonButton expand="full" className="submit-button" onClick={handleSubmit}>Enviar</IonButton>
        <IonButton expand="full" color="medium" onClick={goHome}>Volver al Home</IonButton>
      </IonList>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
      />
    </IonContent>
  );
}

export default Formulario;
