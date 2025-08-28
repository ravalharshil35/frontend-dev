import OrgDetailsLayout from '../../components/OrgDetailsLayout'
import { StudentManagerContextProvider} from '../../context/studentContext'

function OrgDetails() {
  return (
    <StudentManagerContextProvider>
        <OrgDetailsLayout/>
    </StudentManagerContextProvider>
  )
}

export default OrgDetails