import React from 'react';

const TrailingReturns = ({ returns }) => {
    const formatReturn = (value) => {
        return value ? `${value > 0 ? '' : ''}${value.toFixed(1)}%` : 'N/A';
    };

    const getColorClass = (value) => {
        if (value > 0) return 'text-green-600';
        if (value < 0) return 'text-red-600';
        return 'text-gray-900';
    };

    const metrics = [
        { key: 'YTD', label: 'YTD' },
        { key: '1D', label: '1D' },
        { key: '1W', label: '1W' },
        { key: '1M', label: '1M' },
        { key: '3M', label: '3M' },
        { key: '6M', label: '6M' },
        { key: '1Y', label: '1Y' },
        { key: '3Y', label: '3Y' },
        { key: 'SI', label: 'SI' },
    ];

    // Additional metrics for display
    const additionalMetrics = [
        { key: 'DD', label: 'DD' },
        { key: 'MAXDD', label: 'MAXDD' }
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Trailing Returns</h2>
                <button className="text-teal-600 hover:text-teal-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                NAME
                            </th>
                            {[...metrics, ...additionalMetrics].map(metric => (
                                <th key={metric.key} className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    {metric.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr className="border-b border-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Focused
                            </td>
                            {metrics.map(metric => (
                                <td key={metric.key} className={`px-4 py-4 whitespace-nowrap text-sm text-center font-medium ${getColorClass(returns[metric.key])}`}>
                                    {formatReturn(returns[metric.key])}
                                </td>
                            ))}
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-medium text-red-600">
                                -2.8%
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-medium text-red-600">
                                -40.3%
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                NIFTY50
                            </td>
                            {metrics.map(metric => (
                                <td key={metric.key} className="px-4 py-4 whitespace-nowrap text-sm text-center font-medium text-green-600">
                                    {metric.key === 'YTD' ? '3.1%' :
                                        metric.key === '1D' ? '0.1%' :
                                            metric.key === '1W' ? '1.1%' :
                                                metric.key === '1M' ? '1.4%' :
                                                    metric.key === '3M' ? '4.4%' :
                                                        metric.key === '6M' ? '16.2%' :
                                                            metric.key === '1Y' ? '26.2%' :
                                                                metric.key === '3Y' ? '16.0%' : '14.5%'}
                                </td>
                            ))}
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-medium text-red-600">
                                -1.5%
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-medium text-red-600">
                                -38.4%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-500">Note: Returns above 1 year are annualised.</p>
            </div>
        </div>
    );
};

export default TrailingReturns;