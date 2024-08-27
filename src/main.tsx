import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import {Routers} from "@/router";
import {HelmetProvider} from "react-helmet-async";

const element = (<React.StrictMode>
        <HelmetProvider>
            <Routers />
        </HelmetProvider>
    </React.StrictMode>)

const rootElement = document.getElementById("root")!;

if (rootElement.hasChildNodes()){
    hydrateRoot(rootElement, element);
} else {
    const root = createRoot(rootElement);
    root.render(element);
}