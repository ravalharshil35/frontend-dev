import StudentManagerLayout from '../../components/StudentManagerLayout'
import { StudentManagerContextProvider} from '../../context/studentContext'

function StudentManager() {
  return (
    <StudentManagerContextProvider>
        <StudentManagerLayout/>
    </StudentManagerContextProvider>
  )
}

export default StudentManager