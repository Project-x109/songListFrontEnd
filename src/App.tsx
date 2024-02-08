import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import { Provider } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import store from './redux/store';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  );
}
export default App;
