import { StudentManagerContextProvider } from "../../context/studentContext";
import Loggers from '../../components/Loggers';

function LoggerPage() {
  return (
    <StudentManagerContextProvider>
      <Loggers />
    </StudentManagerContextProvider>

  )
}

export default LoggerPage