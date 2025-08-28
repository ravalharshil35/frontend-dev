import React, { createContext, useState } from 'react';
import axios from 'axios';
import { callApi } from '../utility/callAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Create the context
const UserManagerContext = createContext({});
interface formFields {
  filters: Array<Object>,
  createUserInputs: Array<Object>,
  createUserDropDowns: Array<Object>,
}
// Create a provider component
const UserManagerContextProvider = ({ children }: any) => {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [emailID, setEmailID] = useState(null)
  const [Password, setPassword] = useState(null)
  const [userId, setUserId] = React.useState('')

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('')
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [profileErrorMessage, setProfileErrorMessage] = useState('')

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [profileError, setProfileError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [_filterData, setFilterData] = useState(false)
  const [_isPaginate, _setIsPaginate] = useState(false)
  const [pageCount, setPageCount] = useState<any>(1)
  const [profiles, setProfiles] = useState()
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [editProfile, setEditProfile] = useState('')
  const [totalUserCount, setTotalUserCount] = useState('')
  const [isEditing, setIsEditing] = React.useState<any>(false)
  const [sortExpression, setSortExpression] = useState("FirstName")
  const [sortOrder, setSortOrder] = React.useState('ASC')
  const [userProfileId, setUserProfileId] = React.useState(null)
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const formFields: formFields = {
    filters: [
      {
        label: 'First Name',
        fieldName: 'FirstName',
        type: 'text',
        name: 'First Name',
      },
      {
        label: 'Last Name',
        fieldName: 'LastName',
        type: 'text',
        name: 'lastName',

      },
      {
        label: 'Email Id',
        fieldName: 'EmailId',
        type: 'text',
        name: 'emailId'

      }
    ],
    createUserInputs: [
      {
        label: 'First Name',
        fieldName: 'FirstName',
        type: 'text',
        name: 'First Name',
        errorMessage: firstNameErrorMessage,
        error: firstNameError,
        editValue: editFirstName,
      },
      {
        label: 'Last Name',
        fieldName: 'LastName',
        type: 'text',
        name: 'lastName',
        errorMessage: lastNameErrorMessage,
        error: lastNameError,
        editValue: editLastName
      },
      {
        label: 'Email Id',
        fieldName: 'EmailID',
        type: 'text',
        name: 'EmailID',
        errorMessage: emailErrorMessage,
        error: emailError,
        editValue: editEmail,
        editable: isEditing,
      },
      {
        label: 'Password',
        fieldName: 'Password',
        type: 'password',
        name: 'Password',
        errorMessage: passwordErrorMessage,
        error: passwordError,
        editValue: Password,
        editable: isEditing,
      }
    ],
    createUserDropDowns: []
  }

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const [userTable, setUserTable] = useState({
    columns: [
      { id: 'FirstName', label: 'First Name', minWidth: 170 },
      { id: 'LastName', label: 'Last Name', minWidth: 100 },
      { id: 'EmailID', label: 'Email', minWidth: 170, }
    ],
    rows: [],
  }
  )



  const loadUserDataTable = async () => {
    setLoading(true)
    try {
      const data: any = {
        "FirstName": firstName,
        "LastName": lastName,
        "EmailID": emailID,
        "SortExpression": sortExpression,
        "SortOrder": sortOrder,
        "PageSize": 10,
        "CurrentPage": page
      }
      const userData = await callApi(`${baseUrl}manageUser/loadUsersTable`, 'POST', data, headers as import('axios').AxiosRequestHeaders);

      //const userData =  await callApi('http://localhost:4000/manageUser/loadUsersTable', 'POST',data,headers);
      console.log("userData===>", userData)
      setUserTable(prevState => ({
        ...prevState,
        rows: userData
      }));
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
    }
  }

  const LoadUserCount = async () => {
    try {
      const data: any = {
        "FirstName": null,
        "LastName": null,
        "EmailID": null,
        "SortOrder": "ASC",
        "SortExpression": null,
        "PageSize": null,
        "CurrentPage": null
      }
      const userData = await callApi(`${baseUrl}manageUser/loadUsersTable`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      //const userData =  await callApi('http://localhost:4000/manageUser/loadUsersTable', 'POST',data,headers);
      const [totalCount] = userData;
      setTotalUserCount(totalCount.TotalRecords)
      setPageCount(Math.ceil(totalCount.TotalRecords / 10))
      console.log('totalCount-----', userData);

    } catch (err) {
      console.log("call api err", err);
    }
  }


  const LoadProfiles = async () => {
    const token = await localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    console.log('token=================>', token)

    setLoading(true)
    const data: any = {
      "SortExpression": "Name",
      "SortOrder": "ASC",
      "PageSize": null,
      "CurrentPage": null
    }
    try {
      const profileData = await callApi(`${baseUrl}manageProfile/loadProfiles`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      //const profileData =  await callApi('http://localhost:4000/manageProfile/loadProfiles', 'POST',data,headers);
      console.log("profileData", profileData);

      setProfiles(profileData)
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
      toast("Something went wrong", { theme: 'light', type: 'error' })
    }
  }

  const deleteUser = async (data: any) => {

    try {
      setLoading(true)
      const userData = await callApi(`${baseUrl}manageUser/deleteUser`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      //const userData =  await callApi('http://localhost:4000/manageUser/deleteUser', 'POST',data,headers);
      console.log(userData);
      await loadUserDataTable()
      await LoadUserCount()
      setLoading(false)
      // toast("User Deleted", { theme: 'light', type: 'success' })
    } catch (err) {
      console.log("call api err", err);
      toast("Something went wrong", { theme: 'light', type: 'error' })
    }
  }



  const createNewUser = async (newUser: any) => {
    setLoading(true)
    if (firstNameError || lastNameError || emailError) {
      return;
    } else {
      const data: any = {
        ProfileId: newUser.ProfileId,
        FirstName: newUser.FirstName,
        LastName: newUser.LastName,
        EmailID: newUser.EmailID,
        Password: newUser.Password,
        CreatedBy: newUser.CreatedBy,
        UpdatedBy: newUser.UpdatedBy
      }
      try {
        const isDuplicate = await callApi(`${baseUrl}manageUser/checkDuplicateUser`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
        console.log(isDuplicate);

        if (!isDuplicate) {
          const userData = await callApi(`${baseUrl}manageUser/createUser`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
          console.log(userData)
        } else {
          toast("User already exist", { theme: 'light', type: 'error' })
        }
        //const userData =  await callApi('http://localhost:4000/manageUser/createUser', 'POST',data,headers)

        setOpen(false)
        await loadUserDataTable()
        await LoadUserCount()
        toast("User created successfully", { theme: 'light', type: 'success' })

      } catch (err) {
        console.log(err);
      }

    }
  }

  const editUser = async (newUser: any) => {
    setLoading(true)
    if (firstNameError || lastNameError || emailError) {
      return;
    } else {
      const data: any = {
        ProfileId: newUser.ProfileId,
        UserId: newUser.UserId,
        FirstName: newUser.FirstName,
        LastName: newUser.LastName,
        CreatedBy: newUser.CreatedBy,
        UpdatedBy: newUser.UpdatedBy
      }
      const userData = await callApi(`${baseUrl}manageUser/editUser`, 'POST', data, headers as import('axios').AxiosRequestHeaders)
        .then(() => {
          setOpen(false)
          loadUserDataTable()
          toast("User details updated successfully", { theme: 'light', type: 'success' })
        })
        .catch(() => {
          toast("Something went wrong", { theme: 'light', type: 'error' })
        })

        console.log(userData)

    }
  }

  const handleUserFilter = async (filter: any) => {
    // alert('handleUserFilter')
    setLoading(true)

    try {
      const data: any = {
        FirstName: filter.FirstName,
        LastName: filter.LastName,
        EmailID: filter.EmailId,
        SortExpression: sortExpression,
        PageSize: 10,
        CurrentPage: 1
      }
      const filterUser = await callApi(`${baseUrl}manageUser/loadUsersTable`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      setFilterData(true)
      setUserTable(prevState => ({
        ...prevState,
        rows: filterUser
      }));
      userTable.rows = filterUser.data
      setLoading(false)
      console.log("filterUser", filterUser);

    } catch (err) {
      setLoading(false)
      console.log(err)
    }
    const userData = await callApi(`${baseUrl}manageUser/loadUsersTable`, 'POST', {}, headers as import('axios').AxiosRequestHeaders);
    console.log(userData)
    axios({
      method: 'post',
      url: `${baseUrl}manageUser/loadUsersTable`,
      data: {
        "FirstName": filter.FirstName,
        "LastName": filter.LastName,
        "EmailID": filter.EmailId,
        "SortExpression": sortExpression,
        "PageSize": 10,
        "CurrentPage": 1
      },
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user") || '{}').token
      }
    })
      .then(res => {
        setFilterData(true)
        userTable.rows = res.data
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      }
      )
  };



  const handleValidation = async (newUser: any) => {
    console.log("sdfsdfsf", newUser);
    let isValid = true;
    console.log(isValid)

    if (!newUser.FirstName || newUser.FirstName.length < 1) {
      toast.error('First Name could not be empty.');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    if (!newUser.LastName || newUser.LastName.length < 1) {
      toast.error('Last Name could not be empty.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

    if (!newUser.EmailID || !/\S+@\S+\.\S+/.test(newUser.EmailID)) {
      toast.error('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!newUser?.Password || newUser?.Password?.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    // if (!newUser?.ProfileId) {
    //   toast.error('Please select a profile.');
    //   isValid = false;
    // } else {
    //   setProfileError(false);
    //   setProfileErrorMessage('');
    // }

  }

  const userContextValue = {
    formFields,
    userTable,
    handleUserFilter,
    handleValidation,
    setFirstName,
    setLastName,
    setEmailID,
    setPassword,
    setSortExpression,
    firstName,
    lastName,
    emailID,
    Password,
    sortExpression,
    loading,
    setLoading,
    pageCount,
    setPage,
    page,
    loadUserDataTable,
    createNewUser,
    LoadProfiles,
    deleteUser,
    profiles,
    open, setOpen,
    editFirstName, setEditFirstName,
    editLastName, setEditLastName,
    editEmail, setEditEmail,
    editPassword, setEditPassword,
    isEditing, setIsEditing,
    profileErrorMessage, setProfileErrorMessage,
    profileError, setProfileError,
    totalUserCount, LoadUserCount,
    sortOrder, setSortOrder,
    editProfile, setEditProfile,
    userId, setUserId,
    userProfileId, setUserProfileId,
    editUser
  }


  return (
    <UserManagerContext.Provider value={userContextValue}>
      {children}
      <ToastContainer />

    </UserManagerContext.Provider>
  );
};

export { UserManagerContext, UserManagerContextProvider };