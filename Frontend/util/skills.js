// Levels up to 60
const skill_xp = [
  50,
  125,
  200,
  300,
  500,
  750,
  1000,
  1500,
  2000,
  3500,
  5000,
  7500,
  10000,
  15000,
  20000,
  30000,
  50000,
  75000,
  100000,
  200000,
  300000,
  400000,
  500000,
  600000,
  700000,
  800000,
  900000,
  1000000,
  1100000,
  1200000,
  1300000,
  1400000,
  1500000,
  1600000,
  1700000,
  1800000,
  1900000,
  2000000,
  2100000,
  2200000,
  2300000,
  2400000,
  2500000,
  2600000,
  2750000,
  2900000,
  3100000,
  3400000,
  3700000,
  4000000,
  4300000,
  4600000,
  4900000,
  5200000,
  5500000,
  5800000,
  6100000,
  6400000,
  6700000,
  7000000
]

const skill_caps = {
        taming: 50,
        farming: 60,
        mining: 50,
        combat: 50,
        foraging: 50,
        fishing: 50,
        enchanting: 60,
        alchemy: 50,
        carpentry: 50,
        runecrafting: 25
    }

const runecrafting_xp = [
  0,
  50,
  100,
  125,
  160,
  200,
  250,
  315,
  400,
  500,
  625,
  785,
  1000,
  1250,
  1600,
  2000,
  2465,
  3125,
  4000,
  5000,
  6200,
  7800,
  9800,
  12200,
  15300,
  19050
]

var get_skill_data = function(xp, skill) {
  if (!xp){
    return [0, 0, 0]
  }
  console.log(skill + xp.toString())

  if (skill === "runecrafting"){
    for (var i=0; i<runecrafting_xp.length-1; i++) {
      if (runecrafting_xp[i] <= xp && xp < runecrafting_xp[i+1]) {
        const level = Math.max(i + 1, 1)
        const residualXP = runecrafting_xp[i+1] - xp
        const maxXP = runecrafting_xp[i+1] - runecrafting_xp[i]
        return [level, residualXP, maxXP]
      }
    }
    const residualXP = runecrafting_xp[-1] - xp
    return [skill_caps["runecrafting"], residualXP, 0]
  }

  else {

    const skill_cap = skill_caps[skill]
    var running_total = 0

    for (var i=0; i<skill_cap-1; i++) {
      if (running_total <= xp && xp < running_total + skill_xp[i+1]) {
        const level = Math.max(i + 1, 1)
        const residualXP = xp - running_total
        const maxXP = skill_xp[i+1]
        return [level, residualXP, maxXP]
      }
      running_total += skill_xp[i+1]
    }


    const residualXP = skill_xp[skill_cap-1] - xp
    return [skill_caps[skill], residualXP, 0]

  }
}

export {get_skill_data}
