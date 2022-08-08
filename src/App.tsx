import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

// import { CalendarChinese } from "date-chinese";

import DateChinese from "./libs/DateChinese";

interface BigDayProps {
	dateChinese: DateChinese;
	lessBig?: boolean;
}

function BigDay({ dateChinese, lessBig = false }: BigDayProps) {
	if (lessBig) {
		return (
			<React.Fragment>
				{/* <Stack direction="column" alignItems="center"> */}
				<Stack direction="column" alignItems="center">
					<Typography variant="h4">{dateChinese.gregorianMonthName}</Typography>
					<Typography variant="h2">{dateChinese.gregorianDate}</Typography>
					<Typography variant="h6">{dateChinese.gregorianDayName}</Typography>
					<Typography variant="subtitle2">{dateChinese.monthName}{dateChinese.dateName}</Typography>
					<Typography variant="h6">{dateChinese.moonPhase}</Typography>
				</Stack>
				{/* <pre>{JSON.stringify(dateChinese, null, "\t")}</pre> */}
				{/* </Stack> */}
			</React.Fragment>
		)
	} else {
		return (
			<React.Fragment>
				{/* <Stack direction="column" alignItems="center"> */}
				<Stack direction="column" alignItems="center">
					<Typography variant="h3">{dateChinese.gregorianMonthName}</Typography>
					<Typography variant="h1">{dateChinese.gregorianDate}</Typography>
					<Typography variant="h5">{dateChinese.gregorianDayName}</Typography>
					<Typography variant="subtitle1">{dateChinese.monthName}{dateChinese.dateName}</Typography>
					<Typography variant="h5">{dateChinese.moonPhase}</Typography>
				</Stack>
				{/* <pre>{JSON.stringify(dateChinese, null, "\t")}</pre> */}
				{/* </Stack> */}
			</React.Fragment>
		)
	}
}

export default function App() {
	const [displayDate, setdisplayDate] = React.useState(new Date());
	const defaultDate = displayDate.toISOString().slice(0, 10);

	const todayChinese = new DateChinese(displayDate)
	const nextNewOrFullMoon = new DateChinese(todayChinese.nearestNewOrFullMoon(true));
	const prevNewOrFullMoon = new DateChinese(todayChinese.nearestNewOrFullMoon(false));

	const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const inputDate = new Date(e.target.value);
		if (isValidDateInstance(inputDate)) {
			setdisplayDate(inputDate);
		} else {
			// console.log("not a date")
		}
	}

	return (
		<Container>
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
				<Typography variant="h4">
					{todayChinese.gregorianYear}{todayChinese.tianganName}{todayChinese.dizhiName}
					{todayChinese.zodiac}{todayChinese.zodiacEmoji}
				</Typography>
				<Box paddingBottom={3}><BigDay dateChinese={todayChinese} /></Box>
				<Stack direction="row" alignItems="center" spacing={5}>
					<BigDay dateChinese={prevNewOrFullMoon} lessBig />
					<BigDay dateChinese={nextNewOrFullMoon} lessBig />
				</Stack>
			</Stack>
		</Container>
	);
}

function isValidDateInstance(d: any) {
	return d instanceof Date && !isNaN(d.getTime());
}
