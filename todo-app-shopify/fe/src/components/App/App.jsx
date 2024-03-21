import {AppProvider, Frame} from '@shopify/polaris';
import Topbar from '../Topbar/Topbar';
import PageApp from '../PageApp/PageApp';
const App = () => {


  return (
    <AppProvider>
      <Frame>
        <Topbar />
        <PageApp />
      </Frame>
    </AppProvider>
  );
};

export default App;
