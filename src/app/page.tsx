"use client"

import { Box, Card, Tab, Tabs } from '@mui/material';
import Chart from './chart/Chart'
import React, { useEffect } from 'react'
import originalData from './utils/data.json'
import Edit from './edit/Edit';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{width: '100%'}}
      {...other}
    >
      {value === index && (
        <Box >
          <Card sx={{ margin: '2rem 5rem', padding: '1rem'}} variant='outlined'>{children}</Card>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export default function Home() {

  

  const [tabsvalue, setTabsValue] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [stats, setStats] = React.useState<any>(null);
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    if (localStorage.getItem('stats')) {
      setStats(JSON.parse((localStorage as any).getItem("stats")));
    };
  }, []);

  useEffect(() => {
    if (!stats) return;
    setData(originalData.map(day => day.day === stats.day ? stats : day));
  },[stats]);
  
  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!data) return 'Loading...';

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabsvalue} onChange={handleTabsChange} aria-label="basic tabs example">
          <Tab label="Hours" {...a11yProps(0)} />
          <Tab label="Income" {...a11yProps(1)} />
          <Tab label="Level" {...a11yProps(2)} />
          <Tab label="Edit" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabsvalue} index={0}>
        <Chart text='Amount of hours playing GTA V' label='Hours' data={data.map((item: any) => item.hours)} />
      </CustomTabPanel>
      <CustomTabPanel value={tabsvalue} index={1}>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Cayo Perico Heist" {...a11yProps(0)} />
              <Tab label="Payphone Hits" {...a11yProps(1)} />
              <Tab label="Dr. Dre Contract" {...a11yProps(2)} />
              <Tab label="Total" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel  value={value} index={0}>
            <Chart text='Amount of money earned on the Cayo Perico Heist' label='Income - Cayo Perico Heist' data={data.map((item: any) => item.income.cayoPericoHeist)} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Chart text='Amount of money earned on Payphone Hits' label='Income - Payphone Hits' data={data.map((item: any) => item.income.payphoneHit)} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Chart text='Amount of money earned on the Dr. Dre Contract' label='Income - Dr. Dre Contract' data={data.map((item: any) => item.income.drDreContract)} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Chart text='Total amount of money earned' label='Income - Total' data={data.map((item: any) => item.income.payphoneHit + item.income.drDreContract + item.income.cayoPericoHeist)} />
          </CustomTabPanel>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={tabsvalue} index={2}>
        <Chart text='Reputation Level' label='Level' data={data.map((item: any) => item.level)} />
      </CustomTabPanel>
      <CustomTabPanel value={tabsvalue} index={3}>
        <Edit />
      </CustomTabPanel>
    </Box>
  );
};