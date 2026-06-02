import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import StepperForm from "../pages/StepperForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/submission/:id" element={<StepperForm />} />
    </Routes>
  );
};

export default AppRoutes;
