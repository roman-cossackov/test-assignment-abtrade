import './App.css';

import Form from './components/Form/Form';
import { FormContextProvider } from './context/FormContext';

function App() {
  return (
    <div className="App">
      <FormContextProvider>
        <h1>Вкладка 1 из X</h1>
        <Form />
      </FormContextProvider>
    </div>
  );
}

export default App;
