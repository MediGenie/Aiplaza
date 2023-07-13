import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { Layout } from "./Layout";
import { Page } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Page />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
