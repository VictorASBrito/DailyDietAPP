import React, { useEffect, useState } from 'react'
import { ButtonSubtitle, PercentNumberTitle } from '../../screens/Home/style'
import { BackMetricsIcon, MetricsContainer } from './style'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { getSnacks } from '@storage/Snacks/getSnacks'
import { SnackSection } from '../../screens/Home'

// Função para calcular a porcentagem de snacks dentro da dieta
function calculateDietPercentage(snackSections: SnackSection[]): string {
  let totalSnacks = 0
  let snacksOnDiet = 0

  snackSections.forEach((section) => {
    totalSnacks += section.data.length
    snacksOnDiet += section.data.filter((snack) => snack.isOnDiet).length
  })

  const percentage = totalSnacks > 0 ? (snacksOnDiet / totalSnacks) * 100 : 0
  return `${percentage.toFixed(2)}%`
}

export function MetricsHeader() {
  const { COLORS } = useTheme()
  const { goBack } = useNavigation()
  const [dietPercentage, setDietPercentage] = useState('0%')

  function handleBackScreen() {
    goBack()
  }

  async function fetchDietPercentage() {
    try {
      const snackData = await getSnacks()
      if (snackData) {
        const percentage = calculateDietPercentage(snackData)
        setDietPercentage(percentage)
      }
    } catch (error) {
      console.error('Failed to fetch snacks for metrics:', error)
    }
  }

  useEffect(() => {
    fetchDietPercentage()
  }, [])

  return (
    <MetricsContainer>
      <StatusBar
        backgroundColor={COLORS.GREEN_LIGHT}
        translucent
        barStyle="dark-content"
      />
      <BackMetricsIcon onPress={handleBackScreen} />
      <PercentNumberTitle>{dietPercentage}</PercentNumberTitle>
      <ButtonSubtitle>Snacks on diet</ButtonSubtitle>
    </MetricsContainer>
  )
}
