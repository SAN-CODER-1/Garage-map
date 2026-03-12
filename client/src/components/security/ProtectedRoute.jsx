import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {

    axios.get("http://localhost:8080/auth/validate", {
      withCredentials: true
    })
    .then(() => {
      setValid(true);
      setLoading(false);
    })
    .catch(() => {
      setValid(false);
      setLoading(false);
    });

  }, []);

  if (loading) return <div>Loading...</div>;

  return valid ? children : <Navigate to="/" />;
}

export default ProtectedRoute;