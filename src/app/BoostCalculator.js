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

import nineDotUrl from 'app/images/Nine_Dot_Menu.png'
import statsUrl from 'app/images/Stats.png'

const BoostCalculator = (props) => {
  const [targetChickenCountValue, setTargetChickenCount] = useState('');
  const unthrottledTargetChickenCount = useMemo(
    () => parseValueString(targetChickenCountValue.replaceAll(',', '')),
    [targetChickenCountValue]
  );
  const targetChickenCount = useThrottle(unthrottledTargetChickenCount);

  const [currentHatchRateValue, setCurrentHatchRate] = useState('');
  const unthrottledCurrentHatchRate = useMemo(
    () => parseValueString(currentHatchRateValue.replaceAll(',', '')),
    [currentHatchRateValue]
  );
  const currentHatchRate = useThrottle(unthrottledCurrentHatchRate);

  const [
    unthrottledArtifactBoostBoostBonus,
    setArtifactBoostBoostBonus,
  ] = useState();
  const artifactBoostBoostBonus = useThrottle(
    unthrottledArtifactBoostBoostBonus
  );

  const [dilithiumBoostBonus, setDilithiumBoostBonus] = useState();
  const [internalHatcheryCalm, setInternalHatcheryCalm] = useState(200);
  const [isOffline, setIsOffline] = useState(true);

  const [doubleBoostLength, setDoubleBoostLength] = useState(false);
  const [hasProPermit, setHasProPermit] = useState(true);
  const [showOldBoosts, setShowOldBoosts] = useState(false);
  const [useBetaTokens, setUseBetaTokens] = useState(true);
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

  const haveValues = !!(targetChickenCount && currentHatchRate)

  const hatchRate =
    haveValues &&
    (isOffline
      ? currentHatchRate * (1 + internalHatcheryCalm / 100)
      : currentHatchRate) * 4

  return (
    <Card title="What boosts can I use?">
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
            <div className="mb-2 dark:text-white text-opacity-80 font-semibold flex items-center">
              Current Internal Hatch Rate (IHR)
              <div className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-xl ml-2 flex items-center">
                <span className="text-xs">Found in </span><img alt="9 dot menu" className="w-10 h-10 ml-2" src={nineDotUrl}></img><span className="text-xs pl-2">→</span><img alt="Stats sub-menu" className="w-10 h-10 ml-2" src={statsUrl}></img><span className="text-xs pl-2">Stats</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Input
                type="text"
                className="flex-grow"
                value={currentHatchRateValue}
                onChange={({ target: { value } }) => setCurrentHatchRate(value)}
                placeholder="9200, 9.2K, '9,200', …"
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
                <img className="w-10 sm:inline-block" alt="T1 Dilithium Monocle" src={monocleUrl1} onClick={() => setArtifactBoostBoostBonus(5)}/>
                <img className="w-10 sm:inline-block" alt="T2 Dilithium Monocle" src={monocleUrl2} onClick={() => setArtifactBoostBoostBonus(10)}/>
                <img className="w-10 sm:inline-block" alt="T3 Dilithium Monocle" src={monocleUrl3} onClick={() => setArtifactBoostBoostBonus(14)}/>
                <img className="w-10 sm:inline-block" alt="T4 Dilithium Monocle" src={monocleUrl4} onClick={() => setArtifactBoostBoostBonus(20)}/>
              </div>
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                className="flex-grow"
                placeholder="1, 2, 10, …" min={0}
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
                  style={{ WebkitAppearance: "none", "MozAppearance": "textfield" }}
              />{' '}
              <div className='flex flex-col justify-center'>
                <button className="spinner increment dark:text-white"
                onClick={() => handleButtonIncrement(4)}>&#9650;</button>
                <button className="spinner decrement dark:text-white"
                onClick={() => handleButtonDecrement(4)}>&#9660;</button>
              </div>
              <img className="w-10 h-10 sm:inline-block" alt="T4 Dilithium Stones" src={dilUrl4}/>

              <Input type="number" className="appearance-none w-12" size="sm"
                  step={1} max={12} min={0} placeholder="12, 8, 4, …" value={t3Dils}
                  onChange={({ target: { value } }) => handleDilChange(3, value)} disabled={true}
                  style={{ WebkitAppearance: "none", "MozAppearance": "textfield" }}
              />{' '}
              <div className='flex flex-col justify-center'>
                <button className="spinner increment dark:text-white"
                onClick={() => handleButtonIncrement(3)}>&#9650;</button>
                <button className="spinner decrement dark:text-white"
                onClick={() => handleButtonDecrement(3)}>&#9660;</button>
              </div>
              <img className="w-10 h-10 sm:inline-block" alt="T3 Dilithium Stones" src={dilUrl3}/>

              <Input type="number" className="appearance-none w-12" size="sm"
                  step={1} max={12} min={0} placeholder="12, 8, 4, …" value={t2Dils}
                  onChange={({ target: { value } }) => handleDilChange(2, value)} disabled={true}
                  style={{ WebkitAppearance: "none", "MozAppearance": "textfield" }}
              />{' '}
              <div className='flex flex-col justify-center'>
                <button className="spinner increment dark:text-white"
                onClick={() => handleButtonIncrement(2)}>&#9650;</button>
                <button className="spinner decrement dark:text-white"
                onClick={() => handleButtonDecrement(2)}>&#9660;</button>
              </div>
              <img className="w-10 h-10 sm:inline-block" alt="T2 Dilithium Stones" src={dilUrl2}/>
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

            <div className="flex flex-col">
              <div className="mb-2 dark:text-white text-opacity-80 font-semibold">
                Adj. Token Costs <span class="uppercase bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-xl ml-2">NEW</span>
              </div>
              <div className="flex space-x-2">
                <div className="flex-grow flex items-center dark:text-white text-opacity-50 w-12">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={useBetaTokens}
                      onChange={({ target: { checked } }) =>
                        setUseBetaTokens(checked)
                      }
                    />
                    <span>Use Beta Token Costs <a rel="noreferrer" href="https://twitter.com/Auxbrain/status/1707753208536576252" target="_blank">(❓)</a></span>
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
            useBetaTokens={useBetaTokens}
            artifactBoostBoostBonus={artifactBoostBoostBonus}
            dilithiumBoostBonus={dilithiumBoostBonus || 1}
            doubleBoostLength={doubleBoostLength}
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
