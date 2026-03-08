import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Filter, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTutors, sendTuitionRequest } from "@/services/tuitionServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import TeacherCard from "./TeacherCard";
import TeacherProfileModal from "./TeacherProfileModal";
import { useAuth } from "@/hooks/useAuth";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "History", "Geography", "Computer", "Accountancy"];
const EXPERIENCE_OPTIONS = [{ label: "Any", value: "" }, { label: "0-2 years", value: "0-2" }, { label: "3-5 years", value: "3-5" }, { label: "5+ years", value: "5+" }];
const RATING_OPTIONS = [{ label: "Any", value: "" }, { label: "4+ ⭐", value: "4" }, { label: "4.5+ ⭐", value: "4.5" }];
const MODE_OPTIONS = [{ label: "Any Mode", value: "" }, { label: "Online Only", value: "online" }, { label: "Offline Only", value: "offline" }];

const TeacherSearch = () => {
    const { user } = useAuth();
    const [searchSubject, setSearchSubject] = useState("");
    const [city, setCity] = useState("");
    const [minRating, setMinRating] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [requestTeacher, setRequestTeacher] = useState(null);
    const [requestMessage, setRequestMessage] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["tutors", searchSubject, city, minRating, experience, mode],
        queryFn: () => getTutors({ subject: searchSubject, city, minRating, experience, mode }),
        keepPreviousData: true,
    });

    const requestMutation = useMutation({
        mutationFn: sendTuitionRequest,
        onSuccess: () => {
            toast.success("Tuition request sent successfully!");
            setRequestTeacher(null);
            setRequestMessage("");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Failed to send request"),
    });

    const activeFilters = [searchSubject, city, minRating, experience, mode].filter(Boolean).length;

    return (
        <div className="space-y-5">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search by subject (e.g. Mathematics, Physics)"
                        className="pl-10 h-11"
                        value={searchSubject}
                        onChange={(e) => setSearchSubject(e.target.value)}
                    />
                </div>
                <div className="relative md:w-52">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="City"
                        className="pl-10 h-11"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    className="gap-2 h-11 relative"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <SlidersHorizontal size={16} />
                    Filters
                    {activeFilters > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {activeFilters}
                        </span>
                    )}
                    <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="border rounded-2xl p-5 bg-muted/30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in-0 slide-in-from-top-2">
                    {/* Rating */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Min Rating</p>
                        <div className="flex flex-wrap gap-2">
                            {RATING_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setMinRating(opt.value)}
                                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${minRating === opt.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Experience</p>
                        <div className="flex flex-wrap gap-2">
                            {EXPERIENCE_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setExperience(opt.value)}
                                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${experience === opt.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mode */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Mode</p>
                        <div className="flex flex-wrap gap-2">
                            {MODE_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setMode(opt.value)}
                                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${mode === opt.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Subject chips */}
                    <div className="sm:col-span-2 md:col-span-3">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Popular Subjects</p>
                        <div className="flex flex-wrap gap-2">
                            {SUBJECTS.map(sub => (
                                <button
                                    key={sub}
                                    onClick={() => setSearchSubject(searchSubject === sub ? "" : sub)}
                                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${searchSubject === sub ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"}`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clear */}
                    {activeFilters > 0 && (
                        <div className="sm:col-span-2 md:col-span-3 flex justify-end">
                            <Button variant="ghost" size="sm" onClick={() => { setSearchSubject(""); setCity(""); setMinRating(""); setExperience(""); setMode(""); }}>
                                <X size={14} className="mr-1" /> Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Active filter tags */}
            {activeFilters > 0 && (
                <div className="flex flex-wrap gap-2">
                    {searchSubject && <Badge variant="secondary" className="gap-1">{searchSubject} <X size={12} className="cursor-pointer" onClick={() => setSearchSubject("")} /></Badge>}
                    {city && <Badge variant="secondary" className="gap-1">{city} <X size={12} className="cursor-pointer" onClick={() => setCity("")} /></Badge>}
                    {minRating && <Badge variant="secondary" className="gap-1">Rating {minRating}+ <X size={12} className="cursor-pointer" onClick={() => setMinRating("")} /></Badge>}
                    {experience && <Badge variant="secondary" className="gap-1">{experience} yrs <X size={12} className="cursor-pointer" onClick={() => setExperience("")} /></Badge>}
                    {mode && <Badge variant="secondary" className="gap-1">{mode} <X size={12} className="cursor-pointer" onClick={() => setMode("")} /></Badge>}
                </div>
            )}

            {/* Results Count */}
            {!isLoading && (
                <p className="text-sm text-muted-foreground">
                    Found <span className="font-semibold text-foreground">{data?.tutors?.length || 0}</span> teachers
                    {searchSubject && <> for <span className="font-semibold">{searchSubject}</span></>}
                    {city && <> in <span className="font-semibold">{city}</span></>}
                </p>
            )}

            {/* Teacher Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-72 bg-muted animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : data?.tutors?.length === 0 ? (
                <div className="py-24 text-center">
                    <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-xl font-semibold text-muted-foreground">No teachers found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search term</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {(data?.tutors || []).map(teacher => (
                        <TeacherCard
                            key={teacher._id}
                            teacher={teacher}
                            onViewProfile={setSelectedTeacher}
                            onSendRequest={setRequestTeacher}
                        />
                    ))}
                </div>
            )}

            {/* Teacher Profile Modal */}
            {selectedTeacher && (
                <TeacherProfileModal
                    teacher={selectedTeacher}
                    onClose={() => setSelectedTeacher(null)}
                    user={user}
                />
            )}

            {/* Quick Request Dialog */}
            {requestTeacher && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Send Request to {requestTeacher.fullName}</h3>
                            <button onClick={() => setRequestTeacher(null)}><X size={20} /></button>
                        </div>
                        <textarea
                            className="w-full text-sm border rounded-xl p-3 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                            placeholder="Describe your child's needs, class, subjects required..."
                            value={requestMessage}
                            onChange={(e) => setRequestMessage(e.target.value)}
                        />
                        <Button
                            className="w-full mt-4"
                            onClick={() => {
                                if (!requestMessage.trim()) { toast.error("Please enter a message"); return; }
                                requestMutation.mutate({
                                    teacherId: requestTeacher._id,
                                    subject: (requestTeacher.subjects || [])[0] || "General",
                                    message: requestMessage,
                                    preferredMode: "both",
                                });
                            }}
                            disabled={requestMutation.isLoading}
                        >
                            {requestMutation.isLoading ? "Sending..." : "Send Tuition Request"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherSearch;
