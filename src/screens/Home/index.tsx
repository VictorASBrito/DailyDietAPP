import { MainHeader } from '@components/MainHeader'
import {
  BackIcon,
  ButtonMetrics,
  ButtonSubtitle,
  HomeContainer,
  PercentNumberTitle,
  SectionListTitle,
  SnacksContainer,
  SnacksTitle,
  WithoutDataTitle,
} from './style'
import { ButtonComponent } from '@components/ButtonComponent'
import { SectionList } from 'react-native'
import { SnackItemComponent } from '@components/SnackItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { getSnacks } from '@storage/Snacks/getSnacks'

export interface Snack {
  id: number
  name: string
  description: string
  date: string
  time: string
  isOnDiet: boolean
}

export interface SnackSection {
  title: string
  data: Snack[]
}

// Função para calcular a porcentagem de refeições dentro da dieta
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

export function Home() {
  const { navigate } = useNavigation()
  const [snackData, setSnackData] = useState<SnackSection[]>([])
  const [dietPercentage, setDietPercentage] = useState('0%')

  async function fetchData() {
    try {
      const response = await getSnacks()
      if (typeof response !== 'undefined') {
        setSnackData(response)
        const percentage = calculateDietPercentage(response)
        setDietPercentage(percentage)
      }
    } catch (error) {
      console.log('ERROR')
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, []),
  )

  function handleDietsResume() {
    navigate('dietsResume')
  }
  function handleNewSnack() {
    navigate('newSnack')
  }

  return (
    <>
      <MainHeader />
      <HomeContainer>
        <ButtonMetrics onPress={handleDietsResume}>
          <BackIcon />
          <PercentNumberTitle>{dietPercentage}</PercentNumberTitle>
          <ButtonSubtitle>Das refeições dentro da dieta</ButtonSubtitle>
        </ButtonMetrics>
        <SnacksContainer>
          <SnacksTitle>Snacks</SnacksTitle>
          <ButtonComponent
            title="New Snack"
            iconName="plus"
            onPress={handleNewSnack}
          />
          {snackData && (
            <SectionList
              style={{ marginTop: 14 }}
              showsVerticalScrollIndicator={false}
              sections={snackData}
              keyExtractor={(snack) => snack.id.toString()}
              renderItem={({ item }) => (
                <SnackItemComponent snackId={item.id} />
              )}
              ListEmptyComponent={
                <WithoutDataTitle>
                  Você não tem snacks registrados. Que tal adicinar um? 😎
                </WithoutDataTitle>
              }
              renderSectionHeader={({ section: { title } }) => (
                <SectionListTitle>{title}</SectionListTitle>
              )}
            />
          )}
        </SnacksContainer>
      </HomeContainer>
    </>
  )
}
