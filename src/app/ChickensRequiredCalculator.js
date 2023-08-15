import React, { useMemo, useState } from 'react'
import Card from 'app/components/Card'
import Input from 'app/components/Input'
import ButtonGroup from 'app/components/ButtonGroup'
import {
  displayValue,
  displayValueShort,
  parseValueString,
} from 'app/utils/suffixes'
import classnames from 'classnames'

import nineDotUrl from 'app/images/Nine_Dot_Menu.png'
import statsUrl from 'app/images/Stats.png'

const ChickensRequiredCalculator = () => {
  const [targetLayRateValue, setTargetLayRateValue] = useState('')
  const [targetLayRateUnit, setTargetLayRateUnit] = useState('per hour')
  const targetLayRate = useMemo(() => parseValueString(targetLayRateValue), [
    targetLayRateValue,
  ])

  const targetLayRatePerHour =
    targetLayRate &&
    targetLayRate * { 'per minute': 60, 'per hour': 1 }[targetLayRateUnit]

  const [currentLayRateValue, setCurrentLayRateValue] = useState('')
  const [currentLayRateUnit, setCurrentLayRateUnit] = useState('per hour')
  const currentLayRate = useMemo(() => parseValueString(currentLayRateValue), [
    currentLayRateValue,
  ])

  const currentLayRatePerHour =
    currentLayRate &&
    currentLayRate * { 'per minute': 60, 'per hour': 1 }[currentLayRateUnit]

  const [currentChickenCountValue, setCurrentChickenCountValue] = useState('')
  const currentChickenCount = useMemo(
    () => parseValueString(currentChickenCountValue),
    [currentChickenCountValue]
  )

  const haveValues = !!(targetLayRate && currentLayRate && currentChickenCount)

  const chickensNeeded =
    haveValues &&
    (targetLayRatePerHour / currentLayRatePerHour) * currentChickenCount

  return (
    <Card title="How many chickens do I need?">
      <div className="p-4 space-y-6">
        <label className="flex flex-col font-semibold">
          <div className="mb-2 dark:text-white text-opacity-80">
            Target Egg Lay Rate
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="text"
              placeholder="4200, 10K, 5.2B, 6e9, …"
              className={classnames('flex-grow flex-shrink', {
                'border-red-500 dark:border-red-500':
                  targetLayRateValue && !targetLayRate,
              })}
              value={targetLayRateValue}
              onChange={({ target: { value } }) => setTargetLayRateValue(value)}
            />
            <ButtonGroup>
              {['per minute', 'per hour'].map((lengthOption) => (
                <ButtonGroup.Button
                  key={lengthOption}
                  selected={targetLayRateUnit === lengthOption}
                  onClick={() => setTargetLayRateUnit(lengthOption)}
                >
                  {lengthOption}
                </ButtonGroup.Button>
              ))}
            </ButtonGroup>
          </div>
          <div className="h-5 text-sm text-gray-500 mt-1 ml-2 font-normal">
            {targetLayRate &&
              `${displayValue(targetLayRate)} (${displayValueShort(
                targetLayRate
              )})`}
          </div>
        </label>

        <label className="flex flex-col font-semibold">
          <div className="mb-2 dark:text-white text-opacity-80 flex items-center">
            Current Egg Lay Rate
            <div className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-xl ml-2 flex items-center">
              <span className="text-xs">Found in </span><img alt="9 dot menu" className="w-10 h-10 ml-2" src={nineDotUrl}></img><span className="text-xs pl-2">→</span><img alt="Stats sub-menu" className="w-10 h-10 ml-2" src={statsUrl}></img><span className="text-xs pl-2">Stats</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="text"
              placeholder="4200, 10K, 5.2B, 6e9, …"
              className={classnames('flex-grow', {
                'border-red-500 dark:border-red-500':
                  currentLayRateValue && !currentLayRate,
              })}
              value={currentLayRateValue}
              onChange={({ target: { value } }) =>
                setCurrentLayRateValue(value)
              }
            />
            <ButtonGroup>
              {['per minute', 'per hour'].map((lengthOption) => (
                <ButtonGroup.Button
                  key={lengthOption}
                  selected={currentLayRateUnit === lengthOption}
                  onClick={() => setCurrentLayRateUnit(lengthOption)}
                >
                  {lengthOption}
                </ButtonGroup.Button>
              ))}
            </ButtonGroup>
          </div>
          <div className="h-5 text-sm text-gray-500 mt-1 ml-2 font-normal">
            {currentLayRate &&
              `${displayValue(currentLayRate)} (${displayValueShort(
                currentLayRate
              )})`}
          </div>
        </label>

        <label className="flex flex-col font-semibold">
          <div className="mb-2 dark:text-white text-opacity-80">
            Current Chicken Count
          </div>
          <Input
            type="text"
            placeholder="4200, 10K, 5.2B, 6e9, …"
            className={classnames('flex-grow', {
              'border-red-500 dark:border-red-500':
                currentChickenCountValue && !currentChickenCount,
            })}
            value={currentChickenCountValue}
            onChange={({ target: { value } }) =>
              setCurrentChickenCountValue(value)
            }
          />
          <div className="h-5 text-sm text-gray-500 mt-1 ml-2 font-normal">
            {currentChickenCount &&
              `${displayValue(currentChickenCount)} (${displayValueShort(
                currentChickenCount
              )})`}
          </div>
        </label>

        {haveValues && (
          <div className="border-2 border-blue-100 dark:border-blue-600">
            <div className="px-2 py-1 bg-blue-200 font-medium text-xs text-opacity-80 text-center bg-blue-600 text-white">
              Chickens needed for target lay rate
            </div>
            <div className="text-center dark:text-white py-2">
              {displayValue(chickensNeeded)} (
              {displayValueShort(chickensNeeded - currentChickenCount)}{' '}
              {chickensNeeded > 0 ? 'more' : 'fewer'})
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

ChickensRequiredCalculator.propTypes = {}

export default ChickensRequiredCalculator
