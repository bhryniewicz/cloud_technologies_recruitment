import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(
    sessionStorage.getItem("isValid") === "true"
  );

  useEffect(() => {
    const isValidStored = sessionStorage.getItem("isValid") === "true";
    const failedAttempt = sessionStorage.getItem("failedAttempt");

    if (!isValidStored && !failedAttempt) {
      const userInput = prompt("Enter a valid password:");

      if (userInput === "recruitment") {
        sessionStorage.setItem("isValid", "true");
        setIsValid(true);
      } else {
        sessionStorage.setItem("failedAttempt", "true");
        navigate("/error");
      }
    }
  }, [isValid, navigate]);

  useEffect(() => {
    const failedAttempt = sessionStorage.getItem("failedAttempt");

    if (failedAttempt) {
      sessionStorage.removeItem("failedAttempt");
    }
  }, [navigate]);

  if (!isValid) {
    return null;
  }

  return <Outlet />;
};
