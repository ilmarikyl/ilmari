import s from '../../styles/rainbow.module.css'

const RainbowGradient = () => {
  // Create 25 rainbow stripes
  const rainbows = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className={`${s.rainbow} ${s[`rainbow${i + 1}`]}`} />
  ))

  return (
    <div className={s.container}>
      {rainbows}
      <div className={s.h} />
      <div className={s.v} />
    </div>
  )
}

export default RainbowGradient

