import React from 'react';

interface AttendanceStat {
    user_name: string;
    present: number;
    late: number;
    absent: number;
}

interface Props {
    data: AttendanceStat[];
}

export function AttendanceChart({ data }: Props) {
    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p>No attendance data available</p>
                </div>
            </div>
        );
    }

    // Find the maximum value to scale the bars
    const maxValue = Math.max(
        ...data.map(item => item.present + item.late + item.absent)
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Late</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Absent</span>
                </div>
            </div>
            
            <div className="space-y-4">
                {data.slice(0, 8).map((item, index) => {
                    const total = item.present + item.late + item.absent;
                    const presentWidth = total > 0 ? (item.present / maxValue) * 100 : 0;
                    const lateWidth = total > 0 ? (item.late / maxValue) * 100 : 0;
                    const absentWidth = total > 0 ? (item.absent / maxValue) * 100 : 0;
                    
                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium truncate max-w-32">
                                    {item.user_name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {total} total
                                </span>
                            </div>
                            <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500"
                                    style={{ width: `${presentWidth}%` }}
                                ></div>
                                <div 
                                    className="absolute left-0 top-0 h-full bg-yellow-500 transition-all duration-500"
                                    style={{ 
                                        width: `${lateWidth}%`,
                                        left: `${presentWidth}%`
                                    }}
                                ></div>
                                <div 
                                    className="absolute left-0 top-0 h-full bg-red-500 transition-all duration-500"
                                    style={{ 
                                        width: `${absentWidth}%`,
                                        left: `${presentWidth + lateWidth}%`
                                    }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>✅ {item.present}</span>
                                <span>⏰ {item.late}</span>
                                <span>❌ {item.absent}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {data.length > 8 && (
                <div className="text-center text-sm text-gray-500 pt-2">
                    Showing top 8 members. Total: {data.length} members
                </div>
            )}
        </div>
    );
}