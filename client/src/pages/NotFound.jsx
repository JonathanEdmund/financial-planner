import { Navigate } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h3>Page Not Found</h3>
      <Navigate to="/" />
    </>
  );
}

export default NotFound;
