import React from 'react'
import { DescriptionTitle, StatisticCardContainer, TotalTitle } from './style'

interface StatisticCardProps {
  total: number
  description: string
}

export function StatisticCard({ total, description }: StatisticCardProps) {
  return (
    <StatisticCardContainer>
      <TotalTitle>{total}</TotalTitle>
      <DescriptionTitle>{description}</DescriptionTitle>
    </StatisticCardContainer>
  )
}
