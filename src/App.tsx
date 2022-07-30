import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

// import { CalendarChinese } from "date-chinese";

import DateChinese from "./libs/DateChinese";

interface BigDayProps {
	displayDate: Date
}

function BigDay({ displayDate }: BigDayProps) {
	const dateChinese = new DateChinese(displayDate)

	return (
		<React.Fragment>
			<Stack direction="column" alignItems="center">
				<Typography variant="h1">{displayDate.getDate()}</Typography>
				<pre>{JSON.stringify(dateChinese, null, "\t")}</pre>
			</Stack>
		</React.Fragment>
	)
}

export default function App() {
	const [displayDate, setdisplayDate] = React.useState(new Date());
	const defaultDate = displayDate.toISOString().slice(0, 10);

	const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const inputDate = new Date(e.target.value);
		if (isValidDateInstance(inputDate)) {
			setdisplayDate(inputDate);
		} else {
			// console.log("not a date")
		}
	}

	return (
		<Container maxWidth="sm">
			<Stack direction="column" alignItems="center">
				<Box sx={{ my: 4 }}>
					<TextField
						id="date"
						label="Date"
						type="date"
						defaultValue={defaultDate}
						onChange={handleDateChange}
					/>
				</Box>
				<BigDay displayDate={displayDate} />
			</Stack>
		</Container>
	);
}

function isValidDateInstance(d: any) {
	return d instanceof Date && !isNaN(d.getTime());
}
