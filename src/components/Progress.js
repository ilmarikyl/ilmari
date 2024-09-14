import { useSpring, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'

const Bar = ({ barStyle }) => (
  <animated.div
    style={barStyle}
    className="animate-gradient dark:from-green-700 dark:via-green-600 dark:to-green-700 h-full w-full bg-gradient-to-r from-red-400 via-red-500 to-red-400 bg-[length:200%_100%]"
  />
)

const StepIndicator = ({ left }) => (
  <div
    className="absolute top-0 h-full w-[2px] bg-white dark:bg-gray-800"
    style={{ left }}
  />
)

const Progress = ({ value = 0, steps }) => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const stepSize = steps ? 100 / steps : 0

  const barStyle = useSpring({
    width: inView ? `${value}%` : '0%',
    from: { width: '0%' },
  })

  const stepIndicators = steps
    ? Array.from({ length: steps }, (_, i) => (
        <StepIndicator
          key={`step-${i + 1}-of-${steps}`}
          left={`${(i + 1) * stepSize}%`}
        />
      ))
    : null

  return (
    <div
      className="relative h-3 overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-gray-400"
      ref={ref}
    >
      <div className="absolute inset-0 flex">
        <Bar barStyle={barStyle} />
      </div>
      {stepIndicators}
    </div>
  )
}

export default Progress
