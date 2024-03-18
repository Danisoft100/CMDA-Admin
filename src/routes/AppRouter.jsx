import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorElement from "./ErrorElement/ErrorElement";
import AuthLayout from "~/layouts/AuthLayout/AuthLayout";
import DashboardLayout from "~/layouts/DashboardLayout/DashboardLayout";
import EmptyLayout from "~/layouts/EmptyLayout/EmptyLayout";
import WelcomePage from "~/pages/Welcome";
import Login from "~/pages/Auth/Login/Login";
import ForgotPassword from "~/pages/Auth/ForgotPassword/ForgotPassword";
import NewPassword from "~/pages/Auth/NewPassword/NewPassword";
import DashboardHomePage from "~/pages/Dashboard/Home/Home";
import AdminDashboardEventsPage from "~/pages/Dashboard/Events/Events";
import AdminDashboardStoreSingleEventPage from "~/pages/Dashboard/Events/SingleEvent/SingleEvent";
import AdminDashboardCreateEvent from "~/pages/Dashboard/Events/CreateEvent/CreateEvent";

export default function AppRouter() {
  const isAuthenticated = true;

  // Use different layout to display error depending on authentication status
  const ErrorDisplay = () => {
    return isAuthenticated ? (
      <DashboardLayout withOutlet={false}>
        <ErrorElement />
      </DashboardLayout>
    ) : (
      <AuthLayout withOutlet={false}>
        <ErrorElement />
      </AuthLayout>
    );
  };

  // ================= ROUTES ======================= //
  const router = createBrowserRouter([
    // Dashboard Pages
    {
      path: "/",
      // element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardHomePage /> },
            { path: "events", element: <AdminDashboardEventsPage /> },
            { path: "events/:id", element: <AdminDashboardStoreSingleEventPage /> },
            { path: "create-event", element: <AdminDashboardCreateEvent /> },
          ],
        },
      ],
      errorElement: <ErrorDisplay />,
    },
    // Auth pages
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <NewPassword /> },
      ],
    },
    // Others
    {
      element: <EmptyLayout />,
      children: [{ path: "welcome", element: <WelcomePage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}
