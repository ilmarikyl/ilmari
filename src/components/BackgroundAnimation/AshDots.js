import s from '../../styles/animations.module.css'

const AshDots = () => (
  <div className="absolute h-full w-full overflow-hidden">
    <div className={s.ashGroup} />
    <div className={s.ashGroup2} />
    <div className={s.ashGroup3} />
  </div>
)
export default AshDots
