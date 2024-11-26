import { MainHeaderContainer, Logo, ProfileImg } from './style'
import logoImg from '@assets/Logo.png'

export function MainHeader() {
  return (
    <MainHeaderContainer>
      <Logo source={logoImg} />
      <ProfileImg source={{ uri: 'https://github.com/VictorASBrito.png' }} />
    </MainHeaderContainer>
  )
}
