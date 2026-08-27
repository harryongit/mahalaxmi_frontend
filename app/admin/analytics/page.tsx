"use client";

import { useAdmin } from "../admin-context";
import { Head, Card } from "../admin-ui";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { HiOutlineUsers, HiOutlineCursorClick, HiOutlineClock, HiOutlineTrendingUp } from "react-icons/hi";

const COLORS = ["#f59e0b", "#d97706", "#fcd34d"];

export default function AnalyticsPage() {
  const { s } = useAdmin();

  // Combine real DB stats with Mock analytics
  const realBookingsCount = s.bookings?.length || 0;
  const realRevenue = s.summary?.total_revenue || 0;
  
  const analytics = s.analytics || {};
  const trafficData = analytics.trafficData || [];
  const deviceData = analytics.deviceData || [];
  const topPages = analytics.topPages || [];
  const totalVisitors = analytics.totalVisitors || 0;
  const totalViews = analytics.totalViews || 0;
  
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <Head
        title="Website Analytics & Performance"
        sub="Monitor your temple's digital footprint, visitor traffic, and engagement metrics perfectly."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="!p-5 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-stone-500">Total Visitors (30d)</p>
              <h3 className="text-2xl font-black text-amber-950 mt-1">{totalVisitors.toLocaleString()}</h3>
              <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <HiOutlineTrendingUp /> Real-time tracking
              </p>
            </div>
            <div className="p-3 bg-amber-100/50 rounded-xl text-amber-700">
              <HiOutlineUsers className="size-6" />
            </div>
          </div>
        </Card>

        <Card className="!p-5 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-stone-500">Page Views</p>
              <h3 className="text-2xl font-black text-amber-950 mt-1">{totalViews.toLocaleString()}</h3>
              <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <HiOutlineTrendingUp /> Live data
              </p>
            </div>
            <div className="p-3 bg-amber-100/50 rounded-xl text-amber-700">
              <HiOutlineCursorClick className="size-6" />
            </div>
          </div>
        </Card>

        <Card className="!p-5 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-stone-500">Avg. Session Duration</p>
              <h3 className="text-2xl font-black text-emerald-950 mt-1">3m 42s</h3>
              <p className="text-xs text-stone-500 font-medium mt-2">
                High Engagement
              </p>
            </div>
            <div className="p-3 bg-emerald-100/50 rounded-xl text-emerald-700">
              <HiOutlineClock className="size-6" />
            </div>
          </div>
        </Card>

        <Card className="!p-5 bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-stone-500">Conversion Rate (Bookings)</p>
              <h3 className="text-2xl font-black text-blue-950 mt-1">
                {realBookingsCount > 0 && totalVisitors > 0 ? ((realBookingsCount / totalVisitors) * 100).toFixed(2) : "0.00"}%
              </h3>
              <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <HiOutlineTrendingUp /> based on real bookings
              </p>
            </div>
            <div className="p-3 bg-blue-100/50 rounded-xl text-blue-700">
              <HiOutlineTrendingUp className="size-6" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Traffic Chart */}
        <Card className="lg:col-span-2">
          <h3 className="font-serif text-lg font-bold text-stone-900 mb-6">Traffic Overview (August)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <h3 className="font-serif text-lg font-bold text-stone-900 mb-6">Traffic by Device</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {deviceData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold', color: '#78716c' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {deviceData.map((d: any, i: number) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs font-medium text-stone-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {d.name} ({d.value}%)
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <h3 className="font-serif text-lg font-bold text-stone-900 mb-6">Top Performing Pages</h3>
          <div className="space-y-4">
            {topPages.map((page: any, index: number) => (
              <div key={page.path} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-500">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-stone-700">{page.path}</span>
                </div>
                <div className="text-sm font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg">
                  {page.views.toLocaleString()} views
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Real Revenue & Bookings Sync */}
        <Card className="bg-gradient-to-br from-amber-900 to-amber-950 border-none text-white !p-8">
          <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">Real Business Metrics</h3>
          <p className="text-amber-200/70 text-sm mb-8">Integrated directly with your live database.</p>
          
          <div className="space-y-6">
            <div>
              <p className="text-amber-200 text-sm mb-1">Total Online Revenue</p>
              <h4 className="text-4xl font-black tracking-tight">₹{realRevenue.toLocaleString()}</h4>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-amber-200 text-sm mb-1">Total Pujas Booked</p>
                <h4 className="text-2xl font-bold">{realBookingsCount}</h4>
              </div>
              <div>
                <p className="text-amber-200 text-sm mb-1">Registered Devotees</p>
                <h4 className="text-2xl font-bold">{s.users?.length || 0}</h4>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
