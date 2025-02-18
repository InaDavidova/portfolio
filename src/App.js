import AboutPage from "./components/pages/AboutPage/AboutPage";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import Menu from "./components/Menu/Menu";
import { BrowserRouter } from "react-router-dom";
import ProjectsPage from "./components/pages/ProjectsPage/ProjectsPage";
import ContactsPage from "./components/pages/ContactsPage/ContactsPage";
import { ContentWrapper } from "./App.styled";

function App() {
  return (
    <BrowserRouter>
      <ContentWrapper>
        <Menu />
        <LandingPage />
        <AboutPage />
        <ProjectsPage />
        <ContactsPage />
      </ContentWrapper>
    </BrowserRouter>
  );
}

export default App;
