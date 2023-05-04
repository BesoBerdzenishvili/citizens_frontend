import { Routes, Route } from "react-router-dom";
import PeopleTable from "./pages/PeopleTable";
import NoMatch from "./pages/NoMatch/NoMatch";
import PieChart from "./pages/PieChart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PeopleTable />} />
      <Route path="/pie" element={<PieChart />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
