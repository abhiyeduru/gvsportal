import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTeacherNotifications, markNotificationAsRead } from "@/services/tuitionServices";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Bell, Check, Trash2, Archive, BookOpen, MessageSquare,
    Briefcase, DollarSign, Star, AlertCircle, Calendar
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const NotificationIcons = {
    tuition_request: <BookOpen size={18} className="text-blue-500" />,
    tuition_accepted: <Check size={18} className="text-green-500" />,
    job_posted: <Briefcase size={18} className="text-purple-500" />,
    parent_message: <MessageSquare size={18} className="text-orange-500" />,
    demo_scheduled: <Calendar size={18} className="text-indigo-500" />,
    demo_completed: <Check size={18} className="text-green-500" />,
    interview_scheduled: <Briefcase size={18} className="text-cyan-500" />,
    payment_received: <DollarSign size={18} className="text-green-500" />,
    profile_review: <AlertCircle size={18} className="text-yellow-500" />,
    review_received: <Star size={18} className="text-yellow-500" />
};

const NotificationsPanel = () => {
    const queryClient = useQueryClient();

    const { data: notifData, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: getTeacherNotifications
    });

    const readMutation = useMutation({
        mutationFn: markNotificationAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications"]);
        },
        onError: () => {
            toast.error("Failed to mark as read");
        }
    });

    if (isLoading) return <div className="p-6 text-center">Loading...</div>;

    const notifications = notifData?.notifications || [];
    const unreadCount = notifData?.unreadCount || 0;
    const unreadNotifications = notifications.filter(n => !n.isRead);

    const typeColors = {
        tuition_request: "bg-blue-50 border-blue-200",
        tuition_accepted: "bg-green-50 border-green-200",
        job_posted: "bg-purple-50 border-purple-200",
        parent_message: "bg-orange-50 border-orange-200",
        demo_scheduled: "bg-indigo-50 border-indigo-200",
        demo_completed: "bg-green-50 border-green-200",
        interview_scheduled: "bg-cyan-50 border-cyan-200",
        payment_received: "bg-green-50 border-green-200",
        profile_review: "bg-yellow-50 border-yellow-200",
        review_received: "bg-yellow-50 border-yellow-200"
    };

    return (
        <div className="space-y-6 lg:p-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Bell size={28} />
                        Notifications
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        You have <span className="font-bold">{unreadCount}</span> unread notification{unreadCount !== 1 ? "s" : ""}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <Button variant="outline" className="gap-2">
                        <Check size={16} />
                        Mark All as Read
                    </Button>
                )}
            </div>

            {/* Unread Section */}
            {unreadNotifications.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-sm uppercase text-muted-foreground px-2">Unread</h3>
                    {unreadNotifications.map((notif) => (
                        <Card
                            key={notif._id}
                            className={`border-2 cursor-pointer transition-all hover:shadow-md ${typeColors[notif.type]}`}
                            onClick={() => !notif.isRead && readMutation.mutate(notif._id)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        {NotificationIcons[notif.type]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h4 className="font-bold text-sm">{notif.title}</h4>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {notif.message}
                                                </p>
                                            </div>
                                            <Badge variant="default" className="flex-shrink-0">
                                                New
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                        {notif.actionUrl && (
                                            <Button size="sm" variant="outline">
                                                View
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                readMutation.mutate(notif._id);
                                            }}
                                        >
                                            <Check size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Read Section */}
            {notifications.filter(n => n.isRead).length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-sm uppercase text-muted-foreground px-2">Earlier</h3>
                    {notifications
                        .filter(n => n.isRead)
                        .map((notif) => (
                            <Card key={notif._id} className="border opacity-75 hover:opacity-100 transition-opacity">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 opacity-60">
                                            {NotificationIcons[notif.type]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm">{notif.title}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {notif.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                        {notif.actionUrl && (
                                            <Button size="sm" variant="ghost">
                                                View
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            )}

            {notifications.length === 0 && (
                <Card className="py-20 text-center border-dashed">
                    <CardContent>
                        <Bell size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground">No notifications yet</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            You'll see notifications here when parents send requests or schools post jobs
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default NotificationsPanel;
