import { Provider } from "react-redux";
import { Header, TaskTable } from "./components";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <TaskTable />
    </Provider>
  );
}

export default App;
