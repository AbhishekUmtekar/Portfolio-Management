import { parseISO, differenceInDays, subDays, subMonths, subYears, startOfYear } from 'date-fns';

export const parseNavData = (data) => {
    if (!data || data.length === 0) return [];
    return data.map(item => {
        try {
            const [day, month, year] = item.date.split('-');
            const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            return {
                date: parseISO(dateStr),
                nav: item.nav
            };
        } catch (e) {
            console.error('Error parsing date:', item.date, e);
            return null;
        }
    }).filter(item => item !== null).sort((a, b) => a.date - b.date);
};

export const calculateReturn = (startNav, endNav) => {
    if (startNav === undefined || endNav === undefined || startNav === 0) return 0;
    return ((endNav - startNav) / startNav) * 100;
};

export const getNavAtDate = (data, targetDate) => {
    if (!data || data.length === 0) return { nav: 0 };
    const sorted = [...data].sort((a, b) => Math.abs(a.date - targetDate) - Math.abs(b.date - targetDate));
    return sorted[0] || { nav: 0 };
};

export const calculateTrailingReturns = (data) => {
    if (!data || data.length < 1) return {
        'YTD': 0, '1D': 0, '1W': 0, '1M': 0, '3M': 0, '6M': 0, '1Y': 0, '3Y': 0, 'SI': 0
    };

    const sortedData = [...data].sort((a, b) => b.date - a.date);
    const latestData = sortedData[0];
    if (!latestData || latestData.nav === undefined) return {
        'YTD': 0, '1D': 0, '1W': 0, '1M': 0, '3M': 0, '6M': 0, '1Y': 0, '3Y': 0, 'SI': 0
    };

    const latestNav = latestData.nav;
    const latestDate = latestData.date;

    const oldestData = sortedData[sortedData.length - 1] || { nav: latestNav };

    const findNavForDate = (targetDate) => {
        return getNavAtDate(sortedData, targetDate).nav;
    };

    const ytdStart = startOfYear(latestDate);
    const ytdNav = findNavForDate(ytdStart);

    const returns = {
        'YTD': calculateReturn(ytdNav, latestNav),
        '1D': calculateReturn(sortedData[1]?.nav || latestNav, latestNav),
        '1W': calculateReturn(findNavForDate(subDays(latestDate, 7)), latestNav),
        '1M': calculateReturn(findNavForDate(subMonths(latestDate, 1)), latestNav),
        '3M': calculateReturn(findNavForDate(subMonths(latestDate, 3)), latestNav),
        '6M': calculateReturn(findNavForDate(subMonths(latestDate, 6)), latestNav),
        '1Y': calculateReturn(findNavForDate(subYears(latestDate, 1)), latestNav),
        '3Y': calculateReturn(findNavForDate(subYears(latestDate, 3)), latestNav),
        'SI': calculateReturn(oldestData.nav, latestNav),
    };

    return returns;
};

export const calculateEquityCurve = (data) => {
    if (!data || data.length === 0) return [];
    const sortedData = [...data].sort((a, b) => a.date - b.date);
    const baseNav = sortedData[0].nav;

    return sortedData.map(item => ({
        date: item.date,
        value: (item.nav / baseNav) * 100,
        nav: item.nav
    }));
};

export const calculateDrawdown = (data) => {
    if (!data || data.length === 0) return [];
    const sortedData = [...data].sort((a, b) => a.date - b.date);
    let peak = sortedData[0].nav;

    return sortedData.map(item => {
        if (item.nav > peak) peak = item.nav;
        const drawdown = ((item.nav - peak) / peak) * 100;
        return {
            date: item.date,
            drawdown: drawdown,
            nav: item.nav
        };
    });
};

export const calculateMonthlyReturns = (data) => {
    if (!data || data.length === 0) return [];
    const sortedData = [...data].sort((a, b) => a.date - b.date);
    const monthlyData = {};

    sortedData.forEach(item => {
        const year = item.date.getFullYear();
        const month = item.date.getMonth();
        const key = `${year}-${month}`;

        if (!monthlyData[key]) {
            monthlyData[key] = { start: item.nav, end: item.nav, year, month };
        } else {
            monthlyData[key].end = item.nav;
        }
    });

    return Object.values(monthlyData).map(item => ({
        year: item.year,
        month: item.month,
        return: calculateReturn(item.start, item.end)
    }));
};