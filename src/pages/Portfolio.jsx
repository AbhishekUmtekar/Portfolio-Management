import React, { useMemo, useState, useEffect } from 'react';
import TrailingReturns from '../components/TrailingReturns';
import EquityCurve from '../components/EquityCurve';
import {
    parseNavData,
    calculateTrailingReturns,
    calculateEquityCurve,
    calculateDrawdown
} from '../utils/calculations';
import { read, utils } from 'xlsx';

const Portfolio = () => {
    const [navData, setNavData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/nav.xlsx')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Excel file');
                }
                return response.arrayBuffer();
            })
            .then(buffer => {
                const workbook = read(buffer, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const json = utils.sheet_to_json(sheet, { header: 1 });

                const parsedData = json.slice(1).map(row => {
                    if (!row || !row[0] || !row[1]) return null;
                    const date = row[0].toString().trim();
                    const nav = parseFloat(row[1]);
                    if (!date.match(/^\d{2}-\d{2}-\d{4}$/) || isNaN(nav)) return null;
                    return { date, nav };
                }).filter(row => row !== null);

                console.log('Raw parsed navData:', json.slice(1));
                console.log('Processed navData:', parsedData);
                if (parsedData.length === 0) {
                    throw new Error('No valid data found in Excel sheet. Check format (DD-MM-YYYY for dates, numeric NAV).');
                }

                setNavData(parsedData);
            })
            .catch(err => {
                console.error('Fetch or parse error:', err);
                setError('Error loading NAV data from Excel: ' + err.message);
            });
    }, []);

    const processedData = useMemo(() => {
        console.log('Input to parseNavData:', navData);
        const result = parseNavData(navData);
        console.log('Output from parseNavData:', result);
        return result;
    }, [navData]);
    const trailingReturns = useMemo(() => {
        console.log('Input to calculateTrailingReturns:', processedData);
        return calculateTrailingReturns(processedData);
    }, [processedData]);
    const equityCurve = useMemo(() => calculateEquityCurve(processedData), [processedData]);
    const drawdownData = useMemo(() => calculateDrawdown(processedData), [processedData]);

    if (error) {
        return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-red-600">{error}</div>;
    }

    if (!navData.length) {
        return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading NAV data from Excel...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Statistics</h1>
                <p className="text-gray-600">Quant Active Fund - Performance Analysis (Loaded from Excel)</p>
            </div>

            <TrailingReturns returns={trailingReturns} />
            <EquityCurve equityData={equityCurve} drawdownData={drawdownData} />
        </div>
    );
};

export default Portfolio;