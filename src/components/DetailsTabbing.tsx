import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StudentData from './StudentData';
import ApplicationData from './ApplicationData';
import OrgData from './OrgData';
import styles from "../styles/StudentDetails.module.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface DetailsTabbingProps {
  onTabChange: (label: string) => void;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DetailsTabbing({ onTabChange }: DetailsTabbingProps) {
  const [value, setValue] = React.useState(0);

  const tabLabels = ['Student Details', 'Application Details', 'Org. Details'];

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange(tabLabels[newValue]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabLabels.map((label, index) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              sx={{ marginRight: 2,borderRadius:'4px' }}
              className={styles.tab}
            />
          ))}
        </Tabs>

      </Box>
      <CustomTabPanel value={value} index={0} >
        <StudentData />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ApplicationData />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <OrgData />
      </CustomTabPanel>
    </Box>
  );
}
