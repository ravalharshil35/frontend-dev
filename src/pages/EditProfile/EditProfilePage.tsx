import EditProfileLayout from '../../components/EditProfileLayout'
import { ProfileManagerContextProvider } from '../../context/profileContext'

function EditProfilePage() {
  return (
  <ProfileManagerContextProvider>
      <EditProfileLayout/>
  </ProfileManagerContextProvider>
  )
}

export default EditProfilePage