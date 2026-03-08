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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/services/userServices";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const teacherSchema = z.object({
    qualification: z.string().min(1, "Qualification is required"),
    subjects: z.array(z.string()).min(1, "At least one subject is required"),
    classesTaught: z.array(z.string()).optional(),
    experienceYears: z.string().transform((val) => parseInt(val) || 0),
    onlineAvailable: z.boolean().default(false),
    offlineAvailable: z.boolean().default(false),
    expectedSalary: z.string().transform((val) => parseInt(val) || 0),
    tuitionFee: z.string().transform((val) => parseInt(val) || 0),
    languages: z.array(z.string()).optional(),
    teachingMethodology: z.string().optional(),
    resumeUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    introVideoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const TeacherProfile = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [subjectInput, setSubjectInput] = useState("");
    const [languageInput, setLanguageInput] = useState("");
    const [classInput, setClassInput] = useState("");

    const form = useForm({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            qualification: user?.qualification || "",
            subjects: user?.subjects || [],
            classesTaught: user?.classesTaught || [],
            experienceYears: user?.experienceYears?.toString() || "",
            onlineAvailable: user?.onlineAvailable || false,
            offlineAvailable: user?.offlineAvailable || false,
            expectedSalary: user?.expectedSalary?.toString() || "",
            tuitionFee: user?.tuitionFee?.toString() || "",
            languages: user?.languages || [],
            teachingMethodology: user?.teachingMethodology || "",
            resumeUrl: user?.resumeUrl || "",
            introVideoUrl: user?.introVideoUrl || "",
        },
    });


    const mutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(["currentUser"]);
            toast.success("Teacher profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const handleInputAdd = (e, fieldName, inputValue, setInputValue) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            const currentValues = form.getValues(fieldName) || [];
            if (!currentValues.includes(inputValue.trim())) {
                form.setValue(fieldName, [...currentValues, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const handleRemoveItem = (fieldName, valueToRemove) => {
        const currentValues = form.getValues(fieldName) || [];
        form.setValue(
            fieldName,
            currentValues.filter((v) => v !== valueToRemove)
        );
    };

    return (
        <div className="max-w-4xl mx-auto py-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Teacher Professional Profile</h2>
                <p className="text-muted-foreground">Detailed teaching related information for schools and parents.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="qualification"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Highest Qualification</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. B.Ed, M.Sc Mathematics" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="experienceYears"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience (Years)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 5" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <FormLabel>Subjects Taught</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {(form.watch("subjects") || []).map((subject) => (
                                    <Badge key={subject} variant="secondary" className="px-3 py-1 gap-1">
                                        {subject}
                                        <X
                                            size={14}
                                            className="cursor-pointer"
                                            onClick={() => handleRemoveItem("subjects", subject)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                            <Input
                                placeholder="Type subject & press Enter..."
                                value={subjectInput}
                                onChange={(e) => setSubjectInput(e.target.value)}
                                onKeyDown={(e) => handleInputAdd(e, "subjects", subjectInput, setSubjectInput)}
                            />
                        </div>

                        <div className="space-y-3">
                            <FormLabel>Languages Known</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {(form.watch("languages") || []).map((lang) => (
                                    <Badge key={lang} variant="secondary" className="px-3 py-1 gap-1">
                                        {lang}
                                        <X
                                            size={14}
                                            className="cursor-pointer"
                                            onClick={() => handleRemoveItem("languages", lang)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                            <Input
                                placeholder="Type language & press Enter..."
                                value={languageInput}
                                onChange={(e) => setLanguageInput(e.target.value)}
                                onKeyDown={(e) => handleInputAdd(e, "languages", languageInput, setLanguageInput)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <FormLabel>Class Levels Taught</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {(form.watch("classesTaught") || []).map((cls) => (
                                    <Badge key={cls} variant="secondary" className="px-3 py-1 gap-1">
                                        {cls}
                                        <X
                                            size={14}
                                            className="cursor-pointer"
                                            onClick={() => handleRemoveItem("classesTaught", cls)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                            <Input
                                placeholder="Type class level (e.g. 10th Standard) & press Enter..."
                                value={classInput}
                                onChange={(e) => setClassInput(e.target.value)}
                                onKeyDown={(e) => handleInputAdd(e, "classesTaught", classInput, setClassInput)}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="teachingMethodology"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teaching Methodology (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea className="resize-none" placeholder="Describe your teaching style..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <FormField
                            control={form.control}
                            name="expectedSalary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expected Salary (per month - for Jobs)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 40000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tuitionFee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tuition Fee (per hour - for Parents)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 500" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 p-4 border rounded-xl bg-muted/40 text-sm">
                        <FormField
                            control={form.control}
                            name="onlineAvailable"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-lg">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Available for Online Classes</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="offlineAvailable"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-lg">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Available for Offline/Home Tuitions</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 border-t pt-6">
                        <FormField
                            control={form.control}
                            name="resumeUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resume URL (Google Drive, Dropbox, etc.)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="introVideoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Introduction / Demo Class Video URL (YouTube, Vimeo)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full md:w-fit" disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Saving..." : "Save Teacher Profile"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default TeacherProfile;
