import Icon from 'react-native-vector-icons/AntDesign'
import styled from 'styled-components/native'
import { IconComponentProps } from '.'

export const IconComponentContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 2px;
`

export const IconComponenItem = styled(Icon).attrs(
  ({ iconColor, iconName, iconSize }: IconComponentProps) => ({
    size: iconSize,
    name: iconName,
    color: iconColor,
  }),
)<IconComponentProps>`
  border: none;
`
