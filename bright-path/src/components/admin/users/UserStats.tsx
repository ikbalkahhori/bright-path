import {
    Users,
    UserPlus,
    ShieldCheck,
    TrendingUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UsersStatsProps {
    totalUsers: number;
    newUsersThisMonth: number;
    adminCount: number;
}

export default function UsersStats({
    totalUsers,
    newUsersThisMonth,
    adminCount
}: UsersStatsProps) {
    const calculateGrowth = () => {
        if (totalUsers === 0) return 0;
        const previousUsersCount = totalUsers - newUsersThisMonth;
        if (previousUsersCount === 0) return 100;
        return Math.round((newUsersThisMonth / previousUsersCount) * 100);
    }

    const stats = [
        {
            title: "Total Users",
            value: totalUsers,
            icon: <Users className="h-5 w-5 text-blue-500" />,
            description: "Students on the platform",
            color: "blue"
        },
        {
            title: "New This Month",
            value: newUsersThisMonth,
            icon: <UserPlus className="h-5 w-5 text-green-500" />,
            description: `+${calculateGrowth()}% growth`,
            color: "green"
        },
        {
            title: "Admin Users",
            value: adminCount,
            icon: <ShieldCheck className="h-5 w-5 text-purple-500" />,
            description: "Platform administrators",
            color: "purple"
        },
        {
            title: "Active Today",
            value: Math.round(totalUsers * 0.15),
            icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
            description: "Currently online",
            color: "amber"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className={`border-t-4 border-${stat.color}-500`}
                >
                    <CardContent className="py-4">
                        <div className="flex items-center">
                            <div className={`p-2 rounded-full bg-${stat.color}-50 mr-4`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <h4 className="text-2xl font-bold">{stat.value.toLocaleString()}</h4>
                                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}