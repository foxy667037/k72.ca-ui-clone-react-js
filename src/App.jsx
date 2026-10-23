import { AppLayout } from "./layout";
import { HomePage, Projets, Agence } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/agence", element: <Agence /> },
        { path: "/projets", element: <Projets /> },
      ],
    },
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
