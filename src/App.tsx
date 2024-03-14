import { Wrapper } from './components/Wrapper';
import { DataListContainer } from './components/DataListContainer';
import { DataItemsProvider } from './context/DataItemsContext.tsx';
import { DataProvider } from './context/DataContext.tsx';
import { Main } from './components/Main';

function App() {
  return (
    <Wrapper>
      <DataProvider>
        <DataItemsProvider>
          <DataListContainer />
          <Main />
        </DataItemsProvider>
      </DataProvider>
    </Wrapper>
  );
}

export default App;
