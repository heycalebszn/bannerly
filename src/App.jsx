import { Analytics } from "@vercel/analytics/react";
import OnBoarding from "./pages/OnBoarding";
const App = () => {
  return(
    <>
    <OnBoarding />
    <Analytics />
    </>
  )
}

export default App;