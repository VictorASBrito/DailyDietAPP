import AsyncStorage from '@react-native-async-storage/async-storage'
import { SNACKS_COLLECTION } from '@storage/storageConfig'

import { getSnacks } from './getSnacks'
import { SnackSection } from 'src/screens/Home'

export async function createSnacks(snack: SnackSection) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storedSnacks = await getSnacks()
    /* Poderia passar o ID tambem mas tenho mais controle pelo nome */

    // TODO - ESTA SEMPRE ENTRANDO NO IF pode ser o array vazio!
    // const snackAlreadyExitis = storedSnacks.map(
    //   (snackItem) => snackItem.name === snack.name,
    // )
    // if (snackAlreadyExitis) {
    //   throw new AppError('Snack Already Exists')
    // }
    const storage = JSON.stringify([...storedSnacks, snack])
    await AsyncStorage.setItem(SNACKS_COLLECTION, storage)
  } catch (error) {
    console.log('error')
    throw error
  }
}
