'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const baseMaintenanceData = [
  { month: 'يناير', cost: 45000, planned: 50000 },
  { month: 'فبراير', cost: 52000, planned: 50000 },
  { month: 'مارس', cost: 38000, planned: 45000 },
  { month: 'أبريل', cost: 61000, planned: 55000 },
  { month: 'مايو', cost: 47000, planned: 50000 },
  { month: 'يونيو', cost: 55000, planned: 52000 },
  { month: 'يوليو', cost: 43000, planned: 48000 },
  { month: 'أغسطس', cost: 58000, planned: 55000 },
  { month: 'سبتمبر', cost: 49000, planned: 50000 },
  { month: 'أكتوبر', cost: 42000, planned: 48000 },
  { month: 'نوفمبر', cost: 0, planned: 45000 },
  { month: 'ديسمبر', cost: 0, planned: 50000 },
]

const englishMaintenanceData = [
  { month: 'Jan', cost: 45000, planned: 50000 },
  { month: 'Feb', cost: 52000, planned: 50000 },
  { month: 'Mar', cost: 38000, planned: 45000 },
  { month: 'Apr', cost: 61000, planned: 55000 },
  { month: 'May', cost: 47000, planned: 50000 },
  { month: 'Jun', cost: 55000, planned: 52000 },
  { month: 'Jul', cost: 43000, planned: 48000 },
  { month: 'Aug', cost: 58000, planned: 55000 },
  { month: 'Sep', cost: 49000, planned: 50000 },
  { month: 'Oct', cost: 42000, planned: 48000 },
  { month: 'Nov', cost: 0, planned: 45000 },
  { month: 'Dec', cost: 0, planned: 50000 },
]

interface MaintenanceCostChartProps {
  data?: any[]
  timeRange?: string
}

export default function MaintenanceCostChart({ data = [], timeRange = 'month' }: MaintenanceCostChartProps) {
  // Use filtered data if available, otherwise use default data
  const hasFilteredData = data && data.length > 0
  
  // Adjust data based on time range
  const getFilteredData = () => {
    const baseData = englishMaintenanceData // Default to English for now
    
    switch (timeRange) {
      case 'day':
        return baseData.slice(-1)
      case 'week':
        return baseData.slice(-7)
      case 'month':
        return baseData.slice(-30)
      case 'year':
        return baseData
      default:
        return baseData
    }
  }
  
  const chartData = hasFilteredData ? 
    data.map((item, index) => {
      // Use deterministic calculation instead of random
      const deterministicCost = 30000 + ((item.id || index) * 1000) % 20000
      return {
        month: englishMaintenanceData[index]?.month || `Month ${index + 1}`,
        cost: item.maintenanceCost || deterministicCost,
        planned: 45000
      }
    }) : 
    getFilteredData()
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value.toLocaleString()} ريال`, '']}
          contentStyle={{ fontFamily: 'Cairo, sans-serif' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="cost" 
          stroke="#0D47A1" 
          strokeWidth={2}
          name="Actual Cost"
          dot={{ fill: '#0D47A1', r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="planned" 
          stroke="#42A5F5" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Planned Cost"
          dot={{ fill: '#42A5F5', r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}