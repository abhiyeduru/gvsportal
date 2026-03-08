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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const institutionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["School", "Junior College", "Degree College", "Coaching Center", "Other"]),
    description: z.string().optional(),
    contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
    contactPhone: z.string().optional(),
    location: z.object({
        address: z.string().optional(),
        city: z.string().min(1, "City is required"),
        state: z.string().optional(),
        country: z.string().min(1, "Country is required"),
    }),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

const InstitutionForm = ({ initialData, onSubmit, isLoading }) => {
    const form = useForm({
        resolver: zodResolver(institutionSchema),
        defaultValues: initialData || {
            name: "",
            type: "School",
            description: "",
            contactEmail: "",
            contactPhone: "",
            location: {
                address: "",
                city: "",
                state: "",
                country: "India",
            },
            website: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Institution Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. St. Xavier's School" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Institution Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="School">School</SelectItem>
                                        <SelectItem value="Junior College">Junior College</SelectItem>
                                        <SelectItem value="Degree College">Degree College</SelectItem>
                                        <SelectItem value="Coaching Center">Coaching Center</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>About Section</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe the institution..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="info@institution.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="+91 ..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <FormField
                        control={form.control}
                        name="location.address"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Street..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location.city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location.country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="Country" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Saving..." : "Save Institution"}
                </Button>
            </form>
        </Form>
    );
};

export default InstitutionForm;
