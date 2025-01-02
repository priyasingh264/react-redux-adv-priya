import { Provider } from "react-redux";
import { Header, TaskTable } from "./components";
import { store } from "./store/toolkit-store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <TaskTable />
    </Provider>
  );
}

export default App;
