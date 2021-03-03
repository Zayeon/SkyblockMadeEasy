var capitalise_first_letter = function(name) {
  const lower = name.toLowerCase()
  return (lower.charAt(0).toUpperCase() + lower.slice(1))
}

var roundKMB = function(num) {
  const str = Math.round(num).toString()
  if (0 <= str.length && str.length <= 3){
    return str
  }
  else if (3 < str.length && str.length <= 6) {
    return (num/1000).toPrecision(3).toString() + "K"
  }
  else if (6 < str.length && str.length <= 9) {
    return (num/1000000).toPrecision(3).toString() + "M"
  }
  else {
    return (num/1000000000).toPrecision(3).toString() + "B"
  }
}

var round = function(num, dp) {
  const mul = Math.pow(10, dp)
  return Math.round((num + Number.EPSILON) * mul  ) / mul
}

export {capitalise_first_letter, roundKMB, round}
