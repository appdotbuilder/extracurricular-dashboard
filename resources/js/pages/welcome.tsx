import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Settings, CalendarDays } from 'lucide-react';

export default function Welcome() {
    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            📚 Extracurricular Management System
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Comprehensive dashboard for managing student activities, tracking progress, 
                            and fostering collaboration between advisors and members.
                        </p>
                        
                        <div className="flex justify-center gap-4 mb-16">
                            <Button size="lg" asChild>
                                <a href="/login">
                                    🚀 Get Started
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href="/register">
                                    ✨ Join Now
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🎯 Key Features
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Built for educational institutions to streamline extracurricular activities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Pembina Features */}
                        <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BarChart3 className="w-8 h-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-blue-900">📊 For Advisors (Pembina)</CardTitle>
                                <CardDescription>
                                    Complete management and monitoring tools
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-left space-y-2 text-sm text-gray-600">
                                    <li>📈 Attendance monitoring with charts</li>
                                    <li>📋 Project progress tracking</li>
                                    <li>👥 Member participation statistics</li>
                                    <li>📅 Activity schedule management</li>
                                    <li>📢 Announcement system</li>
                                    <li>📊 Data export (Excel/PDF)</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-green-900">👨‍🎓 For Members (Anggota)</CardTitle>
                                <CardDescription>
                                    Easy access to activities and progress
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-left space-y-2 text-sm text-gray-600">
                                    <li>📅 View activity schedules</li>
                                    <li>📊 Track project progress</li>
                                    <li>📢 Read important announcements</li>
                                    <li>✅ Check attendance records</li>
                                    <li>📈 Personal dashboard</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Settings className="w-8 h-8 text-purple-600" />
                                </div>
                                <CardTitle className="text-purple-900">⚙️ System Features</CardTitle>
                                <CardDescription>
                                    Modern and user-friendly interface
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-left space-y-2 text-sm text-gray-600">
                                    <li>🔒 Role-based authentication</li>
                                    <li>📱 Responsive design</li>
                                    <li>🎨 Clean, modern interface</li>
                                    <li>🔍 Advanced filtering & search</li>
                                    <li>📊 Interactive charts & visualizations</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Screenshots Section */}
                <div className="container mx-auto px-4 py-16 bg-gray-50">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            💻 Dashboard Preview
                        </h2>
                        <p className="text-gray-600">
                            Experience modern, intuitive interface design
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                                <div className="text-center">
                                    <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-2" />
                                    <p className="text-blue-800 font-medium">Attendance Analytics</p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pembina Dashboard</h3>
                            <p className="text-gray-600 text-sm">
                                Comprehensive analytics with bar charts, pie charts, and detailed member management.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4">
                                <div className="text-center">
                                    <CalendarDays className="w-16 h-16 text-green-600 mx-auto mb-2" />
                                    <p className="text-green-800 font-medium">Activity Schedule</p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Anggota Dashboard</h3>
                            <p className="text-gray-600 text-sm">
                                Clean, focused view of upcoming activities, project status, and announcements.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🎓 Ready to Get Started?
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Join our platform and experience seamless extracurricular management.
                        </p>
                        
                        <div className="flex justify-center gap-4">
                            <Button size="lg" asChild>
                                <a href="/login">
                                    🔑 Login
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href="/register">
                                    📝 Register
                                </a>
                            </Button>
                        </div>
                        
                        <div className="mt-8 text-sm text-gray-500">
                            <p>Demo credentials available after registration</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}