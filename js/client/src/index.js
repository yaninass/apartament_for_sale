import React,{createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserAgency from './agency/UserAgency';
import FlatAgency from './agency/FlatAgency';
import FeedbackAgency from './agency/FeedbackAgency';

export const Context = createContext(null)
ReactDOM.render(
  <Context.Provider value={{
    user: new UserAgency(),
    flat: new FlatAgency(),
    feedback: new FeedbackAgency()
  }}>
      <App />
  </Context.Provider>,

  
  document.getElementById('root')

)
