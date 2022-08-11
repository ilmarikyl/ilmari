/* eslint-disable react/no-array-index-key */
import { useSpring, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'

const Bar = ({ barStyle }) => (
  <animated.div
    style={barStyle}
    className="h-full bg-red-400 dark:bg-indigo-500"
  />
)

const StepIndicator = ({ left }) => (
  <div
    className="absolute top-0 h-full w-[2px] bg-red-200 dark:bg-[#162C53]"
    style={{ left }}
  />
)

const Progress = ({ value = 0, steps }) => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const stepSize = steps ? 100 / steps : 0

  const barStyle = useSpring({
    width: inView ? `${value + 0.1}%` : '0%',
    from: { width: '0%' },
  })

  // eslint-disable-next-line prettier/prettier
  const stepIndicators = steps
    && [...Array(steps)].map((v, i) => (
      <StepIndicator key={i} left={`${(i + 1) * stepSize}%`} />
    ))

  return (
    <div
      className=" relative h-[10px] overflow-hidden rounded bg-[#E2E8F0] dark:bg-indigo-200 "
      ref={ref}
    >
      <Bar barStyle={barStyle} />
      {stepIndicators}
    </div>
  )
}

export default Progress
