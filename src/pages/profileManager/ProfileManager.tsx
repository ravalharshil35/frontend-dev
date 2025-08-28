import ProfileManagerLayout from '../../components/ProfileManagerLayout'
import { ProfileManagerContextProvider } from '../../context/profileContext'

function ProfileManager() {
  return (
    <ProfileManagerContextProvider>
        <ProfileManagerLayout/>
    </ProfileManagerContextProvider>
  )
}

export default ProfileManager