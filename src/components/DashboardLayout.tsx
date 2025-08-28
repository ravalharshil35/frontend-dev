import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import DataTable from './DataTable';
import PopupDialog from '../components/PopupDialog';
import { UserManagerContext } from '../context/userContext';
import LeftPanel from './LeftPanel';
import { ToastContainer } from 'react-toastify';
import PageTitle from './PageTitle';
import styles from '../styles/Users.module.css';


export default function DashboardLayout() {

    //const [loading, setLoading] = React.useState(false);

    const {
        formFields,
        handleUserFilter,
        setFirstName,
        setLastName,
        setPassword,
        setEmailID,
        loading,
    }: any = React.useContext(UserManagerContext);

    const navigate = useNavigate();
    console.log(navigate)

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filter: any = {}
        for (let [key, value] of formData.entries()) {
            filter[key] = value;
        }
        console.log("filter", filter)
        setFirstName(filter.FirstName),
            setLastName(filter.LastName),
            setEmailID(filter.EmailId),
            setPassword(filter.Password),
            handleUserFilter(filter)
    };

    const resetFilter = () => {
        (document.getElementById("userFilterForm") as HTMLFormElement)?.reset();
        handleSubmit({ preventDefault: () => { } });
    }


    const title = "Users"
    return (
        <Box sx={{ display: 'flex', mt: 6 }}>
            <CssBaseline />
            <LeftPanel />
            <Box component="main" sx={{ flexGrow: 1, p: 3, verticalAlign: 'center', alignItems: 'center' }}>
                <PageTitle className={styles.title} props={title} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { width: '22ch' }, display: 'flex', gap: '10px' }}
                        noValidate
                        autoComplete="off"
                        id="userFilterForm"
                        onSubmit={handleSubmit}
                    >
                        {
                            formFields?.filters?.map((item: any) => {
                                return (
                                    <Input className={styles.filterInput}
                                        placeholder={item?.label}
                                        id="outlined-size-small"
                                        type={item?.type}
                                        name={item?.fieldName} />

                                );
                            })
                        }


                        <Button variant="contained" type="submit" style={{ width: 'auto' }}>Search</Button>
                        <Button variant="contained" style={{ width: 'auto' }} className={styles.reset_button} onClick={resetFilter}>Reset</Button>
                    </Box>
                    <PopupDialog />
                </Box>
                <Divider sx={{ mt: 2 }} />
                <DataTable />
            </Box>
            {loading ?
                <Spinner /> :
                <></>
            }
            <ToastContainer />
        </Box>
    );
}
