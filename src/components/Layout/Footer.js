import Icon from '../UI/Icons/Icon'

const FooterItem = ({ name, logofile, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className="flex items-center gap-2 duration-200 hover:text-light-primary-hl dark:hover:text-dark-primary-hl">
      <Icon name={logofile} big />
      <span className="hidden md:block">{name}</span>
    </div>
  </a>
)

const Footer = () => (
  <footer className="text-md flex w-full justify-center gap-x-12 rounded-lg py-2 px-2 text-base backdrop-blur-xs dark:backdrop-blur-md md:gap-x-16 md:pb-4 md:pt-8">
    <FooterItem
      name="Email"
      logofile="email"
      link="mailto:kylliainenilmari@gmail.com"
    />
    <FooterItem
      name="GitHub"
      logofile="gitHub"
      link="https://github.com/ilmarikyl"
    />
    <FooterItem
      name="LinkedIn"
      logofile="linkedIn"
      link="https://www.linkedin.com/in/ilmari-kylliainen"
    />
    <FooterItem
      name="HuggingFace"
      logofile="huggingFace"
      link="https://huggingface.co/ilmariky"
    />
  </footer>
)

export default Footer
