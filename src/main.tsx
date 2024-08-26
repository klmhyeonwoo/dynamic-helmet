import React from "react";
import ReactDOM from "react-dom/client";

import {Routers} from "@/router";
import {HelmetProvider} from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelmetProvider>
            <Routers />
        </HelmetProvider>
    </React.StrictMode>,
);