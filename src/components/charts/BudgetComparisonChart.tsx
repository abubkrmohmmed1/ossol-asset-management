'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const budgetData = [
  { category: 'الصيانة الوقائية', budget: 500000, actual: 420000 },
  { category: 'الصيانة التصحيحية', budget: 300000, actual: 380000 },
  { category: 'قطع الغيار', budget: 200000, actual: 180000 },
  { category: 'المقاولين', budget: 150000, actual: 165000 },
  { category: 'التدريب', budget: 100000, actual: 95000 },
]

export default function BudgetComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={budgetData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="category" 
          angle={-45}
          textAnchor="end"
          height={80}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value.toLocaleString('ar-SA')} ريال`, '']}
          contentStyle={{ fontFamily: 'Cairo, sans-serif' }}
        />
        <Legend 
          wrapperStyle={{ fontFamily: 'Cairo, sans-serif' }}
          formatter={(value) => <span style={{ fontFamily: 'Cairo, sans-serif' }}>
            {value === 'budget' ? 'الميزانية' : 'الإنفاق الفعلي'}
          </span>}
        />
        <Bar dataKey="budget" fill="#0D47A1" name="budget" radius={[8, 8, 0, 0]} />
        <Bar dataKey="actual" fill="#42A5F5" name="actual" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}