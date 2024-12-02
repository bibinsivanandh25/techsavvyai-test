import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import AppProvider from './contexts/AppContext';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/main"
            element={
              <AppProvider>
                <MainPage />
              </AppProvider>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
