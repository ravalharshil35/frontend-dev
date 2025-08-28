import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../utility/callAPI';
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Create the context
const StudentManagerContext = createContext({});
const token = localStorage.getItem('token')
// Create a provider component
const StudentManagerContextProvider = ({ children }: any) => {

  // const [firstName, setFirstName] = useState(null)
  // const [lastName, setLastName] = useState(null)
  // const [emailID, setEmailID] = useState(null)
  // const [slStudentId, setSlSTudentId] = React.useState('')
  // const [T1StudentId, setT1StudentId] = React.useState('')
  // const [startDate, setStartDate] = useState(null)
  // const [endDate, setEndDate] = useState(null)

  const [loading, setLoading] = React.useState(false)
  const [currentEditAccessGroup] = React.useState(null)
  const [pageCount, setPageCount] = useState<any>(1)
  const [totalStudentCount, setTotalStudentCount] = useState('')
  const [sortExpression, setSortExpression] = useState('studentGivenName')
  const [studentDetails, setStudentDetails] = React.useState({})
  const [applicationDetails, setApplicationDetails] = React.useState({})
  const [orgDetails, setOrgDetails] = React.useState({})
  const [csvDetails] = React.useState({})


  const formFields: any = {
    filters: [
      {
        label: 'First Name',
        fieldName: 'FirstName',
        type: 'text',
        name: 'FirstName',
      },
      {
        label: 'Last Name',
        fieldName: 'LastName',
        type: 'text',
        name: 'LastName',

      },
      {
        label: 'Email Id',
        fieldName: 'EmailID',
        type: 'email',
        name: 'EmailId'

      },
      {
        label: 'SL Student ID',
        fieldName: 'SlStudentId',
        type: 'text',
        name: 'SlStudentId'

      },
      {
        label: 'T1 Student ID',
        fieldName: 'T1StudentId',
        type: 'text',
        name: 'T1StudentId'

      },
      {
        label: 'Start Date',
        fieldName: 'StartDate',
        type: 'date',
        name: 'StartDate'

      },
      {
        label: 'End Date',
        fieldName: 'EndDate',
        type: 'date',
        name: 'EndDate'

      }
    ],

  }

  const navigate = useNavigate()
  console.log(navigate)
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  interface Attachment {
    id: string;
    name: string;
    // add other fields as needed
  }
  const [applicationDocuments, setApplicationDocuments] = React.useState<Attachment[]>([])


  const [studentTable, setStudentTable] = useState({
    columns: [

      // {
      //   id: 'StudentId',
      //   label: 'Export CSV',
      // },
      {
        id: 'Alert',
        label: 'Alert',
      },
      {
        id: 'Color Code',
        label: 'Color Code',
      },
      {
        id: 'StudentFamilyName',
        label: 'Name',
      },
      {
        id: 'StudentEmailAddress',
        label: 'Email ID',
      },
      {
        id: 'StudentBirthDate',
        label: 'Birth Date',
      },
      {
        id: 'StudentGender',
        label: 'Gender',
      },
      {
        id: 'Dates',
        label: 'Dates',
      },
      {
        id: 'StudentCitizenship',
        label: 'Citizenship',
      }
    ],
    rows: [],
  })

  const importStudents = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("import")

    try {

      await callApi(`${baseUrl}t1slstudent/applicationidlist`,
        'POST', data, headers as import('axios').AxiosRequestHeaders);

        console.log("hellllllllo")
        toast.success("imported")

    } catch (err) {
      console.log("call api err", err);
    } 
  }


  const getLogs = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("importtttt")
    try {
      const response = await callApi(`${baseUrl}apiLogs?param=${data}`,
        'GET', data, headers as import('axios').AxiosRequestHeaders);

      //console.log(responseeee)
      return response

    } catch (err) {
      console.log("call api err", err);
    }
  }

  const LoadStudentData = async (data: any) => {

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("lksdkljsd ", token)
    setLoading(true)
    try {
      const userData = await callApi(`${baseUrl}t1slstudent/getstudents`,
        'POST', data, headers as import('axios').AxiosRequestHeaders);
      //StudentTable.rows = userData
      setStudentTable(prevState => ({
        ...prevState,
        rows: userData
      }));
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
    }
  }


  const updateCsvExportDate = async (data: any) => {

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("lksdkljsd ", token)
    setLoading(true)
    try {
      const userData = await callApi(`${baseUrl}t1slstudent/updateCsvExportDate`,
        'POST', data, headers as import('axios').AxiosRequestHeaders);
        console.log(userData)
      // //StudentTable.rows = userData
      // setStudentTable(prevState => ({
      //   ...prevState,
      //   rows: userData
      // }));
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
    }
  }

  const exportCSV = async (data: any) => {
    console.log("data lksdfjdnnvlcvn,xmcvn vsfssdfsdf", data);

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true)
    try {
      const csvData = await callApi(`${baseUrl}t1slstudent/exportCSV`,
        'POST', data, headers as import('axios').AxiosRequestHeaders);

      console.log("csvData====>", csvData)

      setLoading(false)
      return csvData
    } catch (err) {
      console.log("call api err", err);
    }
  }

  const loadStudentDetails = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("lksdkljsd ", token)
    setLoading(true)
    try {
      const studentData = await callApi(`${baseUrl}t1slstudent/getStudents`,
        // const studentData = await callApi('http://localhost:4000/t1slstudent/getStudent',
        'POST', data, headers as import('axios').AxiosRequestHeaders);
      //StudentTable.rows = userData
      const [student] = studentData
      setStudentDetails(student);
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
    }
  }

  const loadApplicationDetails = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("lksdkljsd ", token)
    setLoading(true)
    try {
      const ApplicationData = await callApi(`${baseUrl}t1slstudent/getApplication`,
        //const ApplicationData = await callApi('http://localhost:4000/t1slstudent/getApplication',
        'POST', data, headers as import('axios').AxiosRequestHeaders);
      console.log("ApplicationData===>", ApplicationData);

      const [application] = ApplicationData
      console.log('application==>', application)
      setApplicationDetails(application);
      const applicationId: any = {
        applicationId: application?.SlStudentId,
      }

      console.log("applicationIddfjhsdkfh", applicationId);

      const documents = await callApi(`${baseUrl}t1slstudent/getAttachments`,
        // const documents = await callApi('http://localhost:4000/t1slapplication/attachments',
        'POST', applicationId, headers as import('axios').AxiosRequestHeaders);
      console.log("documents.response.attachments.attachment", documents);
      let documentList: any[] = []

      if (Array.isArray(documents)) {
        documentList = [...documents]
      } else {
        documentList = [documents]
      }

      setApplicationDocuments(documentList)
      //StudentTable.rows = userData

      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
    }
  }

  const loadOrgDetails = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("lksdkljsd ", token)
    setLoading(true)
    try {
      const orgData = await callApi(`${baseUrl}t1slstudent/getOrg`,
        // const orgData = await callApi('http://localhost:4000/t1slstudent/getOrg',
        'POST', data, headers as import('axios').AxiosRequestHeaders);
      //StudentTable.rows = userData
      console.log("orgData===>", orgData);

      const [org] = orgData
      setOrgDetails(org);
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
    }
  }

  const createCSV = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("lksdkljsd ", token)
    setLoading(true)
    try {
      const studentCSV = await callApi(`${baseUrl}t1slstudent/createCSV`,
        //const studentCSV = await callApi('http://localhost:4000/t1slstudent/createCSV',
        'POST', data, headers as import('axios').AxiosRequestHeaders);
      console.log("studentCSV===>", studentCSV);

      //setStudentDetails(student);
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
    }
  }

  const LoadStudentCount = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const data: any = {
        SortExpression: null,
        PageSize: null,
        SortOrder: 'ASC',
        CurrentPage: null,
        StartDate: null,
        EndDate: null,
        T1StudentId: null,
        SlStudentId: null
      }
      const studentDataCount = await callApi(`${baseUrl}t1slstudent/getstudents`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      //const studentDataCount = await callApi('http://localhost:4000/t1slstudent/getstudents', 'POST', data, headers);
      const [totalCount] = studentDataCount
      console.log("studentDataCount===========>", studentDataCount);

      setPageCount(Math.ceil(totalCount.TotalRecords / 10))
      setTotalStudentCount(totalCount.TotalRecords)
    } catch (err) {
      console.log("call api err", err);
    }
  }

  const createStudent = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      setLoading(true)
      const response = await callApi(`${baseUrl}t1slstudent/createStudent`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      console.log(response)
      //const response = await callApi('http://localhost:4000/t1slstudent/createStudent', 'POST', data, headers)
      //console.log("response===========>", response);

      LoadStudentData({
        SortExpression: sortExpression,
        SortOrder: 'ASC',
        PageSize: 10,
        CurrentPage: 1
      })

    } catch (err) {
      console.log("call api err", err);
    }
  }

  const verifyStudent = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      setLoading(true)
      const response = await callApi(`${baseUrl}t1slstudent/verifyStudent`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      // const response = await callApi('http://localhost:4000/t1slstudent/verifyStudent', 'POST', data, headers)
      console.log("response===========>", response);
      const studentId = data.ids[0]
      console.log("studentId===========>", studentId);
      await loadStudentDetails({
        'Id': studentId
      })

    } catch (err) {
      console.log("call api err", err);
    }
  }

  const verifyApplication = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      setLoading(true)
      const response = await callApi(`${baseUrl}t1slstudent/verifyApplication`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      console.log(response)
      //const response = await callApi('http://localhost:4000/t1slstudent/verifyApplication', 'POST', data, headers)
      console.log("response===========>", data);
      const applicationId = data.ids[0]
      console.log("applicationId===========>", applicationId);
      await loadApplicationDetails({
        'Id': applicationId
      })

    } catch (err) {
      console.log("call api err", err);
    }
  }



  const deleteStudent = async (data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true)
    try {
      const userData = await callApi(`${baseUrl}`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      //const userData = await callApi('http://localhost:4000/manageStudent/deleteStudent', 'POST', data, headers);
      //StudentTable.rows = userData
      console.log(userData);
      toast("Record deleted", { theme: 'light', type: 'success' })
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
      toast.error("Something went wrong", { theme: 'light', type: 'error' })
    }
  }


  console.log("currentEditAccessGroup in context", currentEditAccessGroup);

  const studentContextValue = {
    studentTable,
    // handleCreateStudentSubmit,
    loading,
    setLoading,
    currentEditAccessGroup,
    LoadStudentData,
    deleteStudent,
    LoadStudentCount,
    pageCount, totalStudentCount,
    sortExpression, setSortExpression,
    createStudent,
    studentDetails, setStudentDetails,
    loadStudentDetails,
    verifyStudent,
    createCSV,
    applicationDetails, setApplicationDetails,
    loadApplicationDetails,
    applicationDocuments, verifyApplication,
    orgDetails, setOrgDetails,
    loadOrgDetails,
    importStudents,
    exportCSV,
    csvDetails,
    updateCsvExportDate,
    formFields,
    getLogs
  }

  return (
    <StudentManagerContext.Provider value={studentContextValue}>
      {children}
      <ToastContainer />

    </StudentManagerContext.Provider>
  );
};

export { StudentManagerContext, StudentManagerContextProvider };