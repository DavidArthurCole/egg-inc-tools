import React, { useMemo, useState, useEffect } from 'react'
import Card from './components/Card'
import {
  displayValue,
  displayValueShort,
  parseValueString,
} from './utils/suffixes'
import Input from './components/Input'
import BoostTable from './BoostTable'
import { useThrottle } from 'ahooks'

import tokenUrl from 'app/images/Token.png'

import dilUrl2 from 'app/images/Dilithium_Stone2.png'
import dilUrl3 from 'app/images/Dilithium_Stone3.png'
import dilUrl4 from 'app/images/Dilithium_Stone4.png'

import monocleUrl1 from 'app/images/Monocle1.png'
import monocleUrl2 from 'app/images/Monocle2.png'
import monocleUrl3 from 'app/images/Monocle3.png'
import monocleUrl4 from 'app/images/Monocle4.png'

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

  const [internalHatcheryBuff, setInternalHatcheryBuff] = useState(0)
  const [internalHatcheryCalm, setInternalHatcheryCalm] = useState(200)
  const [isOffline, setIsOffline] = useState(true)

  const [doubleBoostLength, setDoubleBoostLength] = useState(false)
  const [hasProPermit, setHasProPermit] = useState(true)
  const [showOldBoosts, setShowOldBoosts] = useState(false)
  const [maxTokens, setMaxTokens] = useState(30)
  const [maxHours, setMaxHours] = useState(6)

  const [t2Dils, setT2Dils] = useState(0)
  const [t3Dils, setT3Dils] = useState(0)
  const [t4Dils, setT4Dils] = useState(0)

  const refreshDilithiumBoostBonus = () => {
    var mult = 1;
    //For each T4, multiply by 1.08 compounding
    mult *= Math.pow(1.08, t4Dils);
    //For each T3, multiply by 1.06 compounding
    mult *= Math.pow(1.06, t3Dils);
    //For each T2, multiply by 1.03 compounding
    mult *= Math.pow(1.03, t2Dils);
  
    setDilithiumBoostBonus(mult);
  }
  
  useEffect(() => {
    refreshDilithiumBoostBonus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t2Dils, t3Dils, t4Dils]);

  const haveValues = !!(targetChickenCount && internalHatchRate)

  const hatchRate =
    haveValues &&
    (isOffline
      ? internalHatchRate * (1 + internalHatcheryCalm / 100)
      : internalHatchRate) * 4

  return (
    <Card
      title="What boosts can I use?"
      subtitle={<div><span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-xl ml-2">Includes Jan 14, 2022 boost changes</span></div>}
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
              Monocle Boost Bonus
              <img className="hidden w-10 sm:inline-block" alt="T1 Dilithium Monocle" src={monocleUrl1}/>
              <img className="hidden w-10 sm:inline-block" alt="T2 Dilithium Monocle" src={monocleUrl2}/>
              <img className="hidden w-10 sm:inline-block" alt="T3 Dilithium Monocle" src={monocleUrl3}/>
              <img className="hidden w-10 sm:inline-block" alt="T4 Dilithium Monocle" src={monocleUrl4}/>
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
              Dilithium Stone Bonus
            </div>
            <div className="flex space-x-2">

              <Input type="number" className="w-16" size="sm"
                  step={1} max={12} placeholder="12, 8, 4, …" value={t4Dils}
                  onChange={({ target: { value } }) =>
                    setT4Dils(value)
                  }
              />{' '}
              <img className="hidden w-10 sm:inline-block" alt="T4 Dilithium Stones" src={dilUrl4}/>

              <Input type="number" className="w-16" size="sm"
                  step={1} max={12} placeholder="12, 8, 4, …" value={t3Dils}
                  onChange={({ target: { value } }) =>
                      setT3Dils(value)
                  }
              />{' '}
              <img className="hidden w-10 sm:inline-block" alt="T3 Dilithium Stones" src={dilUrl3}/>

              <Input type="number" className="w-16" size="sm"
                  step={1} max={12} placeholder="12, 8, 4, …" value={t2Dils}
                  onChange={({ target: { value } }) =>
                      setT2Dils(value)
                  }
              />{' '}
              <img className="hidden w-10 sm:inline-block" alt="T2 Dilithium Stones" src={dilUrl2}/>
            </div>
          </label>

        </div>

        <hr></hr>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
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
                Boost Event
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

            <div className="flex flex-col flex-row">
              <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                Max Tokens
                <span className="uppercase bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-xl ml-2">NEW</span>
              </div>
              <div className="flex space-x-2">
                <div className="flex-grow flex items-center dark:text-white text-opacity-50 w-12">
                  <label className="flex items-center space-x-2">
                  <Input
                    type="number"
                    className="w-20"
                    size="sm"
                    step={1}
                    placeholder="20, 16, 14, …"
                    value={maxTokens}
                    onChange={({ target: { value } }) =>
                      setMaxTokens(value)
                    }
                  />{' '}
                  <img
                    className="hidden sm:inline-block"
                    alt="Tokens"
                    src={tokenUrl}
                  />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-row">
              <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                Max Boost Time
                <span className="uppercase bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-xl ml-2">NEW</span>
              </div>
              <div className="flex space-x-2">
                <div className="flex-grow flex items-center dark:text-white text-opacity-50 w-12">
                  <label className="flex items-center space-x-2">
                  <Input
                    type="number"
                    className="w-20"
                    size="sm"
                    step={1}
                    min={1}
                    max={24}
                    placeholder="12, 6, 2, …"
                    value={maxHours}
                    onChange={({ target: { value } }) =>
                      setMaxHours(value)
                    }
                  />{' '}
                  <div className="flex items-center dark:text-white text-opacity-50">
                    hours
                  </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>

        <Card
          title={<div>Contract-Specific Buffs/Debuffs <span className="uppercase bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-xl ml-2">NEW</span></div>}
        >
          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-y-6 md:space-x-3 lg:space-y-0 lg:space-x-6 p-4 space-y-6">
            <div className="flex flex-col flex-row">
              <label className="flex flex-col">
                <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                  Internal Hatchery Rate (IHR)
                </div>
                <div className="flex space-x-2">
                  <input
                    type="range"
                    value={internalHatcheryBuff}
                    min={-80}
                    max={100}
                    step={5}
                    onChange={({ target: { value } }) =>
                    setInternalHatcheryBuff(value)
                    }
                  />{' '}
                  <div className="flex items-center justify-end dark:text-white text-opacity-50 w-12">
                    {internalHatcheryBuff > 0 && '+'}
                    {internalHatcheryBuff}%
                  </div>
                </div>
              </label>
            </div>
          </div>
        </Card>

        {haveValues && (
          <BoostTable
            target={targetChickenCount}
            hatchRate={hatchRate}
            hasProPermit={hasProPermit}
            showOldBoosts={showOldBoosts}
            artifactBoostBoostBonus={artifactBoostBoostBonus}
            dilithiumBoostBonus={dilithiumBoostBonus ? dilithiumBoostBonus : 1}
            doubleBoostLength={doubleBoostLength}
            internalHatcheryBuff={internalHatcheryBuff}
            maxTokens={maxTokens}
            maxHours={maxHours}
          />
        )}
      </div>
    </Card>
  )
}

BoostCalculator.propTypes = {}

export default BoostCalculator
