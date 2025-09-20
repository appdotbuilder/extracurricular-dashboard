import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AttendanceChart } from '@/components/attendance-chart';
import { ProjectProgressChart } from '@/components/project-progress-chart';
import { Users, FolderOpen, CheckCircle, CalendarDays, Megaphone } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    nim?: string;
    phone?: string;
}

interface Activity {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
    status: string;
    creator: User;
}

interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    progress_percentage: number;
    due_date: string;
    creator?: User;
}

interface Announcement {
    id: number;
    title: string;
    content: string;
    priority: string;
    created_at: string;
    creator: User;
}

interface AttendanceStat {
    user_name: string;
    present: number;
    late: number;
    absent: number;
}

interface ProjectProgress {
    status: string;
    count: number;
}

interface MemberStats {
    total_members: number;
    active_projects: number;
    completed_projects: number;
    upcoming_activities: number;
}

interface Member {
    id: number;
    name: string;
    email: string;
    nim?: string;
    assigned_projects_count: number;
    attendances_count: number;
}

interface Props {
    role: 'pembina' | 'anggota';
    // Pembina props
    attendanceStats?: AttendanceStat[];
    projectProgress?: ProjectProgress[];
    memberStats?: MemberStats;
    activities?: Activity[];
    announcements?: Announcement[];
    members?: Member[];
    // Anggota props
    upcomingActivities?: Activity[];
    userProjects?: Project[];
    userAttendanceStats?: Record<string, number>;
    [key: string]: unknown;
}

export default function Dashboard({ 
    role,
    attendanceStats = [],
    projectProgress = [],
    memberStats,
    activities = [],
    announcements = [],
    members = [],
    upcomingActivities = [],
    userProjects = [],
    userAttendanceStats = {}
}: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (role === 'pembina') {
        return (
            <AppShell>
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            📊 Pembina Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Monitor and manage extracurricular activities
                        </p>
                    </div>

                    {/* Stats Cards */}
                    {memberStats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{memberStats.total_members}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Active participants
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{memberStats.active_projects}</div>
                                    <p className="text-xs text-muted-foreground">
                                        In progress or pending
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{memberStats.completed_projects}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Successfully finished
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Upcoming Activities</CardTitle>
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{memberStats.upcoming_activities}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Scheduled events
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>📈 Attendance Statistics</CardTitle>
                                <CardDescription>
                                    Member attendance tracking
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AttendanceChart data={attendanceStats} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Project Progress</CardTitle>
                                <CardDescription>
                                    Project status distribution
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProjectProgressChart data={projectProgress} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Data Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Activities */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarDays className="w-5 h-5" />
                                    Recent Activities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {activities.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No recent activities</p>
                                ) : (
                                    activities.map((activity) => (
                                        <div key={activity.id} className="border-b pb-3 last:border-b-0">
                                            <h4 className="font-medium text-sm">{activity.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1">
                                                📍 {activity.location}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatDate(activity.start_time)}
                                            </p>
                                            <Badge 
                                                variant="outline" 
                                                className={`text-xs mt-2 ${getStatusColor(activity.status)}`}
                                            >
                                                {activity.status}
                                            </Badge>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Announcements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Megaphone className="w-5 h-5" />
                                    Recent Announcements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {announcements.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No recent announcements</p>
                                ) : (
                                    announcements.map((announcement) => (
                                        <div key={announcement.id} className="border-b pb-3 last:border-b-0">
                                            <h4 className="font-medium text-sm">{announcement.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                {announcement.content.substring(0, 100)}...
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge 
                                                    variant="outline" 
                                                    className={`text-xs ${getPriorityColor(announcement.priority)}`}
                                                >
                                                    {announcement.priority}
                                                </Badge>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(announcement.created_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>

                        {/* Members Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Members Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {members.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No members found</p>
                                ) : (
                                    members.map((member) => (
                                        <div key={member.id} className="border-b pb-3 last:border-b-0">
                                            <h4 className="font-medium text-sm">{member.name}</h4>
                                            {member.nim && (
                                                <p className="text-xs text-gray-600">NIM: {member.nim}</p>
                                            )}
                                            <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                                <span>📋 {member.assigned_projects_count} projects</span>
                                                <span>✅ {member.attendances_count} attendances</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AppShell>
        );
    }

    // Anggota Dashboard
    return (
        <AppShell>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        👨‍🎓 Member Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Your extracurricular activities and progress
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-center">Present</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {userAttendanceStats.present || 0}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-center">Late</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                                {userAttendanceStats.late || 0}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-center">Absent</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold text-red-600">
                                {userAttendanceStats.absent || 0}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-center">Projects</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {userProjects.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5" />
                                Upcoming Activities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {upcomingActivities.length === 0 ? (
                                <p className="text-gray-500 text-sm">No upcoming activities</p>
                            ) : (
                                upcomingActivities.map((activity) => (
                                    <div key={activity.id} className="border-b pb-3 last:border-b-0">
                                        <h4 className="font-medium text-sm">{activity.title}</h4>
                                        <p className="text-xs text-gray-600 mt-1">
                                            📍 {activity.location}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatDate(activity.start_time)}
                                        </p>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* My Projects */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FolderOpen className="w-5 h-5" />
                                My Projects
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {userProjects.length === 0 ? (
                                <p className="text-gray-500 text-sm">No projects assigned</p>
                            ) : (
                                userProjects.map((project) => (
                                    <div key={project.id} className="border-b pb-3 last:border-b-0">
                                        <h4 className="font-medium text-sm">{project.title}</h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full" 
                                                    style={{ width: `${project.progress_percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-600">
                                                {project.progress_percentage}%
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <Badge 
                                                variant="outline" 
                                                className={`text-xs ${getStatusColor(project.status)}`}
                                            >
                                                {project.status}
                                            </Badge>
                                            <span className="text-xs text-gray-500">
                                                Due: {new Date(project.due_date).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Announcements */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Megaphone className="w-5 h-5" />
                                Announcements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {announcements.length === 0 ? (
                                <p className="text-gray-500 text-sm">No recent announcements</p>
                            ) : (
                                announcements.map((announcement) => (
                                    <div key={announcement.id} className="border-b pb-3 last:border-b-0">
                                        <h4 className="font-medium text-sm">{announcement.title}</h4>
                                        <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                                            {announcement.content}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge 
                                                variant="outline" 
                                                className={`text-xs ${getPriorityColor(announcement.priority)}`}
                                            >
                                                {announcement.priority}
                                            </Badge>
                                            <span className="text-xs text-gray-500">
                                                {new Date(announcement.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}