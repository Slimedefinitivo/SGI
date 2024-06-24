import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../components/MenuComponent';
import Formulario from '../components/Formulario'; 
import LoginComponent from '../components/LoginComponent';
import { ProtectedRoute } from '../routes'; 
import TareasListadas from '../pages/TareasListadas';
import ModalPage from '../modal/ModalPokemons';
import TareasEncargado from '../pages/TareasEncargado'; // Importar la nueva página
import TareasSupervisor from '../pages/TareasSupervisor';
import ReporteCargasTrabajo from '../pages/ReporteCargasTrabajo';


function AppRouter() {  
  
      return (
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/formulario" component={Formulario} />
          <ProtectedRoute path="/tareasListadas" component={TareasListadas} /> {/* Nueva ruta */}
          <ProtectedRoute path="/tareasEncargado" component={TareasEncargado} /> {/* Nueva ruta */}
          <ProtectedRoute path="/tareasSupervisor" component={TareasSupervisor} />
          <ProtectedRoute path="/reporteCargasTrabajo" component={ReporteCargasTrabajo} />
        
          
          
          <Redirect exact from="/" to="/login" />
        </Switch>
      );
    };
  

export default AppRouter;
