import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import Spinner from "@components/spinner/Spinner";
import { useUser } from "@features/authentication/useUser";
import { useQueryClient } from "@tanstack/react-query";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
type ProtectedRouteProps = {
  children: ReactNode;
};
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["user"]) as string | null;
  // 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser(userData);
  console.log("isAuthenticated", isAuthenticated);
  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
