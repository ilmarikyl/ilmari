import s from '../../styles/animations.module.css'

const CloudWorms = () => (
  <>
    <div className={`${s.cloudworm} ${s.x1}`} />
    <div className={`hidden md:block ${s.cloudworm} ${s.x2}`} />
    <div className={`${s.cloudworm} ${s.x3}`} />
    <div className={`hidden md:block ${s.cloudworm} ${s.x4}`} />
    <div className={`${s.cloudworm} ${s.x5}`} />
    <div className={`hidden md:block ${s.cloudworm} ${s.x6}`} />
    <div className={`${s.cloudworm} ${s.x7}`} />
    <div className={`hidden md:block ${s.cloudworm} ${s.x8}`} />
  </>
)
export default CloudWorms
