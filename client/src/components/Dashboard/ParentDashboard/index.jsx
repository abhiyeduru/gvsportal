import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getParentDashboardData, updateTuitionRequestStatus } from "@/services/tuitionServices";
import {
    Users, BookOpen, Calendar, MessageCircle, CreditCard, Search,
    ChevronRight, Star, Clock, Receipt, UserCheck, TrendingUp, Bell,
    CheckCircle, XCircle, RotateCcw, PenSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import TeacherSearch from "./TeacherSearch";

const TABS = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "search", label: "Find Teachers", icon: Search },
    { id: "tutors", label: "My Tutors", icon: Users },
    { id: "requests", label: "Requests", icon: MessageCircle },
    { id: "payments", label: "Payments", icon: CreditCard },
];

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    accepted: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    scheduled: "bg-purple-100 text-purple-800 border-purple-200",
};

const ParentDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [reviewTeacher, setReviewTeacher] = useState(null);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const queryClient = useQueryClient();

    const { data: dashboard, isLoading } = useQuery({
        queryKey: ["parent-dashboard"],
        queryFn: getParentDashboardData,
    });

    const cancelMutation = useMutation({
        mutationFn: ({ id }) => updateTuitionRequestStatus(id, { status: "cancelled" }),
        onSuccess: () => {
            toast.success("Request cancelled");
            queryClient.invalidateQueries(["parent-dashboard"]);
        },
    });

    if (isLoading) {
        return (
            <div className="space-y-4 p-6">
                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />)}
            </div>
        );
    }

    const data = dashboard?.data || { activeTutorsCount: 0, totalRequests: 0, requests: [] };
    const requests = data.requests || [];
    const acceptedRequests = requests.filter(r => r.status === "accepted");
    const pendingRequests = requests.filter(r => r.status === "pending");

    const stats = [
        { label: "Available Teachers", value: "500+", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Tutors", value: acceptedRequests.length, icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
        { label: "Pending Requests", value: pendingRequests.length, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
        { label: "Total Requests", value: requests.length, icon: MessageCircle, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="flex-1 flex flex-col min-h-0">
            {/* Header */}
            <div className="px-4 lg:px-6 pt-4 pb-0 border-b bg-background">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Parent Dashboard</h1>
                        <p className="text-sm text-muted-foreground">Find, manage and track your tutors</p>
                    </div>
                    <Button
                        className="gap-2"
                        onClick={() => setActiveTab("search")}
                    >
                        <Search size={16} /> Find Teacher
                    </Button>
                </div>

                {/* Tab Nav */}
                <div className="flex gap-1 overflow-x-auto pb-0 no-scrollbar">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id
                                        ? "border-primary text-primary bg-primary/5"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Icon size={15} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 lg:p-6">

                {/* ── OVERVIEW TAB ── */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map(stat => {
                                const Icon = stat.icon;
                                return (
                                    <Card key={stat.label} className="border-0 shadow-sm">
                                        <CardContent className="p-4 flex items-center gap-3">
                                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                                <Icon size={22} className={stat.color} />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">{stat.value}</p>
                                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <h2 className="font-semibold text-lg mb-3">Quick Actions</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { label: "Search Teacher", icon: "🔎", tab: "search" },
                                    { label: "My Tutors", icon: "📚", tab: "tutors" },
                                    { label: "Requests", icon: "📩", tab: "requests" },
                                    { label: "Payments", icon: "💳", tab: "payments" },
                                ].map(action => (
                                    <button
                                        key={action.tab}
                                        onClick={() => setActiveTab(action.tab)}
                                        className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-border rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium"
                                    >
                                        <span className="text-2xl">{action.icon}</span>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent Requests */}
                        {requests.length > 0 && (
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="font-semibold text-lg">Recent Requests</h2>
                                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("requests")} className="gap-1 text-primary">
                                        View All <ChevronRight size={14} />
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {requests.slice(0, 3).map(req => (
                                        <RequestCard key={req._id} request={req} compact />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty state */}
                        {requests.length === 0 && (
                            <Card className="py-16 text-center border-dashed">
                                <CardContent>
                                    <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                                    <p className="text-xl font-semibold">Start finding tutors for your child</p>
                                    <p className="text-muted-foreground text-sm mt-2 mb-6">Browse hundreds of verified teachers and send requests</p>
                                    <Button onClick={() => setActiveTab("search")} className="gap-2">
                                        <Search size={16} /> Find Teachers Now
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Notifications preview */}
                        <div>
                            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                <Bell size={18} className="text-primary" /> Notifications
                            </h2>
                            {acceptedRequests.length > 0 ? (
                                <div className="space-y-2">
                                    {acceptedRequests.slice(0, 2).map(req => (
                                        <div key={req._id} className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                                            <CheckCircle size={18} className="text-green-600 shrink-0" />
                                            <p className="text-sm">
                                                <span className="font-semibold">{req.teacher?.fullName}</span> accepted your tuition request for <span className="font-semibold">{req.subject}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No new notifications</p>
                            )}
                        </div>
                    </div>
                )}

                {/* ── SEARCH TAB ── */}
                {activeTab === "search" && <TeacherSearch />}

                {/* ── MY TUTORS TAB ── */}
                {activeTab === "tutors" && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">My Active Tutors</h2>
                        {acceptedRequests.length === 0 ? (
                            <Card className="py-20 text-center border-dashed">
                                <CardContent>
                                    <Users size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                                    <p className="font-semibold text-lg">No active tutors yet</p>
                                    <p className="text-muted-foreground text-sm mt-1 mb-6">Send tuition requests to teachers to get started</p>
                                    <Button onClick={() => setActiveTab("search")}>
                                        <Search size={16} className="mr-2" /> Find Teachers
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {acceptedRequests.map(req => (
                                    <Card key={req._id} className="overflow-hidden border-2 hover:border-primary/20 transition-all">
                                        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-4">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-14 w-14 border-2 border-white shadow">
                                                    <AvatarImage src={req.teacher?.profilePic} />
                                                    <AvatarFallback className="font-bold">{req.teacher?.fullName?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-bold text-lg">{req.teacher?.fullName}</h3>
                                                    <div className="flex items-center gap-1.5 text-sm">
                                                        <BookOpen size={13} className="text-primary" />
                                                        <span className="text-muted-foreground">{req.subject}</span>
                                                        <span className="text-muted-foreground">·</span>
                                                        <Badge className="bg-green-100 text-green-700 text-xs border-0">Active</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-3">
                                            {req.teacher?.ratingAvg > 0 && (
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} className={i < Math.floor(req.teacher?.ratingAvg) ? "fill-yellow-500 text-yellow-500" : "text-gray-200 fill-gray-200"} />
                                                    ))}
                                                    <span className="text-sm ml-1">{req.teacher?.ratingAvg?.toFixed(1)}</span>
                                                </div>
                                            )}
                                            <p className="text-sm text-muted-foreground italic">&quot;{req.message || "No message"}&quot;</p>
                                            <div className="flex gap-2 pt-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 gap-1 text-yellow-700 border-yellow-300 hover:bg-yellow-50"
                                                    onClick={() => setReviewTeacher(req)}
                                                >
                                                    <Star size={13} /> Rate Teacher
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 gap-1 text-red-600 border-red-200 hover:bg-red-50"
                                                    onClick={() => cancelMutation.mutate({ id: req._id })}
                                                >
                                                    <XCircle size={13} /> Cancel
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── REQUESTS TAB ── */}
                {activeTab === "requests" && (
                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">All Tuition Requests</h2>
                            <Button variant="outline" size="sm" onClick={() => setActiveTab("search")} className="gap-1">
                                <Search size={14} /> New Request
                            </Button>
                        </div>
                        {requests.length === 0 ? (
                            <Card className="py-16 text-center border-dashed">
                                <CardContent>
                                    <MessageCircle size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                                    <p className="font-semibold">No requests sent yet</p>
                                    <Button className="mt-4" onClick={() => setActiveTab("search")}>Find a Teacher</Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {requests.map(req => (
                                    <RequestCard
                                        key={req._id}
                                        request={req}
                                        onCancel={() => cancelMutation.mutate({ id: req._id })}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── PAYMENTS TAB ── */}
                {activeTab === "payments" && (
                    <div className="space-y-5">
                        <h2 className="text-xl font-bold">Payment History</h2>
                        <Card className="py-16 text-center border-dashed">
                            <CardContent>
                                <CreditCard size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                                <p className="font-semibold">No payment records yet</p>
                                <p className="text-sm text-muted-foreground mt-1">Your payment history will appear here after you unlock a teacher or book a demo class.</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

            </div>

            {/* Rate Teacher Modal */}
            {reviewTeacher && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                            <Star className="text-yellow-500" /> Rate {reviewTeacher.teacher?.fullName}
                        </h3>
                        <div className="flex gap-2 mb-4 justify-center">
                            {[1, 2, 3, 4, 5].map(n => (
                                <button key={n} onClick={() => setRating(n)}>
                                    <Star size={36} className={n <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-200 fill-gray-100"} />
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="w-full border rounded-xl p-3 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                            placeholder="Share your experience with this teacher..."
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                        />
                        <div className="flex gap-3 mt-4">
                            <Button variant="outline" className="flex-1" onClick={() => { setReviewTeacher(null); setRating(5); setReviewText(""); }}>Cancel</Button>
                            <Button className="flex-1" onClick={() => {
                                toast.success("Review submitted! Thank you.");
                                setReviewTeacher(null);
                                setRating(5);
                                setReviewText("");
                            }}>
                                Submit Review
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Reusable Request Card
const RequestCard = ({ request, compact = false, onCancel }) => {
    return (
        <Card className="overflow-hidden border hover:border-primary/20 hover:shadow-sm transition-all">
            <CardContent className={`p-0 ${compact ? "" : ""}`}>
                <div className={`flex ${compact ? "gap-3 p-4 items-center" : "flex-col sm:flex-row gap-4 p-5 items-start sm:items-center"}`}>
                    <Avatar className={compact ? "h-10 w-10 shrink-0" : "h-14 w-14 shrink-0 border-2 border-primary/10"}>
                        <AvatarImage src={request.teacher?.profilePic} />
                        <AvatarFallback>{request.teacher?.fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                            <div>
                                <p className={`font-semibold ${compact ? "text-sm" : "text-base"}`}>{request.teacher?.fullName}</p>
                                <p className="text-xs text-muted-foreground">{request.subject} · {new Date(request.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                            </div>
                            <Badge className={`${statusColors[request.status] || "bg-gray-100 text-gray-700"} border text-xs capitalize`}>
                                {request.status}
                            </Badge>
                        </div>
                        {!compact && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1 italic">
                                &quot;{request.message || "No message"}&quot;
                            </p>
                        )}
                    </div>
                    {!compact && onCancel && request.status === "pending" && (
                        <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 shrink-0" onClick={onCancel}>
                            <XCircle size={15} className="mr-1" /> Cancel
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ParentDashboard;
