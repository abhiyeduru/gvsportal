import { Star, MapPin, Briefcase, IndianRupee, Wifi, Clock, CheckCircle2, Video } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TeacherCard = ({ teacher, onViewProfile, onSendRequest }) => {
    return (
        <Card className="group overflow-hidden border-2 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col">
            <CardHeader className="pb-3 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="flex items-start gap-4">
                    <div className="relative">
                        <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                            <AvatarImage src={teacher.profilePic} />
                            <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                                {teacher.fullName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        {teacher.isVerified && (
                            <CheckCircle2
                                size={18}
                                className="absolute -bottom-1 -right-1 text-blue-500 fill-white bg-white rounded-full"
                            />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-lg truncate">{teacher.fullName}</h3>
                            {teacher.isVerified && (
                                <Badge variant="outline" className="text-[10px] text-blue-600 border-blue-300 shrink-0">
                                    Verified
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            <Star size={13} className="fill-yellow-500 text-yellow-500" />
                            <span className="font-bold text-sm">{teacher.ratingAvg?.toFixed(1) || "New"}</span>
                            <span className="text-muted-foreground text-xs">({teacher.totalReviews || 0})</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-3 pt-3">
                {/* Subjects */}
                <div className="flex flex-wrap gap-1.5">
                    {(teacher.subjects || []).slice(0, 4).map((sub) => (
                        <Badge key={sub} variant="secondary" className="text-[11px] font-medium">{sub}</Badge>
                    ))}
                    {(teacher.subjects || []).length > 4 && (
                        <Badge variant="secondary" className="text-[11px]">+{teacher.subjects.length - 4}</Badge>
                    )}
                </div>

                {/* Meta */}
                <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase size={13} className="text-primary shrink-0" />
                        <span>{teacher.experienceYears || 0} yrs experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={13} className="text-primary shrink-0" />
                        <span className="truncate">{teacher.address || "Location not set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <IndianRupee size={13} className="text-primary shrink-0" />
                        <span className="font-semibold text-foreground">₹{teacher.tuitionFee || 0}</span>
                        <span className="text-xs">/ hour</span>
                    </div>
                </div>

                {/* Availability badges */}
                <div className="flex gap-2 flex-wrap">
                    {teacher.onlineAvailable && (
                        <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                            <Wifi size={11} /> Online
                        </span>
                    )}
                    {teacher.offlineAvailable && (
                        <span className="flex items-center gap-1 text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-medium">
                            <Clock size={11} /> Offline
                        </span>
                    )}
                    {teacher.introVideoUrl && (
                        <span className="flex items-center gap-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-medium">
                            <Video size={11} /> Demo Video
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="gap-2 bg-muted/20 pt-3">
                <Button
                    className="flex-1"
                    size="sm"
                    onClick={() => onViewProfile(teacher)}
                >
                    View Profile
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onSendRequest(teacher)}
                >
                    Send Request
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TeacherCard;
