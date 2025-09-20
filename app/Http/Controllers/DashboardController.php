<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Announcement;
use App\Models\Attendance;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard.
     */
    public function index()
    {
        $user = Auth::user();
        
        if ($user->isPembina()) {
            return $this->pembinaView();
        }
        
        return $this->anggotaView();
    }
    
    /**
     * Show Pembina dashboard view.
     */
    protected function pembinaView()
    {
        // Attendance statistics for bar chart
        $attendanceStats = Attendance::selectRaw('
            users.name as user_name,
            COUNT(CASE WHEN attendances.status = "present" THEN 1 END) as present,
            COUNT(CASE WHEN attendances.status = "late" THEN 1 END) as late,
            COUNT(CASE WHEN attendances.status = "absent" THEN 1 END) as absent
        ')
        ->join('users', 'attendances.user_id', '=', 'users.id')
        ->where('users.role', 'anggota')
        ->groupBy('users.id', 'users.name')
        ->get();

        // Project progress for pie chart
        $projectProgress = Project::selectRaw('
            status,
            COUNT(*) as count
        ')
        ->groupBy('status')
        ->get();

        // Member participation stats
        $memberStats = [
            'total_members' => User::anggota()->count(),
            'active_projects' => Project::whereIn('status', ['in_progress', 'pending'])->count(),
            'completed_projects' => Project::where('status', 'completed')->count(),
            'upcoming_activities' => Activity::where('start_time', '>', now())->published()->count(),
        ];

        // Recent activities
        $activities = Activity::with('creator')
            ->latest()
            ->take(5)
            ->get();

        // Recent announcements
        $announcements = Announcement::with('creator')
            ->published()
            ->latest()
            ->take(5)
            ->get();

        // Members list
        $members = User::anggota()
            ->withCount(['assignedProjects', 'attendances'])
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('dashboard', [
            'role' => 'pembina',
            'attendanceStats' => $attendanceStats,
            'projectProgress' => $projectProgress,
            'memberStats' => $memberStats,
            'activities' => $activities,
            'announcements' => $announcements,
            'members' => $members,
        ]);
    }
    
    /**
     * Show Anggota dashboard view.
     */
    protected function anggotaView()
    {
        $user = Auth::user();
        
        // User's upcoming activities
        $upcomingActivities = Activity::published()
            ->where('start_time', '>', now())
            ->orderBy('start_time')
            ->take(5)
            ->get();

        // User's projects
        $userProjects = Project::where('assigned_to', $user->id)
            ->with('creator')
            ->latest()
            ->take(5)
            ->get();

        // Recent announcements
        $announcements = Announcement::with('creator')
            ->published()
            ->latest()
            ->take(5)
            ->get();

        // User's attendance summary
        $userAttendanceStats = Attendance::where('user_id', $user->id)
            ->selectRaw('
                status,
                COUNT(*) as count
            ')
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();

        return Inertia::render('dashboard', [
            'role' => 'anggota',
            'upcomingActivities' => $upcomingActivities,
            'userProjects' => $userProjects,
            'announcements' => $announcements,
            'userAttendanceStats' => $userAttendanceStats,
        ]);
    }
}