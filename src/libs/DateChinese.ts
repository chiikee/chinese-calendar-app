import { CalendarChinese } from 'date-chinese';
// import julian from "astronomia";
import Constants from './ChineseCalendarConstants';

// this is just a dataholding structure
// all date processing will be handled by the CalendarChinese Object
// so that this object stays trim, we're not going to hold on to the instance of CalendarChinese

export default class DateChinese {
    calendarChinese = new CalendarChinese();

    gregorianYear: number;
    gregorianMonth: number;
    gregorianDate: number;
    gregorianDayName: string;
    gregorianMonthName: string;

    cycle: number;
    year: number;
    month: number;
    leap: number;
    date: number;
    tiangan = -1;
    dizhi = -1;
    solarTerm = -1;

    tianganName = "";
    dizhiName = "";
    zodiac = "";
    monthName = "";
    monthAlias = "";
    dateName = "";
    jieqi = "";
    moonPhase = "";
    zodiacEmoji = "";

    constructor(date: Date) {
        const { calendarChinese } = this;
        this.gregorianDate = date.getDate();
        this.gregorianMonth = date.getMonth() + 1;
        this.gregorianYear = date.getFullYear();
        this.gregorianDayName = Constants.DAYS[date.getDay()];
        this.gregorianMonthName = Constants.MONTHS[date.getMonth()];

        calendarChinese.fromDate(date);
        const parts = calendarChinese.get();
        this.cycle = parts[0];
        this.year = parts[1];
        this.month = parts[2];
        this.leap = parts[3];
        this.date = parts[4];
        this.dizhi = this.year % 12;
        this.tiangan = this.year % 10;

        //solarterm
        const dayOfYear = DateChinese.daysIntoYear(calendarChinese.toDate());
        const nearestSolarTerm = Math.trunc(dayOfYear / 15) - 1;
        const nearestSTJde = calendarChinese.solarTerm(nearestSolarTerm, this.gregorianYear)
        const nearestSTDate = calendarChinese.fromJDE(nearestSTJde).toDate();
        if (this.gregorianDate === nearestSTDate.getDate() &&
            this.gregorianMonth === (nearestSTDate.getMonth() + 1) &&
            this.gregorianYear === nearestSTDate.getFullYear()) {
            this.solarTerm = nearestSolarTerm < 1 ? nearestSolarTerm + 24 : nearestSolarTerm;
        }

        //names
        this.tianganName = Constants.TIAN_GAN[this.tiangan - 1];
        this.dizhiName = Constants.DI_ZHI[this.dizhi - 1];
        this.zodiac = Constants.ZODIAC[this.dizhi - 1];
        this.monthName = Constants.LUNAR_MONTHS[this.month - 1];
        this.monthAlias = Constants.LUNAR_MONTHS_ALIAS[this.month - 1];
        this.dateName = Constants.LUNAR_DATES[this.date - 1];
        this.jieqi = this.solarTerm === -1 ? "" : Constants.LUNAR_DATES[this.solarTerm - 1];
        this.moonPhase = Constants.LUNAR_PHASES_APPROXIMATE[this.date - 1];
        this.zodiacEmoji = Constants.ZODIAC_EMOJI[this.dizhi - 1];
    }

    // https://stackoverflow.com/a/40975730
    static daysIntoYear(date: Date) {
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

    nearestNewOrFullMoon(next = true): Date {
        const { gregorianDate, gregorianMonth, gregorianYear, calendarChinese } = this;
        const newDate = new Date(gregorianYear, gregorianMonth - 1, gregorianDate);
        let change = next ? 1 : -1, chineseDate: number;
        let delta = change;
        do {
            newDate.setFullYear(gregorianYear);
            newDate.setMonth(gregorianMonth - 1);
            newDate.setDate(gregorianDate + delta);
            calendarChinese.fromDate(newDate)
            chineseDate = calendarChinese.get()[4]
            delta += change;
        } while (chineseDate !== 1 && chineseDate !== 15)
        return newDate;
    }
}


// function nextLunarEvent(dateToCheck: Date): DateChinese {
//     const date = dateToCheck.getDate();
//     let increment = 1, newDate: Date;
//     do {
//         newDate =
//         chineseDate = new DateChinese(date);
//     } while ()
//     const currCD = new DateChinese(date);
//     if (currCD.date >= 15)
// }