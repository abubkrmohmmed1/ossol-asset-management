'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const probabilityData = [
  { asset: 'الخادم الرئيسي', probability: 85 },
  { asset: 'مولد الطاقة #002', probability: 72 },
  { asset: 'رافعة شوكية #3', probability: 65 },
  { asset: 'نظام التكييف', probability: 45 },
  { asset: 'مضخة المياه', probability: 38 },
  { asset: 'الإضاءة الطارئة', probability: 25 },
]

const getBarColor = (probability: number) => {
  if (probability >= 80) return '#ef4444'
  if (probability >= 60) return '#f97316'
  if (probability >= 40) return '#eab308'
  return '#22c55e'
}

export default function FailureProbabilityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={probabilityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="asset" 
          angle={-45}
          textAnchor="end"
          height={80}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'احتمالية الفشل']}
          contentStyle={{ fontFamily: 'Cairo, sans-serif' }}
        />
        <Bar 
          dataKey="probability" 
          fill="#0D47A1"
          radius={[8, 8, 0, 0]}
          shape={(props: any) => {
            const { x, y, width, height, payload } = props
            return (
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={getBarColor(payload.probability)}
                rx={8}
                ry={8}
              />
            )
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}