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
  const [targetChickenCountValue, setTargetChickenCount] = useState('');
  const unthrottledTargetChickenCount = useMemo(
    () => parseValueString(targetChickenCountValue),
    [targetChickenCountValue]
  );
  const targetChickenCount = useThrottle(unthrottledTargetChickenCount);

  const [unthrottledHatchRate, setInternalHatchRate] = useState(null);
  const internalHatchRate = useThrottle(unthrottledHatchRate);

  const [
    unthrottledArtifactBoostBoostBonus,
    setArtifactBoostBoostBonus,
  ] = useState();
  const artifactBoostBoostBonus = useThrottle(
    unthrottledArtifactBoostBoostBonus
  );

  const [dilithiumBoostBonus, setDilithiumBoostBonus] = useState();

  const [internalHatcheryBuff, setInternalHatcheryBuff] = useState(0);
  const [internalHatcheryCalm, setInternalHatcheryCalm] = useState(200);
  const [isOffline, setIsOffline] = useState(true);

  const [doubleBoostLength, setDoubleBoostLength] = useState(false);
  const [hasProPermit, setHasProPermit] = useState(true);
  const [showOldBoosts, setShowOldBoosts] = useState(false);
  const [maxTokens, setMaxTokens] = useState(30);
  const [maxHours, setMaxHours] = useState(6);

  const [t2Dils, setT2Dils] = useState(0);
  const [prevT2Dils, setPrevT2Dils] = useState(t2Dils);
  const [t3Dils, setT3Dils] = useState(0);
  const [prevT3Dils, setPrevT3Dils] = useState(t3Dils);
  const [t4Dils, setT4Dils] = useState(0);
  const [prevT4Dils, setPrevT4Dils] = useState(t4Dils);

  const refreshDilithiumBoostBonus = () => {

    var total = parseInt(t4Dils) + parseInt(t3Dils) + parseInt(t2Dils);
    if(total > 12) handleBlur(4);

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

  const handleButtonIncrement = (parent) => {
    switch (parent){
      case 4: if(t4Dils === 12) return; setT4Dils(t4Dils + 1); handleDilChange(4, t4Dils + 1); break;
      case 3: if(t3Dils === 12) return; setT3Dils(t3Dils + 1); handleDilChange(3, t3Dils + 1); break;
      case 2: if(t2Dils === 12) return; setT2Dils(t2Dils + 1); handleDilChange(2, t2Dils + 1); break;
      default: break;
    }
  }

  const handleButtonDecrement = (parent) => {
    switch (parent){
      case 4: setT4Dils(t4Dils - 1); handleDilChange(4, t4Dils - 1); break;
      case 3: setT3Dils(t3Dils - 1); handleDilChange(3, t3Dils - 1); break;
      case 2: setT2Dils(t2Dils - 1); handleDilChange(2, t2Dils - 1); break;
      default: break;
    }
  }

  const handleDilChange = (parent, value) => {
      //Handle mobile (no value)
      if(value === "") value = 0;
      else if(value > 12) value = 12;
      else if(value < 0) value = 0;

      switch(parent){
        case 4: setPrevT4Dils(t4Dils); setT4Dils(value); if(parseInt(value) > parseInt(prevT4Dils)) handleBlur(4); break;
        case 3: setPrevT3Dils(t3Dils); setT3Dils(value); if(parseInt(value) > parseInt(prevT3Dils)) handleBlur(3); break;
        case 2: setPrevT2Dils(t2Dils); setT2Dils(value); if(parseInt(value) > parseInt(prevT2Dils)) handleBlur(2); break;
        default: break;
      }
  }

  const subOneDecrease = (parent) => {
    switch (parent){
      case 4: setT3Dils(t3Dils - 1); break;
      case 3: setT4Dils(t4Dils - 1); break;
      case 2: setT4Dils(t4Dils - 1); break;
      default: break;
    }
  }

  const subTwoDecrease = (parent) => {
    switch (parent){
      case 4: setT2Dils(t2Dils - 1); break;
      case 3: setT2Dils(t2Dils - 1); break;
      case 2: setT3Dils(t3Dils - 1); break;
      default: break;
    }
  }

  const handleBlur = (parent) => {
    let total = parseInt(t4Dils) + parseInt(t3Dils) + parseInt(t2Dils);
    var firstSub = 0;
    var secondSub = 0;
    if (total >= 12) {
      switch (parent){
        case 4: firstSub = t3Dils; secondSub = t2Dils; break;
        case 3: firstSub = t4Dils; secondSub = t2Dils; break;
        case 2: firstSub = t4Dils; secondSub = t3Dils; break;
        default: break;
      }

      while(total >= 12){
        if(firstSub > 0){
          subOneDecrease(parent);
          total--;
        } else if(secondSub > 0){
          subTwoDecrease(parent);
          total--;
        }
      }
    }
  }

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
              <div className="flex flex-wrap">
                <img className="w-10 sm:inline-block" alt="T1 Dilithium Monocle" src={monocleUrl1}/>
                <img className="w-10 sm:inline-block" alt="T2 Dilithium Monocle" src={monocleUrl2}/>
                <img className="w-10 sm:inline-block" alt="T3 Dilithium Monocle" src={monocleUrl3}/>
                <img className="w-10 sm:inline-block" alt="T4 Dilithium Monocle" src={monocleUrl4}/>
              </div>
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
              <Input type="number" className="appearance-none w-12" size="sm"
                  step={1} max={12} min={0} placeholder="12, 8, 4, …" value={t4Dils}
                  onChange={({ target: { value } }) => handleDilChange(4, value)} disabled={true}
                  style={{ WebkitAppearance: "none", "-moz-appearance": "textfield" }}
              />{' '}
              <div className='flex flex-col justify-center'>
                <button className="spinner increment dark:text-white"
                onClick={() => handleButtonIncrement(4)}>&#9650;</button>
                <button className="spinner decrement dark:text-white"
                onClick={() => handleButtonDecrement(4)}>&#9660;</button>
              </div>
              <img className="w-10 sm:inline-block" alt="T4 Dilithium Stones" src={dilUrl4}/>

              <Input type="number" className="appearance-none w-12" size="sm"
                  step={1} max={12} min={0} placeholder="12, 8, 4, …" value={t3Dils}
                  onChange={({ target: { value } }) => handleDilChange(3, value)} disabled={true}
                  style={{ WebkitAppearance: "none", "-moz-appearance": "textfield" }}
              />{' '}
              <div className='flex flex-col justify-center'>
                <button className="spinner increment dark:text-white"
                onClick={() => handleButtonIncrement(3)}>&#9650;</button>
                <button className="spinner decrement dark:text-white"
                onClick={() => handleButtonDecrement(3)}>&#9660;</button>
              </div>
              <img className="w-10 sm:inline-block" alt="T3 Dilithium Stones" src={dilUrl3}/>

              <Input type="number" className="appearance-none w-12" size="sm"
                  step={1} max={12} min={0} placeholder="12, 8, 4, …" value={t2Dils}
                  onChange={({ target: { value } }) => handleDilChange(2, value)} disabled={true}
                  style={{ WebkitAppearance: "none", "-moz-appearance": "textfield" }}
              />{' '}
              <div className='flex flex-col justify-center'>
                <button className="spinner increment dark:text-white"
                onClick={() => handleButtonIncrement(2)}>&#9650;</button>
                <button className="spinner decrement dark:text-white"
                onClick={() => handleButtonDecrement(2)}>&#9660;</button>
              </div>
              <img className="w-10 sm:inline-block" alt="T2 Dilithium Stones" src={dilUrl2}/>
            </div>
            <div className="flex items-center dark:text-white text-opacity-50 m-2">
                <b>Stones:</b>&nbsp;({parseInt(t2Dils) + parseInt(t3Dils) + parseInt(t4Dils)} / 12)&nbsp;&nbsp;<b>Time Multiplier:</b>&nbsp;{dilithiumBoostBonus ? dilithiumBoostBonus.toFixed(2) : 1}x
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
                    className="sm:inline-block"
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
