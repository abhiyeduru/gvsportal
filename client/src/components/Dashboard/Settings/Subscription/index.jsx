import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const SubscriptionPlans = () => {
    const { user } = useAuth();
    const isTeacher = user?.role === "teacher" || user?.role === "jobSeeker";
    const isSchool = user?.role === "school";

    const teacherPlans = [
        {
            id: "basic",
            name: "Free Basic Profile",
            price: 0,
            features: ["Standard visibility", "Apply to up to 5 jobs/month", "Receive messages"],
            buttonText: "Current Plan",
            disabled: true,
        },
        {
            id: "premium",
            name: "Premium Listing",
            price: 499,
            features: ["Priority placement in search", "Unlimited job applications", "Profile highlighted"],
            buttonText: "Subscribe Now",
            disabled: false,
        },
        {
            id: "featured",
            name: "Featured Teacher Badge",
            price: 999,
            features: ["'Featured' badge next to name", "Top of all relevant search results", "Direct intro to premium schools"],
            buttonText: "Get Featured",
            disabled: false,
        }
    ];

    const schoolPlans = [
        {
            id: "job_post",
            name: "Pay Per Job Post",
            price: 299,
            features: ["1 Active Job Post", "Standard visibility", "View up to 50 applicants"],
            buttonText: "Buy Credits",
            disabled: false,
        },
        {
            id: "monthly",
            name: "Monthly Subscription",
            price: 1999,
            features: ["Unlimited Job Posts", "Featured School Badge", "Unlock all candidate resumes", "Dedicated account manager"],
            buttonText: "Subscribe Monthly",
            disabled: false,
        }
    ];

    const activePlans = isTeacher ? teacherPlans : isSchool ? schoolPlans : [];

    const handlePayment = async (plan) => {
        const res = await loadRazorpayScript();
        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            // 1. Create order on backend
            const { data } = await axiosInstance.post("/payment/create-order", {
                amount: plan.price,
                paymentType: "subscription",
                planId: plan.id
            });

            if (!data.success) {
                toast.error("Could not create order");
                return;
            }

            const { order, paymentId } = data;

            // 2. Setup Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_testkey123",
                amount: order.amount,
                currency: order.currency,
                name: "Gravity Job Portal",
                description: `Subscription: ${plan.name}`,
                order_id: order.id,
                handler: async function (response) {
                    // 3. Verify payment on backend
                    try {
                        const verifyRes = await axiosInstance.post("/payment/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            paymentId
                        });

                        if (verifyRes.data.success) {
                            toast.success(`Successfully subscribed to ${plan.name}!`);
                        } else {
                            toast.error("Payment verification failed.");
                        }
                    } catch (_) {
                        toast.error("Payment verification error.");
                    }
                },
                prefill: {
                    name: user?.fullName || "",
                    email: user?.email || "",
                    contact: user?.contact || ""
                },
                theme: {
                    color: "#0f172a"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);
            toast.error("Error initiating payment.");
        }
    };

    if (activePlans.length === 0) {
        return <div className="p-6">No subscription plans available for your role.</div>;
    }

    return (
        <div className="py-6 space-y-6">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Upgrade Your Profile</h2>
                <p className="text-muted-foreground mt-2">Choose the plan that best fits your goals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePlans.map((plan) => (
                    <Card key={plan.id} className="relative flex flex-col border-2 hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-xl">{plan.name}</CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold text-foreground">₹{plan.price}</span>
                                {plan.price > 0 && <span className="text-muted-foreground"> / billing</span>}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                variant={plan.price === 0 ? "outline" : "default"}
                                disabled={plan.disabled}
                                onClick={() => handlePayment(plan)}
                            >
                                {plan.buttonText}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPlans;
