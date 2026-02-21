import s from '../../styles/animations.module.css'

const AshDots = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <div className={s.ashGroup} />
    <div className={s.ashGroup2} />
    <div className={s.ashGroup3} />
  </div>
)
export default AshDots
