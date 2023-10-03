import React, { useMemo, useState } from 'react'

import { boostCombinations } from 'app/utils/boosts'
import goldenEggUrl from 'app/images/Golden_Egg.png'
import tokenUrl from 'app/images/Token.png'
import { displayValueShort } from './utils/suffixes'
import { orderBy } from 'lodash'

const BoostTable = ({
  hatchRate,
  hasProPermit,
  showOldBoosts,
  useBetaTokens,
  target,
  artifactBoostBoostBonus,
  dilithiumBoostBonus,
  doubleBoostLength,
  maxTokens,
  maxHours,
}) => {
  const [limit] = useState(50)
  const [sortBy, setSortBy] = useState('cost')

  const boostsToShow = useMemo(() => {
    let combos = boostCombinations

    combos.forEach((c) => c.time = +(c.getComboTime() * dilithiumBoostBonus).toFixed(2));

    if (!hasProPermit) {
      combos = combos.filter((c) => c.prisms.length + c.beacons.length <= 2)
    }
    if (!showOldBoosts) {
      combos = combos.filter(c => !c.prisms.some(p => p.old) && !c.beacons.some(b => b.old))
    }
    combos = combos.filter(
      (c) =>
        c.chickensForHatchRate(hatchRate, { dilithiumBoostBonus }, { artifactBoostBoostBonus }, {doubleBoostLength}) >=
        target * 0.98
    )

    combos = combos.filter(
      (c) => (useBetaTokens ? c.newTokens : c.tokens) <= maxTokens
    )

    combos = combos.filter(
      (c) => c.time / 60 <= maxHours
    )

    combos = orderBy(
      combos,
      [sortBy, 'cost', (useBetaTokens ? 'newTokens' : 'tokens'), 'time'],
      ['asc', 'asc', 'asc', 'asc']
    )

    combos = combos.slice(0, limit)
    return combos
  }, [limit, hasProPermit, showOldBoosts, useBetaTokens, hatchRate, target, sortBy, dilithiumBoostBonus, artifactBoostBoostBonus, doubleBoostLength, maxTokens, maxHours])

  return (
    <table className="w-full mx-auto border border-blue-600">
      <thead className="text-xs text-opacity-80 text-center bg-blue-600 text-white">
        <tr key="BoostTableHeader">
          <th className="hidden sm:table-cell"></th>
          <th className="px-2 py-1 text-left">Boost Combo</th>
          <th className="px-2 py-1 text-right">Chickens Hatched</th>
          <th className="px-2 py-1 text-right">
            <button className="font-bold" onClick={() => setSortBy('cost')}>
              GE Cost{sortBy === 'cost' && ' ▲'}
            </button>
          </th>
          <th className="px-2 py-1 text-right">
            <button className="font-bold" onClick={() => setSortBy((useBetaTokens ? 'newTokens' : 'tokens'))}>
              Token Cost{sortBy === (useBetaTokens ? 'newTokens' : 'tokens') && ' ▲'}
            </button>
          </th>
          <th className="hidden sm:table-cell px-2 py-1 text-right">
            <button className="font-bold" onClick={() => setSortBy('time')}>
              Time{sortBy === 'time' && ' ▲'}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {boostsToShow.map(
          ({
            prisms,
            beacons,
            name,
            cost,
            tokens,
            newTokens,
            time,
            key,
            chickensForHatchRate,
          }) => (
            <tr
              key={key}
              className="text-sm even:bg-gray-100 dark:even:bg-gray-700 dark:text-white text-opacity-80"
            >
              <td className="hidden sm:table-cell px-2 py-1 text-center">
                <span className="text-black dark:text-white text-opacity-50">
                  {name}
                </span>
              </td>
              <td>
                <div className="flex flex-col">
                  <div className="flex">
                    {prisms.map((p, i) => (
                      <div className="has-tooltip">
                        <img
                          key={`${p.name}-${i}`}
                          alt={p.name}
                          title={p.name}
                          src={p.imageUrl}
                          className="w-6 h-6 md:w-10 md:h-10"
                        />
                        <div className="tooltip pointer-events-none bg-gray-900 text-white font-medium opacity-95 p-2 rounded-xl -mt-10 ml-1 sm:-mt-12 sm:ml-2 md:-mt-16 md:ml-4">
                          {p.name}{p.old && ' (old)'}
                        </div>
                        {p.old && <div className="absolute -mt-10 ">Old</div>}
                      </div>
                    ))}
                    {beacons.map((b, i) => (
                      <div className="has-tooltip">
                        <img
                          key={`${b.name}-${i}`}
                          alt={b.name}
                          title={b.name}
                          src={b.imageUrl}
                          className="w-6 h-6 md:w-10 md:h-10"
                        />
                        <div className="tooltip pointer-events-none bg-gray-900 text-white font-medium opacity-95 p-2 rounded-xl -mt-10 ml-1 sm:-mt-12 sm:ml-2 md:-mt-16 md:ml-4">
                          {b.name}{b.old && ' (old)'}
                        </div>
                        {b.old && <div className="absolute -mt-10">Old</div>}
                      </div>
                    ))}
                  </div>
                  <div className="sm:hidden text-center text-black dark:text-white text-opacity-50">
                    {name}
                  </div>
                </div>
              </td>
              <td className="px-2 py-1 text-right text-black dark:text-white font-semibold">
                {displayValueShort(
                  chickensForHatchRate(hatchRate, { dilithiumBoostBonus }, { artifactBoostBoostBonus }, {doubleBoostLength})
                )}{' '}
                🐔
              </td>
              <td className="text-right px-2 py-1">
                {cost.toLocaleString()}{' '}
                <img
                  className="hidden sm:inline-block"
                  alt="Golden Eggs"
                  src={goldenEggUrl}
                />
              </td>
              <td className="text-right px-2 py-1">
                {(useBetaTokens ? newTokens : tokens).toLocaleString()}{' '}
                <img
                  className="hidden sm:inline-block"
                  alt="Tokens"
                  src={tokenUrl}
                />
              </td>
              <td className="text-right px-2 py-1 hidden sm:table-cell">
                {time} min
              </td>
            </tr>
          )
        )}
        {boostCombinations.length > boostsToShow.length && (
          <tr key="BoostTableFooter">
            <td
              colSpan="6"
              className="text-center dark:text-white text-opacity-70 text-sm"
            >
              {boostCombinations.length - boostsToShow.length} boost
              combinations not shown
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

BoostTable.propTypes = {}

export default React.memo(BoostTable)
