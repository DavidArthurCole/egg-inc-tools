import NumAbbr from 'number-abbreviate'

export const suffixes = {
  K: 1e3,
  M: 1e6,
  B: 1e9,
  T: 1e12,
  q: 1e15,
  Q: 1e18,
  s: 1e21,
  S: 1e24,
  o: 1e27,
  N: 1e30,
  d: 1e33,
  U: 1e36,
  D: 1e39,
  Td: 1e42,
  qd: 1e45,
  Qd: 1e48,
}

export const suffixDisplay = {
  1e3: 'Thousand',
  1e6: 'Million',
  1e9: 'Billion',
  1e12: 'Trillion',
  1e15: 'Quadrillion',
  1e18: 'Quintillion',
  1e21: 'Sextillion',
  1e24: 'Septillion',
  1e27: 'Octillion',
  1e30: 'Nonillion',
  1e33: 'Decillion',
  1e36: 'Undecillion',
  1e39: 'Duodecillion',
  1e42: 'Tredecillion',
  1e45: 'Quattuordecillion',
  1e48: 'Quindecillion',
}

const valueParseRegex = new RegExp(/^((?:\d|\.)+)(?:e(\d+))?(\w)?$/)
export const parseValueString = (valueString) => {
  const result = valueParseRegex.exec(valueString)
  if (!result) return null

  const [, value, exponent, suffix] = result

  let calculated = parseFloat(value)

  if (exponent) {
    calculated *= Math.pow(10, parseFloat(exponent))
  }

  if (suffix) {
    const suffixMultiplier = suffixes[suffix]
    if (!suffixMultiplier) return null
    calculated *= suffixMultiplier
  }

  return calculated
}

const numAbbrShort = new NumAbbr(Object.keys(suffixes))
const numAbbr = new NumAbbr(Object.values(suffixDisplay).map((s) => ` ${s}`))
export const displayValue = (value, precision = 2) =>
  numAbbr.abbreviate(value, precision)
export const displayValueShort = (value, precision = 2) =>
  numAbbrShort.abbreviate(value, precision)
