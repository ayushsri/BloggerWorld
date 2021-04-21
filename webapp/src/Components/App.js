import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProgrammeRouter from "./ProgrammeRouter";
//To display using Programme router
const App = () => (
    <BrowserRouter>
        <ProgrammeRouter />
    </BrowserRouter>
);

export default App;
