import React, { useEffect, useState } from 'react'
import {
  DietsResumeContainer,
  SnacksMetricsContainer,
  StatisticsContainer,
  StatisticsTitle,
} from './style'
import { StatisticCard } from '@components/StatisticsCard'
import { MetricsHeader } from '@components/MetricsHeader'
import { getSnacks } from '@storage/Snacks/getSnacks'
import { SnackSection } from '../Home'

function calculateTotals(snackSections: SnackSection[]) {
  let totalSnacks = 0
  let snacksOnDiet = 0
  let snacksOffDiet = 0

  snackSections.forEach((section) => {
    const sectionTotal = section.data.length
    totalSnacks += sectionTotal
    snacksOnDiet += section.data.filter((snack) => snack.isOnDiet).length
    snacksOffDiet += section.data.filter((snack) => !snack.isOnDiet).length // Corrigido
  })

  return { totalSnacks, snacksOnDiet, snacksOffDiet }
}


export function DietsResume() {
  const [totals, setTotals] = useState({
    totalSnacks: 0,
    snacksOnDiet: 0,
    snacksOffDiet: 0,
  })

  async function fetchStatistics() {
    try {
      const snackData = await getSnacks()
      if (snackData) {
        const { totalSnacks, snacksOnDiet, snacksOffDiet } = calculateTotals(snackData)
        setTotals({ totalSnacks, snacksOnDiet, snacksOffDiet })
      }
    } catch (error) {
      console.error('Failed to fetch statistics:', error)
    }
  }

  useEffect(() => {
    fetchStatistics()
  }, [])

  return (
    <>
      <MetricsHeader />
      <DietsResumeContainer>
        <StatisticsContainer>
          <StatisticsTitle>Estatísticas Gerais</StatisticsTitle>
          <StatisticCard
            total={totals.snacksOnDiet}
            description="Refeições dentro da dieta"
          />
          <StatisticCard
            total={totals.snacksOffDiet}
            description="Refeições fora da dieta"
          />
          <StatisticCard
            total={totals.totalSnacks}
            description="Número de refeições"
          />
        </StatisticsContainer>
        <SnacksMetricsContainer></SnacksMetricsContainer>
      </DietsResumeContainer>
    </>
  )
}
