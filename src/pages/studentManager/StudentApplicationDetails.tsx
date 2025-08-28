import { StudentManagerContextProvider } from '../../context/studentContext'
import ApplicationDetailsLayout from '../../components/ApplicationDetailsLayout'

function StudentApplicationDetails() {
    return (
        <StudentManagerContextProvider>
            <ApplicationDetailsLayout/>
        </StudentManagerContextProvider>
      )
}

export default StudentApplicationDetails