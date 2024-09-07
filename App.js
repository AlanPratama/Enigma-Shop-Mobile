import { Provider } from "react-redux";
import AppNavigator from "./src/navigator/AppNavigator";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
