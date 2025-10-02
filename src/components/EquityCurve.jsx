import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, ReferenceLine } from 'recharts';
import { format } from 'date-fns';

const EquityCurve = ({ equityData, drawdownData }) => {
    const [dateRange, setDateRange] = useState({
        from: equityData[0]?.date || new Date(),
        to: equityData[equityData.length - 1]?.date || new Date()
    });

    // Filter data based on date range
    const filteredData = equityData
        .map((item, index) => ({
            date: item.date.getTime(),
            equity: item.value,
            nifty: item.value * 0.85, // Mock NIFTY50 data
            drawdown: drawdownData[index]?.drawdown || 0,
            dateLabel: format(item.date, 'yyyy-MM-dd')
        }))
        .filter(item => item.date >= dateRange.from.getTime() && item.date <= dateRange.to.getTime());

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border rounded shadow-lg">
                    <p className="text-sm font-medium mb-1">{payload[0].payload.dateLabel}</p>
                    <p className="text-sm text-green-600">
                        Focused: {payload[0].value.toFixed(2)}
                    </p>
                    {payload[1] && (
                        <p className="text-sm text-blue-600">
                            NIFTY50: {payload[1].value.toFixed(2)}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    // Reset date range to default
    const handleReset = () => {
        setDateRange({
            from: equityData[0]?.date || new Date(),
            to: equityData[equityData.length - 1]?.date || new Date()
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Equity curve</h2>
                    <p className="text-sm text-gray-500 mt-1">Live since 2019-01-01
                        <button
                            className="ml-2 text-teal-600 hover:text-teal-700 text-xs"
                            onClick={handleReset}
                        >
                            ↻ Reset
                        </button>
                    </p>
                </div>
                <div className="flex space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">From date</span>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={format(dateRange.from, 'yyyy-MM-dd')}
                            onChange={(e) => setDateRange({ ...dateRange, from: new Date(e.target.value) })}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">To date</span>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={format(dateRange.to, 'yyyy-MM-dd')}
                            onChange={(e) => setDateRange({ ...dateRange, to: new Date(e.target.value) })}
                        />
                    </div>
                </div>
            </div>

            <div className="p-6">
                <ResponsiveContainer width="100%" height={450}>
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
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            yAxisId="left"
                            stroke="#999"
                            tick={{ fontSize: 12 }}
                            domain={[-80, 600]}
                            ticks={[-50, -20, 0, 50, 100, 200, 300, 400, 550]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={-50} stroke="#000" strokeDasharray="3 3" isFront={false} />
                        <ReferenceLine y={-20} stroke="#000" strokeDasharray="3 3" isFront={false} />
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
                            strokeWidth={2.5}
                            dot={false}
                            name="Focused"
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="nifty"
                            stroke="#3b82f6"
                            strokeWidth={2.5}
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