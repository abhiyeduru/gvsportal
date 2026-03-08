import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/services/userServices";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";

const parentSchema = z.object({
    childName: z.string().min(1, "Child name is required"),
    childClass: z.string().min(1, "Class is required"),
    requiredSubjects: z.array(z.string()).min(1, "At least one subject is required"),
    budget: z.string().transform((val) => parseInt(val) || 0),
    preferredMode: z.enum(["online", "offline", "both"]),
    location: z.object({
        address: z.string().optional(),
        city: z.string().min(1, "City is required"),
        state: z.string().optional(),
        country: z.string().default("India"),
    }),
});

const ParentProfile = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [subjectInput, setSubjectInput] = useState("");

    const form = useForm({
        resolver: zodResolver(parentSchema),
        defaultValues: {
            childName: user?.childName || "",
            childClass: user?.childClass || "",
            requiredSubjects: user?.requiredSubjects || [],
            budget: user?.budget?.toString() || "",
            preferredMode: user?.preferredMode || "both",
            location: {
                address: user?.location?.address || "",
                city: user?.location?.city || "",
                state: user?.location?.state || "",
                country: user?.location?.country || "India",
            },
        },
    });

    const mutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(["currentUser"]);
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const addSubject = (e) => {
        if (e.key === 'Enter' && subjectInput.trim()) {
            e.preventDefault();
            const currentSubjects = form.getValues("requiredSubjects");
            if (!currentSubjects.includes(subjectInput.trim())) {
                form.setValue("requiredSubjects", [...currentSubjects, subjectInput.trim()]);
            }
            setSubjectInput("");
        }
    };

    const removeSubject = (subject) => {
        const currentSubjects = form.getValues("requiredSubjects");
        form.setValue("requiredSubjects", currentSubjects.filter(s => s !== subject));
    };

    return (
        <div className="max-w-4xl mx-auto py-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Child&apos;s Education Details</h2>
                <p className="text-muted-foreground">Setup your requirements to find the best tutors.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="childName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Child&apos;s Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe Jr." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="childClass"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class / Grade</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. 10th Standard" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-3">
                        <FormLabel>Required Subjects</FormLabel>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {form.watch("requiredSubjects").map((subject) => (
                                <Badge key={subject} variant="secondary" className="px-3 py-1 gap-1">
                                    {subject}
                                    <X size={14} className="cursor-pointer" onClick={() => removeSubject(subject)} />
                                </Badge>
                            ))}
                        </div>
                        <Input
                            placeholder="Type subject and press Enter..."
                            value={subjectInput}
                            onChange={(e) => setSubjectInput(e.target.value)}
                            onKeyDown={addSubject}
                        />
                        <p className="text-xs text-muted-foreground">Example: Mathematics, Physics, English</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monthly Budget (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 5000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="preferredMode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preferred Mode</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select mode" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="online">Online</SelectItem>
                                            <SelectItem value="offline">Offline / At Home</SelectItem>
                                            <SelectItem value="both">Both</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-semibold">Location Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="location.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location.address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Area / Locality</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Hitech City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full md:w-fit" disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Saving..." : "Save Profile"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ParentProfile;
