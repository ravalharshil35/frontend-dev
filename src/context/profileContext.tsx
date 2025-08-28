import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../utility/callAPI';
import { toast } from 'react-toastify';
// Create the context
const ProfileManagerContext = createContext({});
const baseUrl = import.meta.env.VITE_API_BASE_URL
// Create a provider component
const ProfileManagerContextProvider = ({ children }: any) => {
  const [loading, setLoading] = React.useState(false)
  const [currentEditAccessGroup, setCurrentEditAccessGroup] = React.useState(null)
  const [pageCount, setPageCount] = useState<any>(1)
  const [totalProfileCount, setTotalProfileCount] = useState('')
  const [sortExpression, setSortExpression] = useState('Name')
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  const navigate = useNavigate()
  const formFields = {
    filters: [
      {
        label: 'First Name',
        fieldName: 'FirstName',
        type: 'text',
        name: ' First Name'
      },
      {
        label: 'Last Name',
        fieldName: 'LastName',
        type: 'text',
        name: 'lastName'
      },
      {
        label: 'Email Id',
        fieldName: 'EmailId',
        type: 'text',
        name: 'emailId'
      }
    ],
    createProfileInputs: [
      {
        label: 'First Name',
        fieldName: 'FirstName',
        type: 'text',
        name: ' First Name'
      },
      {
        label: 'Last Name',
        fieldName: 'LastName',
        type: 'text',
        name: 'lastName'
      },
      {
        label: 'Email Id',
        fieldName: 'EmailID',
        type: 'text',
        name: 'EmailID'
      },
      {
        label: 'Password',
        fieldName: 'Password',
        type: 'password',
        name: 'Password'
      }
    ],
    createProfileDropDowns: []
  }

  const [profileTable, setProfileTable] = useState({
    columns: [
      { id: 'Name', label: 'Name', minWidth: 170 },
      { id: 'IsSystem', label: 'Is System', minWidth: 100 },
      { id: 'CreatedDate', label: 'Created Date', minWidth: 100 },
      { id: 'CreatedDate', label: 'Updated Date', minWidth: 100 }
    ],
    rows: [],
  })

  const LoadProfileDataTable = async (data: any) => {
    const token = await localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    console.log('token=================>', token)
    try {

      setLoading(true)
      const userData = await callApi(`${baseUrl}manageProfile/loadProfiles`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      //const userData = await callApi('http://localhost:4000/manageProfile/loadProfiles','POST', data, headers);
      profileTable.rows = userData

      setProfileTable(prevState => ({
        ...prevState,
        rows: userData
      }));
      setLoading(false)
    } catch (err) {
      console.log("call api err", err);
    }
  }


  const LoadProfileCount = async () => {
    const token = await localStorage.getItem('token')
    console.log(token);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const data: any = {
        SortExpression: null,
        PageSize: null,
        SortOrder: 'ASC',
        CurrentPage: null
      }
      const profileData = await callApi(`${baseUrl}manageProfile/loadProfiles`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      //const profileData = await callApi('http://localhost:4000/manageProfile/loadProfiles', 'POST', data, headers);
      console.log("profileData====", profileData)
      const [totalCount] = profileData
      setPageCount(Math.ceil(totalCount.TotalRecords / 10))
      setTotalProfileCount(totalCount.TotalRecords)
    } catch (err) {
      console.log("call api err", err);
    }
  }


  const deleteProfile = async (data: any) => {
    setLoading(true)

    try {
      const userData = await callApi(`${baseUrl}manageProfile/deleteProfile`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      // const userData = await callApi('http://localhost:4000/manageProfile/deleteProfile', 'POST', data);
      profileTable.rows = userData
      console.log(userData);
      const paramData = {
        SortExpression: sortExpression,
        SortOrder: "ASC",
        PageSize: 10,
        CurrentPage: 1
      }
      LoadProfileDataTable(paramData)
      toast("Record deleted", { theme: 'light', type: 'success' })
    } catch (err) {
      console.log("call api err", err);
      toast("Something went wrong", { theme: 'light', type: 'error' })
    }
  }



  const handleCreateProfileSubmit = async (profileForm: any) => {
    setLoading(true)
    setCurrentEditAccessGroup(profileForm.AccessGroup1)
    sessionStorage.setItem("currentEditAccessgroup", profileForm.AccessGroup1)
    const data = {
      Name: profileForm.ProfileName,
      AccessGroup1: profileForm.AccessGroup1,
      IsSystem: 0,
      IsRelated: 0,
      IsDeleted: 0,
      CreatedBy: profileForm.CreatedBy,
      UpdatedBy: profileForm.UpdatedBy
    }
    try {
      const createProfile = await callApi(`${baseUrl}manageProfile/createProfile`, 'POST', data as any, headers as import('axios').AxiosRequestHeaders);
      console.log("res.response create profile", createProfile.data);
      sessionStorage.setItem("currentEditProfile", profileForm.Id)
      sessionStorage.setItem("currentEditAccessgroup", profileForm.AccessGroup1)

      navigate('/editProfile', { state: { key: profileForm.ProfileName } })
      toast("Profile created successfully", { theme: 'light', type: 'success' })
      const res = await axios.post(`${baseUrl}manageProfile/createProfile`, {
        //const res = await axios.post('http://localhost:4000/manageProfile/createProfile', {
        Name: profileForm.ProfileName,
        AccessGroup1: profileForm.AccessGroup1,
        IsSystem: 0,
        IsRelated: 0,
        IsDeleted: 0,
        CreatedBy: profileForm.CreatedBy,
        UpdatedBy: profileForm.UpdatedBy
      }, {
        headers: { accept: '*/*' }
      });
      console.log("res.response create profile", res.data);
      sessionStorage.setItem("currentEditProfile", profileForm.Id)
      sessionStorage.setItem("currentEditAccessgroup", profileForm.AccessGroup1)

      navigate('/editProfile', { state: { key: profileForm.ProfileName } })
      toast("Profile created successfully", { theme: 'light', type: 'success' })
    } catch (error) {
      toast("Error creating profile", { theme: 'light', type: 'error' })
      console.error("Error creating profile:", error);
    }
  };
  console.log("currentEditAccessGroup in context", currentEditAccessGroup);

  const profileContextValue = {
    formFields,
    profileTable,
    handleCreateProfileSubmit,
    loading,
    setLoading,
    currentEditAccessGroup,
    LoadProfileDataTable,
    deleteProfile,
    LoadProfileCount,
    pageCount, totalProfileCount,
    sortExpression, setSortExpression
  }
  return (
    <ProfileManagerContext.Provider value={profileContextValue}>
      {children}
    </ProfileManagerContext.Provider>
  );
};

export { ProfileManagerContext, ProfileManagerContextProvider };