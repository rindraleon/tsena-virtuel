import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SalesChartProps {
  salesData: { month: string; sales: number }[];
  categoryData: { name: string; value: number }[];
}

export default function SalesChart({ salesData, categoryData }: SalesChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-surface rounded-xl border border-border p-5">
        <h3 className="font-semibold text-text mb-4">Évolution des ventes</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={salesData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="sales" stroke="#0d3b2e" fill="#0d3b2e" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-surface rounded-xl border border-border p-5">
        <h3 className="font-semibold text-text mb-4">Ventes par catégorie</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={categoryData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#0d3b2e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
