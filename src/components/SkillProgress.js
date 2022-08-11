// SkillProgress is a modified version of a component originally created
// by Kalle Ilves (https://github.com/kalleilves/kalleilves.github.io)

import useTranslation from 'next-translate/useTranslation'
import Progress from './Progress'

const labelByLevel = {
  moderate: 'moderate-skills',
  good: 'good-skills',
  excellent: 'excellent-skills',
}

const valueByLevel = {
  moderate: 33.33,
  good: 66.66,
  excellent: 100,
}

const SkillProgress = ({
  level = 'good',
  skill,
  skillLocKey,
  descriptionLocKey,
  label: labelProp,
}) => {
  const { t } = useTranslation('common')
  const label = labelProp || (labelByLevel[level] ?? labelByLevel.good)

  const value = valueByLevel[level] ?? valueByLevel.good
  const hasDescription = Boolean(descriptionLocKey)
  const skillToShow = skill ?? t(skillLocKey)

  return (
    <div>
      <div className="mb-2">
        <h2 className={`font-semibold ${hasDescription ? 'mb-2' : 0}`}>
          {skillToShow}
        </h2>
        {hasDescription && (
          <p className="text-sm text-gray-700 dark:text-blue-200">
            {t(descriptionLocKey)}
          </p>
        )}
      </div>
      <Progress value={value} steps={3} />
      <h2 className="mt-1">{t(label)}</h2>
    </div>
  )
}

export default SkillProgress
