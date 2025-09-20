import React from 'react';

interface ProjectProgress {
    status: string;
    count: number;
}

interface Props {
    data: ProjectProgress[];
}

export function ProjectProgressChart({ data }: Props) {
    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p>No project data available</p>
                </div>
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + item.count, 0);
    
    const statusColors: Record<string, string> = {
        'pending': 'text-yellow-600 bg-yellow-100',
        'in_progress': 'text-blue-600 bg-blue-100',
        'completed': 'text-green-600 bg-green-100',
        'cancelled': 'text-red-600 bg-red-100',
    };

    const statusLabels: Record<string, string> = {
        'pending': '⏳ Pending',
        'in_progress': '🔄 In Progress',
        'completed': '✅ Completed',
        'cancelled': '❌ Cancelled',
    };

    // Create pie chart using CSS conic-gradient
    let cumulativePercentage = 0;
    const gradientStops = data.map((item) => {
        const percentage = (item.count / total) * 100;
        const color = statusColors[item.status]?.includes('yellow') ? '#eab308' :
                     statusColors[item.status]?.includes('blue') ? '#3b82f6' :
                     statusColors[item.status]?.includes('green') ? '#22c55e' :
                     '#ef4444';
        
        const startPercentage = cumulativePercentage;
        cumulativePercentage += percentage;
        
        return `${color} ${startPercentage}% ${cumulativePercentage}%`;
    }).join(', ');

    return (
        <div className="space-y-6">
            {/* Pie Chart */}
            <div className="flex items-center justify-center">
                <div className="relative">
                    <div 
                        className="w-40 h-40 rounded-full border-4 border-gray-200"
                        style={{
                            background: `conic-gradient(${gradientStops})`
                        }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{total}</div>
                                <div className="text-xs text-gray-600">Projects</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3">
                {data.map((item) => {
                    const percentage = ((item.count / total) * 100).toFixed(1);
                    
                    return (
                        <div key={item.status} className="flex items-center space-x-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || 'text-gray-600 bg-gray-100'}`}>
                                {statusLabels[item.status] || item.status}
                            </div>
                            <div className="flex-1 text-right">
                                <div className="font-semibold">{item.count}</div>
                                <div className="text-xs text-gray-500">{percentage}%</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Summary */}
            <div className="text-center text-sm text-gray-600 pt-2 border-t">
                Total projects across all statuses
            </div>
        </div>
    );
}