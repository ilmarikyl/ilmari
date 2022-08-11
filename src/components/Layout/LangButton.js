import { useRouter } from 'next/router'
import Link from 'next/link'
import Icon from '../UI/Icons/Icon'

const LangButton = () => {
  const router = useRouter()

  let oppositeLocale = 'fi'
  let oppositeIconName = 'flagFinland'
  let title = 'Switch to Finnish'

  if (router.locale === 'fi') {
    oppositeLocale = 'en'
    oppositeIconName = 'flagUK'
    title = 'Vaihda kieleksi englanti'
  }

  return (
    <Link href={router.asPath} locale={oppositeLocale}>
      <a title={title}>
        <Icon name={oppositeIconName} hoverGrow />
      </a>
    </Link>
  )
}

export default LangButton
