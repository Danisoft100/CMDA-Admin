import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorElement from "./ErrorElement/ErrorElement";
import AuthLayout from "~/layouts/AuthLayout/AuthLayout";
import DashboardLayout from "~/layouts/DashboardLayout/DashboardLayout";
import EmptyLayout from "~/layouts/EmptyLayout/EmptyLayout";
import WelcomePage from "~/pages/Welcome";
import Login from "~/pages/Auth/Login/Login";
import ForgotPassword from "~/pages/Auth/ForgotPassword/ForgotPassword";
import NewPassword from "~/pages/Auth/NewPassword/NewPassword";
import DashboardHomePage from "~/pages/Dashboard/Overview/Overview";
import AdminDashboardEventsPage from "~/pages/Dashboard/Events/Events";
import AdminDashboardStoreSingleEventPage from "~/pages/Dashboard/Events/SingleEvent/SingleEvent";
import AdminDashboardCreateEvent from "~/pages/Dashboard/Events/CreateEvent/CreateEvent";
import ProtectedRoutes from "./ProtectedRoutes";
import Members from "~/pages/Dashboard/Members/Members";
import Products from "~/pages/Dashboard/Products/Products";
import Chapters from "~/pages/Dashboard/Chapters/Chapters";
import Resources from "~/pages/Dashboard/Resources/Resources";
import SingleResource from "~/pages/Dashboard/Resources/SingleResource";
import Devotionals from "~/pages/Dashboard/Others/Devotionals";
import SingleMember from "~/pages/Dashboard/Members/SingleMember";
import ManageAdmins from "~/pages/Dashboard/Others/ManageAdmins";
import VolunteerJobs from "~/pages/Dashboard/Others/Volunteers/VolunteerJobs";
import SingleVolunteerJob from "~/pages/Dashboard/Others/Volunteers/SingleJob";
import CreateVolunteerJob from "~/pages/Dashboard/Others/Volunteers/CreateJob";
import MyProfile from "~/pages/Dashboard/Others/MyProfile";
import Orders from "~/pages/Dashboard/Payments/Orders";
import Donations from "~/pages/Dashboard/Payments/Donations";
import Subscriptions from "~/pages/Dashboard/Payments/Subscriptions";

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
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardHomePage /> },
            { path: "events", element: <AdminDashboardEventsPage /> },
            { path: "events/create-event", element: <AdminDashboardCreateEvent /> },
            { path: "events/:slug", element: <AdminDashboardStoreSingleEventPage /> },
            {
              path: "payments",
              children: [
                { path: "orders", element: <Orders /> },
                { path: "subscriptions", element: <Subscriptions /> },
                { path: "donations", element: <Donations /> },
              ],
            },
            { path: "members", element: <Members /> },
            { path: "members/:membershipId", element: <SingleMember /> },
            { path: "chapters", element: <Chapters /> },
            { path: "products", element: <Products /> },
            { path: "resources", element: <Resources /> },
            { path: "resources/:slug", element: <SingleResource /> },
            {
              path: "others",
              children: [
                { path: "jobs", element: <VolunteerJobs /> },
                { path: "jobs/create", element: <CreateVolunteerJob /> },
                { path: "jobs/:id", element: <SingleVolunteerJob /> },
                { path: "devotionals", element: <Devotionals /> },
                { path: "admins", element: <ManageAdmins /> },
                { path: "profile", element: <MyProfile /> },
              ],
            },
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
