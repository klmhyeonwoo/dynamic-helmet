import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {DefaultLayout} from "@/layout/default.tsx";
import {Fragment} from "react";
import App from "@/App.tsx";
import {Test} from "@/app/test.tsx";
import Routerino from "routerino";

const routerChildren = [
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/test',
        element: <Test/>
    }
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        errorElement: <Fragment/>,
        children: routerChildren,
    }
])
export const Routers = () => {
    return <RouterProvider router={router}/>
}

export const RouterinoRouters = () => {
    return (
        <Routerino
            routes={[
                {
                    path: "/",
                    element: <p>Hello, world!</p>,
                    title: "Hello!",
                    description: "Lorem ipsum, etc...",
                },
                {
                    path: "/test",
                    element: <p>layer</p>,
                    title: "layer!",
                    description: "Lorem layer, etc...",
                },

            ]}
            usePrerenderTags={true}
            titlePostfix=" | Foo.com"
        />
    )
}