import React from 'react';
import RouterPath from './routes/RouterPath'; 
import { ToasterProvider } from './components/Toaster'; 

function App() {
  return (
    <ToasterProvider>
      <RouterPath />
    </ToasterProvider>
  );
}

export default App;
