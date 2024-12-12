import OnBoarding from "./pages/OnBoarding";
import { Analytics } from "@vercel/analytics/react";
const App = () => {
  return(
    <>
    <OnBoarding />
    <Analytics />
    </>
  )
}

export default App;