import DashboardLayout from '../../components/DashboardLayout';
import { UserManagerContextProvider } from '../../context/userContext';
function UserManager() {
 

  return (
    <UserManagerContextProvider>
      <DashboardLayout />
    </UserManagerContextProvider>
  )
}

export default UserManager