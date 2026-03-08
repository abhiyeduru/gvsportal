import { useQuery } from "@tanstack/react-query";
import { getEarningsDashboard } from "@/services/tuitionServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calendar, Users, Download, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningsDashboard = () => {
    const { data: earnings, isLoading } = useQuery({
        queryKey: ["earnings-dashboard"],
        queryFn: getEarningsDashboard
    });

    if (isLoading) return <div className="p-6 text-center">Loading...</div>;

    const earningsData = earnings?.earnings || {};
    const monthlyData = Object.entries(earningsData.earningsByMonth || {}).map(([month, amount]) => ({
        month: new Date(month + "-01").toLocaleString("default", { month: "short" }),
        amount: amount
    }));

    const maxEarning = Math.max(...monthlyData.map(d => d.amount), 1);

    return (
        <div className="space-y-6 lg:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Earnings Dashboard</h2>
                    <p className="text-muted-foreground mt-1">Track your income from tuitions and demo classes</p>
                </div>
                <Button className="gap-2">
                    <Download size={16} />
                    Download Report
                </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-purple-600">Total Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <DollarSign className="text-purple-600" size={24} />
                            <span className="text-3xl font-bold text-purple-700">₹{earningsData.totalEarnings || 0}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-green-600">Monthly Recurring</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="text-green-600" size={24} />
                            <span className="text-3xl font-bold text-green-700">₹{earningsData.monthlyRecurringRevenue || 0}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-600">Active Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Users className="text-blue-600" size={24} />
                            <span className="text-3xl font-bold text-blue-700">{earningsData.activeStudentCount || 0}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Earnings Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar size={18} />
                            Monthly Earnings Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {monthlyData.length > 0 ? (
                                monthlyData.map((item) => (
                                    <div key={item.month} className="flex items-center gap-3">
                                        <div className="w-12 text-sm font-medium text-right">{item.month}</div>
                                        <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all"
                                                style={{
                                                    width: `${(item.amount / maxEarning) * 100}%`
                                                }}
                                            />
                                        </div>
                                        <div className="w-24 text-right text-sm font-medium">₹{item.amount.toLocaleString()}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center py-8">No earnings data available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Income Sources */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard size={18} />
                            Income Sources
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Tuitions</span>
                                    <Badge variant="outline">₹{earningsData.tuitionEarnings || 0}</Badge>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full transition-all"
                                        style={{
                                            width: `${
                                                (earningsData.tuitionEarnings || 0) /
                                                ((earningsData.tuitionEarnings || 1) + (earningsData.demoClassEarnings || 1)) *
                                                100
                                            }%`
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Demo Classes</span>
                                    <Badge variant="outline">₹{earningsData.demoClassEarnings || 0}</Badge>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-green-500 h-4 rounded-full transition-all"
                                        style={{
                                            width: `${
                                                (earningsData.demoClassEarnings || 0) /
                                                ((earningsData.tuitionEarnings || 1) + (earningsData.demoClassEarnings || 1)) *
                                                100
                                            }%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Methods */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                            <div className="text-sm font-medium mb-2">Bank Transfer</div>
                            <div className="text-2xl font-bold text-blue-600">₹{earningsData.bankTransferEarnings || 0}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {Math.round(
                                    ((earningsData.bankTransferEarnings || 0) / (earningsData.totalEarnings || 1)) * 100
                                )}% of total
                            </div>
                        </div>
                        <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                            <div className="text-sm font-medium mb-2">UPI</div>
                            <div className="text-2xl font-bold text-green-600">₹{earningsData.upiEarnings || 0}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {Math.round(((earningsData.upiEarnings || 0) / (earningsData.totalEarnings || 1)) * 100)}% of total
                            </div>
                        </div>
                        <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                            <div className="text-sm font-medium mb-2">Wallet</div>
                            <div className="text-2xl font-bold text-purple-600">₹{earningsData.walletEarnings || 0}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {Math.round(((earningsData.walletEarnings || 0) / (earningsData.totalEarnings || 1)) * 100)}% of total
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Earnings Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Detailed Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 px-2 font-medium">Month</th>
                                    <th className="text-right py-2 px-2 font-medium">Tuitions</th>
                                    <th className="text-right py-2 px-2 font-medium">Demo Classes</th>
                                    <th className="text-right py-2 px-2 font-medium">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyData.map((item) => (
                                    <tr key={item.month} className="border-b hover:bg-muted/50">
                                        <td className="py-3 px-2">{item.month}</td>
                                        <td className="text-right py-3 px-2">₹{item.amount.toLocaleString()}</td>
                                        <td className="text-right py-3 px-2">₹0</td>
                                        <td className="text-right py-3 px-2 font-medium">₹{item.amount.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EarningsDashboard;
