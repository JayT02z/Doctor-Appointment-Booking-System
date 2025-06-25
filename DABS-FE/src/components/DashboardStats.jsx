import { Users, UserRound, Calendar, CalendarCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardStats = ({ stats }) => {
    const statCards = [
        {
            title: "Doctors",
            value: stats.totalDoctors,
            icon: UserRound,
            color: "#00B5F1",
            trend: "+12% from last month"
        },
        {
            title: "Patients",
            value: stats.totalPatients,
            icon: Users,
            color: "#10B981",
            trend: "+8% from last month"
        },
        {
            title: "Appointments",
            value: stats.totalAppointments,
            icon: Calendar,
            color: "#F59E0B",
            trend: "+15% from last month"
        },
        {
            title: "Active Appointments",
            value: stats.activeAppointments,
            icon: CalendarCheck,
            color: "#8B5CF6",
            trend: "+5% from last month"
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
                <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative bg-white rounded-xl p-6 border border-gray-100 shadow-sm
                             hover:shadow-md transition-all duration-300"
                >
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] transform rotate-12">
                        <stat.icon size={128} />
                    </div>

                    {/* Icon */}
                    <div className="relative">
                        <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                            style={{ backgroundColor: `${stat.color}10` }}
                        >
                            <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-600">{stat.title}</h4>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            <div className="flex items-center text-xs font-medium text-green-600">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {stat.trend}
                            </div>
                        </div>
                    </div>

                    {/* Hover Effect Gradient */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                            className="absolute inset-0 rounded-xl opacity-[0.03]"
                            style={{
                                background: `linear-gradient(45deg, ${stat.color}40, transparent)`
                            }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DashboardStats;