import StudentDetailsLayout from '../../components/StudentDetailsLayout'
import { StudentManagerContextProvider} from '../../context/studentContext'

function StudentDetails() {
  return (
    <StudentManagerContextProvider>
        <StudentDetailsLayout/>
    </StudentManagerContextProvider>
  )
}

export default StudentDetails