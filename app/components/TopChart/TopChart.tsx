/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import 'tailwindcss/tailwind.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type DashboardProps = {
  userName: string
}

const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Wydatki',
        data: [],
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.5,
      },
    ],
  })
  const [totalExpenses, setTotalExpenses] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch('/api/receipts')
        const receipts = await response.json()
        processReceipts(receipts)
      } catch (error) {
        console.error('Error fetching receipts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReceipts()
  }, [])

  const processReceipts = (receipts: any[]) => {
    const monthlyExpenses: { [key: string]: number } = {}
    receipts.forEach((receipt) => {
      const month = new Date(receipt.date).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      })
      const amount = parseFloat(receipt.total) || 0
      if (!monthlyExpenses[month]) {
        monthlyExpenses[month] = 0
      }
      monthlyExpenses[month] += amount
    })

    const monthLabels = Object.keys(monthlyExpenses)
    const data = Object.values(monthlyExpenses)

    setChartData({
      labels: monthLabels,
      datasets: [
        {
          label: 'Wydatki',
          data: data,
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 5,
          barPercentage: 0.5,
        },
      ],
    })

    const total = data.reduce((acc, val) => acc + val, 0)
    setTotalExpenses(total)
  }

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Wydatki',
        color: 'white',
        font: {
          size: 16,
          family: 'Arial, sans-serif',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.raw} zł`
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
          stepSize: 100,
          callback: (value: number) => `${value} zł`,
        },
        grid: {
          color: 'rgb(0,128,0)',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-blue-500 p-5 text-white">
      <h1 className="text-3xl font-bold">Hej {userName}!</h1>
      <p className="mb-5 text-xl">Twoje wydatki: {totalExpenses} zł</p>
      <div className="rounded-lg bg-blue-400 p-4">
        {loading ? (
          <div className="text-center">Ładowanie...</div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between py-2">
        <button className="border-none bg-transparent text-2xl text-white">
          &#9664;
        </button>
        <span className="text-lg">Stycz 2024 - Maj 2024</span>
        <button className="border-none bg-transparent text-2xl text-white">
          &#9654;
        </button>
      </div>
    </div>
  )
}

export default Dashboard
