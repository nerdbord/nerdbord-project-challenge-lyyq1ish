'use client'

import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import 'tailwindcss/tailwind.css'
import { getReceiptsForUser } from '@/app/actions/receiptActions'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)
/*
#F27459,Pomarańczowy
#F29882,Jasny pomarańczowy
#E56B5A,Czerwono-pomarańczowy
#F2D17D,Żółty
#F2C563,Cytrynowy
#F2B549,Złoty
#82F298,Limonkowy
#72D687,Jasnozielony
#63B978,Oliwkowy
#82B5F2,Jasnoniebieski
#7DBEF2,Błękitny
#78A8D9,Szaroniebieski
#B582F2,Lawendowy
#A178D9,Liliowy
#9172C1,Fioletowy
#EEEEEE,Bardzo jasnoszary
#D4D4D4,Jasnoszary
#B9B9B9,Szary
#9E9E9E,Ciemnoszary
#848484,Bardzo ciemnoszary
*/

const RECEIPT_CATEGORIES = [
  { category: 'Spożywcze', color: '#F27459' },
  { category: 'Elektronika', color: '#F29882' },
  { category: 'Odzież', color: '#E56B5A' },
  { category: 'Kosmetyki', color: '#F2C563' },
  { category: 'Dom', color: '#82F298' },
  { category: 'Rozrywka', color: '#63B978' },
  { category: 'Jedzenie', color: '#7DBEF2' },
  { category: 'Zdrowie i leki', color: '#78A8D9' },
  { category: 'Transport', color: '#B582F2' },
  { category: 'Edukacja', color: '#EEEEEE' },
  { category: 'Hobby', color: '#B9B9B9' },
  { category: 'Inne', color: '#848484' },
]

const MonthlySpendingsDiagram = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 1,
        borderColor: '#fff',
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
    const categoryTotals = receipts.reduce((acc, receipt) => {
      const category = receipt.category || 'Inne'
      const amount = parseFloat(receipt.total) || 0
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += amount
      return acc
    }, {})

    const total = Object.values(categoryTotals).reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: number, amount: any) => acc + amount,
      0
    )

    const labels = []
    const data = []
    const backgroundColor = []
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
        <div className="m-4 rounded-xl bg-[#548c9b] p-2">
          <h3 className="p-2 text-center text-2xl">Miesięczne wydatki</h3>
          {chartData.labels.length > 0 ? (
            <div className="relative">
              <Doughnut
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    datalabels: {
                      color: '#fff',
                      formatter: (value) => {
                        const percentage = (
                          (value / totalAmount) *
                          100
                        ).toFixed(0)
                        return `${percentage}%`
                      },
                      font: {
                        weight: 'bold',
                        size: 10,
                      },

                      borderRadius: 8,
                    },
                  },
                  cutout: '75%',
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
          <div className="mt-6">
            {chartData.labels.map((label: string, index: number) => (
              <div
                key={label}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center justify-around">
                  <div
                    className="mr-2 h-4 w-4 rounded-full"
                    style={{
                      backgroundColor:
                        chartData.datasets[0].backgroundColor[index],
                    }}
                  ></div>
                  <span className="text-lg">{label}</span>
                </div>
                <div className="flex gap-12 text-center">
                  <span className="text-lg">
                    {(
                      (chartData.datasets[0].data[index] / totalAmount) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                  <span className="text-lg">
                    {chartData.datasets[0].data[index].toFixed(2)} zł
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MonthlySpendingsDiagram
