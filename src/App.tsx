import { Routes, Route } from "react-router-dom";
import PeopleTable from "./pages/PeopleTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PeopleTable />} />
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}

export default App;
