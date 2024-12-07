import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts";
import { Homepage } from "@pages/home";
import { CreateGlobalStyle } from "./styles/CreateGlobalStyles";
import { ReportsPage } from "@pages/reports";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "./context";
import Login from "@pages/login/Login";
import { Toaster } from "react-hot-toast";
import { JobsPage } from "@pages/jobs/Jobs";
import { EmailTemplatePage } from "@pages/email-template/EmailTemplatePage";
import { QueryPage } from "@pages/query/QueryPage";
import { SourcePage } from "@pages/sources/SourcePage";
import { MailServerPage } from "@pages/mail-server/MailServerPage";
import UserProfilePage from "@pages/profile/UserProfilePage";
import { SupportPage } from "@pages/support/SupportPage";
import PageNotFound from "@pages/not-found/PageNotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 3,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <CreateGlobalStyle />
        <Routes>
          <Route
            element={
              // <ProtectedRoute>
              <AdminLayout />
              // </ProtectedRoute>
            }
          >
            <Route path="/" element={<Homepage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/email-template" element={<EmailTemplatePage />} />
            <Route path="/queries" element={<QueryPage />} />
            <Route path="/data-source" element={<SourcePage />} />
            <Route path="/mail-server" element={<MailServerPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/support" element={<SupportPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
