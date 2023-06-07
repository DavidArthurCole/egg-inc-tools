import React, { useMemo, useState } from 'react'
import Card from './components/Card'
import {
  displayValue,
  displayValueShort,
  parseValueString,
} from './utils/suffixes'
import Input from './components/Input'
import BoostTable from './BoostTable'
import { useThrottle } from 'ahooks'

const BoostCalculator = (props) => {
  const [targetChickenCountValue, setTargetChickenCount] = useState('')
  const unthrottledTargetChickenCount = useMemo(
    () => parseValueString(targetChickenCountValue),
    [targetChickenCountValue]
  )
  const targetChickenCount = useThrottle(unthrottledTargetChickenCount)

  const [unthrottledHatchRate, setInternalHatchRate] = useState(null)
  const internalHatchRate = useThrottle(unthrottledHatchRate)

  const [
    unthrottledArtifactBoostBoostBonus,
    setArtifactBoostBoostBonus,
  ] = useState()
  const artifactBoostBoostBonus = useThrottle(
    unthrottledArtifactBoostBoostBonus
  )

  const [dilithiumBoostBonus, setDilithiumBoostBonus] = useState()

  const [internalHatcheryCalm, setInternalHatcheryCalm] = useState(200)
  const [isOffline, setIsOffline] = useState(true)

  const [doubleBoostLength, setDoubleBoostLength] = useState(false)
  const [hasProPermit, setHasProPermit] = useState(true)
  const [showOldBoosts, setShowOldBoosts] = useState(false)

  const haveValues = !!(targetChickenCount && internalHatchRate)

  const hatchRate =
    haveValues &&
    (isOffline
      ? internalHatchRate * (1 + internalHatcheryCalm / 100)
      : internalHatchRate) * 4

  return (
    <Card
      title="What boosts can I use?"
      subtitle="Includes Jan 14, 2022 boost changes"
    >
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
          <label className="flex flex-col font-semibold">
            <div className="mb-2 dark:text-white text-opacity-80">
              Chickens Desired
            </div>
            <Input
              type="text"
              value={targetChickenCountValue}
              className={
                targetChickenCountValue &&
                !unthrottledTargetChickenCount &&
                'border-red-500'
              }
              onChange={({ target: { value } }) => setTargetChickenCount(value)}
              placeholder="4200, 10K, 5.2B, 6e9, …"
            />
            <div className="h-5 text-sm text-gray-500 mt-1 ml-2 font-normal">
              {unthrottledTargetChickenCount &&
                `${displayValue(
                  unthrottledTargetChickenCount
                )} (${displayValueShort(unthrottledTargetChickenCount)})`}
            </div>
          </label>

          <label className="flex flex-col">
            <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
              Current Internal Hatch Rate
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                className="flex-grow"
                placeholder="1, 2, 10, …"
                value={unthrottledHatchRate || ''}
                onChange={({ target: { value } }) =>
                  setInternalHatchRate(parseInt(value, 10) || null)
                }
              />{' '}
              <div className="flex items-center dark:text-white text-opacity-50">
                🐔 / hab / minute
              </div>
            </div>
          </label>

          <label className="flex flex-col">
            <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
              Artifact Boost Boost Bonus
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                className="flex-grow"
                placeholder="1, 2, 10, …"
                value={unthrottledArtifactBoostBoostBonus}
                onChange={({ target: { value } }) =>
                  setArtifactBoostBoostBonus(parseInt(value, 10) || null)
                }
              />{' '}
              <div className="flex items-center dark:text-white text-opacity-50">
                % boost boost
              </div>
            </div>
          </label>

          <label className="flex flex-col">
            <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
              Artifact Boost Duration Bonus - &nbsp;
              <a href="https://wasmegg.netlify.app/artifact-sandbox/#/b/" target="_blank">Calculate @ Artifact Sandbox</a>
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                step={0.01}
                presicion={2}
                className="flex-grow"
                placeholder="1.05, 1.1, 1.5, …"
                value={dilithiumBoostBonus}
                onChange={({ target: { value } }) =>
                  setDilithiumBoostBonus(parseFloat(value, 10) || null)
                }
              />{' '}
              <div className="flex items-center dark:text-white text-opacity-50">
                x Boost Duration
              </div>
            </div>
          </label>

          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-y-6 md:space-x-3 lg:space-y-0 lg:space-x-6">
            <label className="flex flex-col">
              <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                Internal Hatchery Calm
              </div>
              <div className="flex space-x-2">
                <input
                  type="range"
                  className="flex-grow"
                  value={internalHatcheryCalm}
                  min={0}
                  max={200}
                  step={10}
                  onChange={({ target: { value } }) =>
                    setInternalHatcheryCalm(value)
                  }
                />{' '}
                <div className="flex items-center justify-end dark:text-white text-opacity-50 w-12">
                  {internalHatcheryCalm}%
                </div>
              </div>
            </label>

            <div className="flex flex-col">
              <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                Offline
              </div>
              <div className="flex space-x-2">
                <div className="flex-grow flex items-center dark:text-white text-opacity-50 w-12">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isOffline}
                      onChange={({ target: { checked } }) =>
                        setIsOffline(checked)
                      }
                    />
                    <span>Away from farm</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                Pro Permit
              </div>
              <div className="flex space-x-2">
                <div className="flex-grow flex items-center dark:text-white text-opacity-50 w-12">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={hasProPermit}
                      onChange={({ target: { checked } }) =>
                        setHasProPermit(checked)
                      }
                    />
                    <span>Have Pro Permit</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                Old Boosts (pre-Jan 2022)
              </div>
              <div className="flex space-x-2">
                <div className="flex-grow flex items-center dark:text-white text-opacity-50 w-12">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showOldBoosts}
                      onChange={({ target: { checked } }) =>
                        setShowOldBoosts(checked)
                      }
                    />
                    <span>Include Old Boosts</span>
                  </label>
                </div>
              </div>
            </div>

          </div>

          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-y-6 md:space-x-3 lg:space-y-0 lg:space-x-6">
          <div className="flex flex-col flex-row">
              <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                2x Boost Duration Event
                <span class="uppercase bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-xl ml-2">NEW</span>
              </div>
              <div className="flex space-x-2">
                <div className="flex-grow flex items-center dark:text-white text-opacity-50 w-12">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={doubleBoostLength}
                      onChange={({ target: { checked } }) =>
                        setDoubleBoostLength(checked)
                      }
                    />
                    <span>2x Boost Duration Event</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>

        {haveValues && (
          <BoostTable
            target={targetChickenCount}
            hatchRate={hatchRate}
            hasProPermit={hasProPermit}
            showOldBoosts={showOldBoosts}
            artifactBoostBoostBonus={artifactBoostBoostBonus}
            dilithiumBoostBonus={dilithiumBoostBonus ? dilithiumBoostBonus : 1}
            doubleBoostLength={doubleBoostLength}
          />
        )}
      </div>
    </Card>
  )
}

BoostCalculator.propTypes = {}

export default BoostCalculator
