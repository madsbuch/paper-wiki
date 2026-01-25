import { Outlet } from "react-router";
import ScrollToTop from "../components/ScrollToTop";
import MathJaxTypeset from "../components/MathJaxTypeset";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <MathJaxTypeset />
      <Outlet />
    </>
  );
}
