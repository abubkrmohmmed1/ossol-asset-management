'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const depreciationData = [
  { year: '2021', value: 2800000, depreciation: 0 },
  { year: '2022', value: 2450000, depreciation: 350000 },
  { year: '2023', value: 2100000, depreciation: 350000 },
  { year: '2024', value: 1850000, depreciation: 250000 },
  { year: '2025', value: 1600000, depreciation: 250000 },
]

export default function DepreciationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={depreciationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value.toLocaleString('ar-SA')} ريال`, '']}
          contentStyle={{ fontFamily: 'Cairo, sans-serif' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#0D47A1" 
          fill="#0D47A1" 
          fillOpacity={0.6}
          name="قيمة الأصول"
        />
        <Area 
          type="monotone" 
          dataKey="depreciation" 
          stroke="#F44336" 
          fill="#F44336" 
          fillOpacity={0.3}
          name="الإهلاك السنوي"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}