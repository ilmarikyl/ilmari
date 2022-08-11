import { useTheme } from 'next-themes'
import useLoaded from '../../hooks/useLoaded'
import CloudWorms from './CloudWorms'
import AshDots from './AshDots'

const BackgroundAnimation = () => {
  const { theme, systemTheme } = useTheme()
  const loaded = useLoaded()

  // eslint-disable-next-line prettier/prettier
  const darkModeActive = loaded
    && (theme === 'dark' || (theme === 'system' && systemTheme === 'dark'))

  if (darkModeActive) {
    return <CloudWorms />
  }

  return <AshDots />
}
export default BackgroundAnimation
