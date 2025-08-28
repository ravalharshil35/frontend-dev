import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import roles from '../utility/roles';
import { ProfileManagerContext } from '../context/profileContext';
import LeftPanel from './LeftPanel';
import PageTitle from './PageTitle';
import { toast } from 'react-toastify';
import { callApi } from '../utility/callAPI';
const baseUrl = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')

// interface Profile {
//   id: string;
//   name: string;
// }

export default function EditProfileLayout() {
    //const [open, setOpen] = React.useState(false);
    //const [loading, setLoading] = React.useState(false);
    const [profileData, setProfileData] = React.useState([])
    const currentEditAccessgroup = Number(sessionStorage.getItem("currentEditAccessgroup") || 0);
    const isSystem = sessionStorage.getItem("isSystem")
    const [checkedRoles, setCheckedRoles] = React.useState<Record<string, string[]>>({});
    const navigate = useNavigate();


    const { profileTable, setLoading, loading }: any = React.useContext(ProfileManagerContext);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        let selectedRoll: number[] = [];

        Object.entries(checkedRoles).forEach(([group, roleKeys]) => {
            //const allRoles = React.useMemo(() => roles(), []); // ← group should match key from allRoles
            const roleGroup = allRoles[group as keyof typeof allRoles];
            if (!roleGroup) {
                console.warn(`Group '${group}' not found in allRoles`);
                return;
            }

            roleKeys.forEach((roleKey) => {
                const roleVal = (roleGroup as Record<string, number>)[roleKey];
                if (typeof roleVal === "number") {
                    selectedRoll.push(roleVal);
                } else {
                    console.warn(`Role '${roleKey}' not found in group '${group}'`);
                }
            });
        });

        const accessGroupSum = selectedRoll.reduce((a, b) => a + b, 0);
        console.log("Final AccessGroup1:", accessGroupSum);

        const data: any = {
            AccessGroup1: accessGroupSum,
            ProfileId: sessionStorage.getItem("currentEditProfile"),
        };

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            setLoading(true)
            await callApi(`${baseUrl}manageProfile/editProfile`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
            sessionStorage.removeItem("currentEditProfile");
            sessionStorage.removeItem("currentEditAccessgroup");
            toast.success("Profile updated successfully!");
            navigate('/profilemanager');
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error("Failed to update profile", err);
            toast.error("Error updating profile");
        }
    };

    const allRoles = React.useMemo(() => roles(), []);
    console.log("allRoles====>", allRoles);

    React.useEffect(() => {
        setProfileData(profileTable)
    }, [profileTable])
    const location = useLocation();
    console.log(profileData);

    const heading = location.state.key;
    //const isSystem = location.state?.isSystem;
    console.log('isSystem', isSystem);
    const title = isSystem ? "Profile Details" : "Edit Profile";




    // console.log('selectAll',selectAll)

    const handleRoleCheck = (group: string, roleKey: string, isChecked: boolean) => {
        setCheckedRoles((prev) => {
            const updated = new Set(prev[group] || []);
            if (isChecked) {
                updated.add(roleKey);
            } else {
                updated.delete(roleKey);
            }
            return { ...prev, [group]: Array.from(updated) };
        });
    };

    const handleAllCheckRoles = (group: string) => {
        const roleKeys = Object.keys(allRoles[group as keyof typeof allRoles]);
        const current = checkedRoles[group] || [];

        const isAllSelected = current.length === roleKeys.length;
        setCheckedRoles((prev) => ({
            ...prev,
            [group]: isAllSelected ? [] : [...roleKeys],
        }));
    };

    // const allChecked: any = {}
    React.useEffect(() => {
        const initialChecked: Record<string, string[]> = {};

        Object.entries(allRoles).forEach(([groupName, roleMap]) => {
            const groupKey = groupName;
            initialChecked[groupKey] = [];

            Object.entries(roleMap).forEach(([roleKey, roleValue]) => {
                if ((roleValue & currentEditAccessgroup) === roleValue) {
                    initialChecked[groupKey].push(roleKey);
                }
            });


        });
        console.log("initialChecked===", initialChecked)
        setCheckedRoles(initialChecked);
    }, [allRoles, currentEditAccessgroup]);

    return (
        <Box sx={{ display: 'flex', mt: 6 }}>
            <CssBaseline />
            <LeftPanel />
            <Box component="main" sx={{ flexGrow: 1, p: 3, verticalAlign: 'center', alignItems: 'center' }}>
                <PageTitle props={title} />

                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex' }}
                    noValidate
                    autoComplete="off"
                >
                </Box>

                <Typography variant="h5" component="h5" >
                    {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </Typography>

                <Divider sx={{ mt: 2 }} />
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">

                            <TableBody>
                                {Object.entries(allRoles).map(([groupName, roles]) => {
                                    if (typeof roles !== 'object' || roles === null) {
                                        console.warn(`Invalid roles for group ${groupName}`, roles);
                                        return null;
                                    }

                                    const groupKey = groupName;
                                    const groupChecked = checkedRoles[groupKey] || [];
                                    const roleKeys = Object.keys(roles);

                                    return (
                                        <TableRow key={groupKey}>
                                            <TableCell>
                                                <Typography>{groupName}</Typography>
                                            </TableCell>

                                            {roleKeys.map((roleKey) => (
                                                <TableCell key={roleKey}>
                                                    <Checkbox
                                                        name={`${groupKey}_${roleKey}`}
                                                        //defaultChecked={(key[1] & currentEditAccessgroup) === key[1]}
                                                        checked={groupChecked.includes(roleKey)}
                                                        onChange={(e) =>
                                                            handleRoleCheck(groupKey, roleKey, e.target.checked)
                                                        }
                                                    />
                                                    <label>{roleKey.replace(/([A-Z])/g, ' $1')}</label>
                                                </TableCell>
                                            ))}

                                            <TableCell>
                                                <Checkbox
                                                    checked={groupChecked.length === roleKeys.length}
                                                    indeterminate={
                                                        groupChecked.length > 0 && groupChecked.length < roleKeys.length
                                                    }
                                                    onChange={() => handleAllCheckRoles(groupKey)}
                                                />
                                                Select All
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>

                    {!isSystem &&
                        <Box>
                            <Button
                                sx={{ mt: 2 }}
                                variant="contained"
                                type="submit"
                                disabled={!sessionStorage.getItem("currentEditProfile")}
                            >
                                Submit
                            </Button>
                        </Box>
                    }
                </Box>
            </Box>
            {loading ?
                <Spinner /> :
                <></>
            }
        </Box>
    );
}
