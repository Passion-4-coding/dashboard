import { AuthContainer } from "./modules/auth";
import { Routes } from "./layout/Routes";

export const App = () => {
  return (
    <AuthContainer>
      <Routes />
    </AuthContainer>
  );
};

export default App;
