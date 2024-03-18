import { AppProvider } from '@shopify/polaris';
import Topbar from '../Topbar/Topbar';
import PageApp from '../PageApp/PageApp';
const App = () => {


  return (
    <AppProvider>
      <Topbar />
      <PageApp />
    </AppProvider>
  );
};

export default App;
