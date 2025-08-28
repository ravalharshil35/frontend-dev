import './App.css'
import SignIn from './pages/login/SignIn'
import ResetPassword from './components/ResetPassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserManager from './pages/userManager/UserManager'
import EditProfilePage from './pages/EditProfile/EditProfilePage'
import ProtectedRoute from './Route/ProtectedRoute'
import LandingPage from './pages/LandingPage/LandingPage'
import StudentManager from './pages/studentManager/StudentManager'
import StudentDetails from './pages/studentManager/StudentDetails'
import StudentApplicationDetails from './pages/studentManager/StudentApplicationDetails'
import OrgDetails from './pages/studentManager/OrgDetails'
import ChangePassword from './pages/changePassword/ChangePassword'
import Loggers from './pages/loggers/LoggerPage'


function App() {
  //const user = JSON.parse(sessionStorage.getItem("user") || '{}')
  return (
    <BrowserRouter >
      <Routes>
        {/* <Route path="/usermanager" element={<UserManager />} />
        <Route path="/profilemanager" element={<ProfileManager />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/changepassword" element={<ChangePassword />} /> */}
        <Route path="/login" element={<SignIn />} />


        <Route path="/" element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        }
        />

        
        <Route path="/changepassword" element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
        />
        <Route path="/usermanager" element={
          <ProtectedRoute>
            <UserManager />
          </ProtectedRoute>
        }
        />
        {/* <Route path="/profilemanager" element={
          <ProtectedRoute>
            <ProfileManager />
          </ProtectedRoute>
        }
        /> */}
        <Route path="/studentmanager" element={
          <ProtectedRoute>
            <StudentManager />
          </ProtectedRoute>
        }
        />
        <Route path="/loggers" element={
          <ProtectedRoute>
            <Loggers />
          </ProtectedRoute>
        }
        />
        <Route path="/editprofile" element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        }
        />
        <Route path="/resetpassword" element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
        />
        <Route path="/studentDetails" element={
          <ProtectedRoute>
            <StudentDetails />
          </ProtectedRoute>
        }
        />
        <Route path="/orgDetails" element={
          <ProtectedRoute>
            <OrgDetails />
          </ProtectedRoute>
        }
        />

        <Route path="/applicationDetails" element={
          <ProtectedRoute>
            <StudentApplicationDetails />
          </ProtectedRoute>
        }
        />
      </Routes>

    </BrowserRouter>
  )
}

export default App
