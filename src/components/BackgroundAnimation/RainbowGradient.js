import s from '../../styles/rainbow.module.css'

const RainbowGradient = () => (
  <div className={s.container} aria-hidden="true">
    <div className={s.gradient} />
    <div className={s.vignette} />
  </div>
)

export default RainbowGradient
