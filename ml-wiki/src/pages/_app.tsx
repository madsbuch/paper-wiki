import { Outlet } from "react-router";
import ScrollToTop from "../components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
