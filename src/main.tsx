import React from "react";
import ReactDOM from "react-dom/client";

import {RouterinoRouters, Routers} from "@/router";
import {HelmetProvider} from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelmetProvider>
            <Routers />
            <RouterinoRouters/>
        </HelmetProvider>
    </React.StrictMode>,
);
