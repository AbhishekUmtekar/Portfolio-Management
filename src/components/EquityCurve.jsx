import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, ReferenceLine } from 'recharts';
import { format } from 'date-fns';

const EquityCurve = ({ equityData, drawdownData }) => {
    const [dateRange, setDateRange] = useState({
        from: equityData[0]?.date || new Date(),
        to: equityData[equityData.length - 1]?.date || new Date()
    });

    const filteredData = equityData
        .map((item, index) => ({
            date: item.date.getTime(),
            equity: item.value,
            nifty: item.value * 0.85,
            drawdown: drawdownData[index]?.drawdown || 0,
            dateLabel: format(item.date, 'yyyy-MM-dd')
        }))
        .filter(item => item.date >= dateRange.from.getTime() && item.date <= dateRange.to.getTime());

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 sm:p-3 border rounded shadow-lg">
                    <p className="text-xs sm:text-sm font-medium mb-1">{payload[0].payload.dateLabel}</p>
                    <p className="text-xs sm:text-sm text-green-600">
                        Focused: {payload[0].value.toFixed(2)}
                    </p>
                    {payload[1] && (
                        <p className="text-xs sm:text-sm text-blue-600">
                            NIFTY50: {payload[1].value.toFixed(2)}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    const handleReset = () => {
        setDateRange({
            from: equityData[0]?.date || new Date(),
            to: equityData[equityData.length - 1]?.date || new Date()
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 sm:p-6 border-b border-gray-200 gap-4">
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Equity curve</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Live since 2019-01-01
                        <button
                            className="ml-2 text-teal-600 hover:text-teal-700 text-xs"
                            onClick={handleReset}
                        >
                            ↻ Reset
                        </button>
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-sm w-full lg:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">From date</span>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 sm:flex-none"
                            value={format(dateRange.from, 'yyyy-MM-dd')}
                            onChange={(e) => setDateRange({ ...dateRange, from: new Date(e.target.value) })}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">To date</span>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 sm:flex-none"
                            value={format(dateRange.to, 'yyyy-MM-dd')}
                            onChange={(e) => setDateRange({ ...dateRange, to: new Date(e.target.value) })}
                        />
                    </div>
                </div>
            </div>

            <div className="p-2 sm:p-4 lg:p-6">
                <ResponsiveContainer width="100%" height={300} className="sm:h-[350px] lg:h-[450px]">
                    <ComposedChart data={filteredData}>
                        <defs>
                            <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fca5a5" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#fca5a5" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis
                            dataKey="date"
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM yy')}
                            stroke="#999"
                            tick={{ fontSize: 10 }}
                            className="sm:text-xs"
                        />
                        <YAxis
                            yAxisId="left"
                            stroke="#999"
                            tick={{ fontSize: 10 }}
                            className="sm:text-xs"
                            domain={[-80, 550]}
                            ticks={[-50, 0, 50, 100, 200, 300, 400, 550]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={-50} stroke="#000" strokeDasharray="3 3" isFront={false} />
                        <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" isFront={false} />
                        <ReferenceLine y={50} stroke="#000" strokeDasharray="3 3" isFront={false} />
                        <ReferenceLine y={100} stroke="#000" strokeDasharray="3 3" isFront={false} />
                        <ReferenceLine y={200} stroke="#000" strokeDasharray="3 3" isFront={false} />
                        <ReferenceLine y={300} stroke="#000" strokeDasharray="3 3" isFront={false} />
                        <ReferenceLine y={400} stroke="#000" strokeDasharray="3 3" isFront={false} />
                        <ReferenceLine y={550} stroke="#000" strokeDasharray="3 3" isFront={false} />

                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="drawdown"
                            stroke="#ef4444"
                            strokeWidth={1.5}
                            fill="url(#colorDrawdown)"
                            fillOpacity={1}
                            baseValue={0}
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="equity"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={false}
                            name="Focused"
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="nifty"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            name="NIFTY50"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EquityCurve;