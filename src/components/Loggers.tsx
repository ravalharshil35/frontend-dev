import React, { useEffect } from "react";
import LeftPanel from "./LeftPanel";
import styles from "../styles/Loggers.module.css";
import { StudentManagerContext } from "../context/studentContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import formatDateTime from "../utility/formatDateTime";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function Loggers() {
  const { getLogs }: any = React.useContext(StudentManagerContext);
  const [logs, setLogs] = React.useState<string[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [tabValue, setTabValue] = React.useState(0);

  const handleLogs = async () => {
    try {
      const formattedDate = formatDateTime(selectedDate, "yyyy-mm-dd");
      const cleanedLogs = await getLogs(formattedDate);

      // Always keep logs as an array
      if (Array.isArray(cleanedLogs)) {
        setLogs(cleanedLogs);
      } else {
        setLogs([]); // No logs found
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]); // Prevent crash on error
    }
  };

  // Load logs on mount & when date changes
  useEffect(() => {
    handleLogs();
  }, [selectedDate]);

  const infoLogs = (logs || []).filter((log) =>
    log.toLowerCase().includes("info")
  );
  const errorLogs = (logs || []).filter((log) =>
    log.toLowerCase().includes("error")
  );

  return (
    <div>
      <LeftPanel />
      <div className={styles.loggers_div}>
        <h1 className={styles.heading}>Logs</h1>
        <h3>Selected Date: {selectedDate.format("YYYY-MM-DD")}</h3>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => {
              if (newValue) setSelectedDate(newValue);
            }}
            format="YYYY-MM-DD"
          />
        </LocalizationProvider>

        {/* <button
          type="button"
          onClick={handleLogs}
          className={styles.get_logs_btn}
        >
          Apply
        </button> */}

        <Box sx={{ display: "block", mt: 2 }}>
          <Tabs
            orientation="horizontal"
            value={tabValue}
            onChange={(_e, newValue) => setTabValue(newValue)}
            className={styles.log_tabs_panel}
            TabIndicatorProps={{ style: { transition: "none" } }}
            selectionFollowsFocus={false} // 🚀 prevents auto scroll on change
            sx={{
              minWidth: 120,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                color: "gray",
              },
              "& .Mui-selected": {
                color: "#1976d2",
                backgroundColor: "#e3f2fd",
                borderRadius: "8px 8px 0 0",
                fontWeight: "bold",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1976d2",
                height: "3px",
              },
            }}
          >
            <Tab label={`Info (${infoLogs.length})`} className={styles.log_tab1} />
            <Tab label={`Error (${errorLogs.length})`} className={styles.log_tab2} />
          </Tabs>


          <Box sx={{ flex: 1, p: 2,overflowWrap:"break-word" }}>
            {tabValue === 0 && (
              infoLogs.length > 0 ? (
                <ul>
                  {infoLogs.map((log, i) => (
                    <li key={i} style={{ color: "green" }}>{log}</li>
                  ))}
                </ul>
              ) : <p>No info logs</p>
            )}
            {tabValue === 1 && (
              errorLogs.length > 0 ? (
                <ul>
                  {errorLogs.map((log, i) => (
                    <li key={i} style={{ color: "red" }}>{log}</li>
                  ))}
                </ul>
              ) : <p>No error logs</p>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}
