/**
 * Example taken from
 * https://gist.github.com/iamchristough/493c60112770058566d559e6860dc4c9
 */

import FlagFinland from '../../../../svg/icons/flag_finland.svg'
import FlagUK from '../../../../svg/icons/flag_uk.svg'
import Sun from '../../../../svg/icons/sun.svg'
import Moon from '../../../../svg/icons/moon.svg'
import GitHub from '../../../../svg/icons/logo_github.svg'
import LinkedIn from '../../../../svg/icons/logo_linkedin.svg'
import Email from '../../../../svg/icons/email.svg'
import HuggingFace from '../../../../svg/icons/logo_huggingface.svg'
import Close from '../../../../svg/icons/close.svg'
import Hamburger from '../../../../svg/icons/hamburger.svg'
import Logo from '../../../../svg/icons/logo_own.svg'

export default function Icon({ name, hoverGrow, themeIcon, big }) {
  const classProp = ` ${big ? 'h-[2em] w-[2em]' : 'h-[1.5em] w-[1.5em]'}`

  let extraClasses = ''

  if (hoverGrow) {
    extraClasses += 'md:hover:scale-[1.4] duration-300'
  }

  if (themeIcon === 'sun') {
    extraClasses += ' text-yellow-500 hover:text-yellow-200'
  }

  if (themeIcon === 'moon') {
    extraClasses += ' text-gray-600 hover:text-gray-400 '
  }

  const iconProps = {
    className: classProp,
  }

  const icons = {
    flagFinland: <FlagFinland {...iconProps} />,
    flagUK: <FlagUK {...iconProps} />,
    sun: <Sun {...iconProps} />,
    moon: <Moon {...iconProps} />,
    gitHub: <GitHub {...iconProps} />,
    linkedIn: <LinkedIn {...iconProps} />,
    email: <Email {...iconProps} />,
    huggingFace: <HuggingFace {...iconProps} />,
    close: <Close {...iconProps} />,
    hamburger: <Hamburger {...iconProps} />,
    logo: <Logo {...iconProps} />,
  }

  const icon = icons[name]

  return <div className={`${extraClasses} overflow-visible p-2`}>{icon}</div>
}
