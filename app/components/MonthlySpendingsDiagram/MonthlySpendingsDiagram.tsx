'use client'

import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import 'tailwindcss/tailwind.css'
import { getReceiptsForUser } from '@/app/actions/receiptActions'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const RECEIPT_CATEGORIES = [
  { category: 'Spożywcze', color: '#FF6B6B' }, // Changed to a vibrant red
  { category: 'Elektronika', color: '#4D96FF' }, // Changed to a brighter blue
  { category: 'Odzież', color: '#9B72AA' }, // Changed to a more muted purple
  { category: 'Kosmetyki', color: '#FF85B3' }, // Changed to a brighter pink
  { category: 'Dom', color: '#FFB347' }, // Changed to a warmer orange
  { category: 'Rozrywka', color: '#FFB3BA' }, // Changed to a soft pink
  { category: 'Jedzenie', color: '#FFD700' }, // Changed to a rich gold
  { category: 'Zdrowie i leki', color: '#FF7F50' }, // Changed to a coral color
  { category: 'Transport', color: '#9370DB' }, // Changed to a medium purple
  { category: 'Edukacja', color: '#87CEEB' }, // Changed to a sky blue
  { category: 'Hobby', color: '#7CFC00' }, // Changed to a vivid green
  { category: 'Inne', color: '#D4A017' },
]

const MonthlySpendingsDiagram: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [] as string[],
        borderWidth: 0,
        borderRadius: 10,
        spacing: 10,
        hoverBorderColor: '#fff',
      },
    ],
  })
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const receipts = await getReceiptsForUser()
        processReceipts(receipts)
      } catch (error) {
        console.error('Error fetching receipts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReceipts()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processReceipts = (receipts: any[]) => {
    const categoryTotals: { [key: string]: number } = receipts.reduce(
      (acc, receipt) => {
        const category = receipt.category || 'Inne'
        const amount = parseFloat(receipt.total) || 0
        if (!acc[category]) {
          acc[category] = 0
        }
        acc[category] += amount
        return acc
      },
      {} as { [key: string]: number }
    )

    const total = Object.values(categoryTotals).reduce(
      (acc, amount) => acc + amount,
      0
    )

    const labels: string[] = []
    const data: number[] = []
    const backgroundColor: string[] = []

    for (const cat of RECEIPT_CATEGORIES) {
      if (categoryTotals[cat.category]) {
        labels.push(cat.category)
        data.push(categoryTotals[cat.category])
        backgroundColor.push(cat.color)
      }
    }

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 0,
          borderRadius: 10,
          spacing: 10,
          hoverBorderColor: '',
        },
      ],
    })

    setTotalAmount(total)
  }

  return (
    <div className="relative mx-auto mt-10 w-full max-w-lg">
      {loading ? (
        <div className="text-center">Ładowanie...</div>
      ) : (
        <div
          style={{
            boxShadow: '0px 4px 12.3px 0px rgba(0, 0, 0, 0.25)',
          }}
          className="m-4 rounded-xl bg-[#FFF] p-4"
        >
          {chartData.labels.length > 0 ? (
            <div className="relative">
              <Doughnut
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                      align: 'center',
                    },
                    datalabels: {
                      color: '#333',
                      formatter: (value) => {
                        const percentage = (
                          (value / totalAmount) *
                          100
                        ).toFixed(0)

                        return `${percentage}%`
                      },

                      font: {
                        weight: 'bold',
                        size: 12,
                      },
                      anchor: 'end',
                      align: 'end',
                      opacity: 0,
                      offset: 0,
                      borderRadius: 50,
                      borderWidth: 0.5,
                      padding: 3,
                      borderColor: (context) => {
                        return Array.isArray(context.dataset.backgroundColor)
                          ? context.dataset.backgroundColor[
                              context.dataIndex
                            ] || '#000'
                          : context.dataset.backgroundColor || '#000'
                      },
                    },
                  },
                  cutout: '90%',
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                className="h-64"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-2xl font-semibold">
                  {totalAmount.toFixed(2)} zł
                </h2>
              </div>
            </div>
          ) : (
            <div className="text-center">Brak danych do wyświetlenia</div>
          )}
          <div className="mt-12">
            {chartData.labels
              .map((label: string, index: number) => ({
                label,
                color: chartData.datasets[0].backgroundColor[index],
                percentage: (
                  (chartData.datasets[0].data[index] / totalAmount) *
                  100
                ).toFixed(0),
                value: chartData.datasets[0].data[index].toFixed(2),
              }))
              .sort(
                (a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)
              )
              .map(({ label, color, percentage, value }) => (
                <React.Fragment key={label}>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center">
                      <div
                        className="mr-2 h-4 w-4 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-lg">{label}</span>
                    </div>
                    <div className="flex w-[50%] items-center justify-between">
                      <span className="text-lg">{percentage}%</span>
                      <span className="text-lg">{value} zł</span>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MonthlySpendingsDiagram
