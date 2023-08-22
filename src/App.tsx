import "./App.css";
import OfferCalculatorPage from "./pages/OfferCalculatorPage";
import PageLayout from "./layout/PageLayout";
import CalculatorProviders from "./providers/CalculatorProviders";

function App() {
  return (
    <CalculatorProviders>
      <PageLayout>
        <OfferCalculatorPage />
      </PageLayout>
    </CalculatorProviders>
  );
}

export default App;
