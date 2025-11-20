import s from '../../styles/rainbow.module.css'

const RainbowGradient = () => {
  // Create rainbow stripes - fewer on mobile for better performance
  const rainbows = Array.from({ length: 25 }, (_, i) => {
    const rainbowClass = `rainbow${i + 1}`
    const classes = [s.rainbow, s[rainbowClass]]
    
    // Hide stripes 9-25 on mobile for better performance
    if (i >= 8) {
      classes.push(s.desktopOnly)
    }
    
    return <div key={i} className={classes.join(' ')} />
  })

  return (
    <div className={s.container}>
      {rainbows}
      <div className={s.h} />
      <div className={s.v} />
    </div>
  )
}

export default RainbowGradient
