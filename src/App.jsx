import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ContentPage from "./pages/ContentPage";
import PersonPage from "./pages/PersonPage";

function App() {
    return (
        <>
            <Nav />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/content/:brugernavn" element={<ContentPage />} />
                    <Route path="/person/:brugernavn" element={<PersonPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
