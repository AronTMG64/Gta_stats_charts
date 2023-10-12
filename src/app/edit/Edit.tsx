import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"; 
import { Stats, saveStats } from "../utils/localstorage";
import { useState } from "react";



export default function Edit() {
  const [day, setDay] = useState('');
  const [hours, setHours] = useState(0);
  const [level, setLevel] = useState(0);
  const [cayoPericoHeist, setCayoPericoHeist] = useState(0);
  const [payphoneHit, setPayphoneHit] = useState(0);
  const [drDreContract, setDrDreContract] = useState(0);

  const stats: Stats[] = [{
    day: day,
    hours: hours,
    income: {
      cayoPericoHeist: cayoPericoHeist,
      payphoneHit: payphoneHit,
      drDreContract: drDreContract
    },
    level: level
  }];

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
  };


  return (
    <FormControl className="gap-2">
      <InputLabel id="day-select-label">Day</InputLabel>
        <Select
          labelId="day-select-label"
          id="day-select"
          value={day}
          label="Day"
          onChange={handleChange}
        >
          <MenuItem value={'Monday'}>Monday</MenuItem>
          <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
          <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
          <MenuItem value={'Thursday'}>Thursday</MenuItem>
          <MenuItem value={'Friday'}>Friday</MenuItem>
          <MenuItem value={'Saturday'}>Saturday</MenuItem>
          <MenuItem value={'Sunday'}>Sunday</MenuItem>
        </Select>
      <Box className="flex gap-2">
        <TextField onChange={e => setHours(parseFloat(e.target.value))} type="number" variant="outlined" label="Hours" />
        <TextField onChange={e => setLevel(parseFloat(e.target.value))} type="number" variant="outlined" label="Level" />
      </Box>
      <Typography variant="h6">Income</Typography>
      <TextField onChange={e => setCayoPericoHeist(parseFloat(e.target.value))} type="number" variant="outlined" label="Cayo Perico Heist" />
      <TextField onChange={e => setPayphoneHit(parseFloat(e.target.value))} type="number" variant="outlined" label="Payphone Hit" />
      <TextField onChange={e => setDrDreContract(parseFloat(e.target.value))} type="number" variant="outlined" label="Dr. Dre Contract" />
      <Button onClick={e => saveStats(e, stats)} variant="contained">Save</Button>
    </FormControl>
  );
};