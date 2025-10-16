'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const assetData = [
  { name: 'معدات تقنية', value: 45, color: '#0D47A1' },
  { name: 'معدات ثقيلة', value: 25, color: '#42A5F5' },
  { name: 'معدات طاقة', value: 15, color: '#FFC107' },
  { name: 'أنظمة تهوية', value: 10, color: '#4CAF50' },
  { name: 'أخرى', value: 5, color: '#F44336' },
]

export default function AssetDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={assetData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {assetData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value}%`, '']}
          contentStyle={{ fontFamily: 'Cairo, sans-serif' }}
        />
        <Legend 
          wrapperStyle={{ fontFamily: 'Cairo, sans-serif' }}
          formatter={(value) => <span style={{ fontFamily: 'Cairo, sans-serif' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}