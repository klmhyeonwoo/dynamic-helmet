import React from "react";

import {Routers} from "@/router";
import {HelmetProvider} from "react-helmet-async";
import {hydrate, render} from "react-dom";

const renderDom = (
    <React.StrictMode>
        <HelmetProvider>
            <Routers />
        </HelmetProvider>
    </React.StrictMode>
)
const rootElement = document.getElementById("root");


if (rootElement!.hasChildNodes()) {
    hydrate(renderDom, rootElement);
} else {
    render(renderDom, rootElement);
}
