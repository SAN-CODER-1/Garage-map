import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8080/auth/validate", {
      withCredentials: true
    })
    .then(res => {
      setRole(res.data.role);
      setLoading(false);
    })
    .catch(() => {
      setRole(null);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!role) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
