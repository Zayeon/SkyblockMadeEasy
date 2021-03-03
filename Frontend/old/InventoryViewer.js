import React from "react"
import McText from 'mctext-react'

// Constants
const XPTable = [[0, 0], [50, 50], [125, 175], [200, 375], [300, 675], [500, 1175], [750, 1925], [1000, 2925], [1500, 4425], [2000, 6425], [3500, 9925], [5000, 14925], [7500, 22425], [10000, 32425], [15000, 47425], [20000, 67425], [30000, 97425], [50000, 147425], [75000, 222425], [100000, 322425], [200000, 522425], [300000, 822425], [400000, 1222425], [500000, 1722425], [600000, 2322425], [700000, 3022425], [800000, 3822425], [900000, 4722425], [1000000, 5722425], [1100000, 6822425], [1200000, 8022425], [1300000, 9322425], [1400000, 10722425], [1500000, 12222425], [1600000, 13822425], [1700000, 15522425], [1800000, 17322425], [1900000, 19222425], [2000000, 21222425], [2100000, 23322425], [2200000, 25522425], [2300000, 27822425], [2400000, 30222425], [2500000, 32722425], [2600000, 35322425], [2750000, 38072425], [2900000, 40972425], [3100000, 44072425], [3400000, 47472425], [3700000, 51172425], [4000000, 55172425]]
const PetsTable = [0, 100, 210, 330, 460, 605, 765, 940, 1130, 1340, 1570, 1820, 2095, 2395, 2725, 3085, 3485, 3925, 4415, 4955, 5555, 6215, 6945, 7745, 8625, 9585, 10635, 11785, 13045, 14425, 15935, 17585, 19385, 21345, 23475, 25785, 28285, 30985, 33905, 37065, 40485, 44185, 48185, 52535, 57285, 62485, 68185, 74485, 81485, 89285, 97985, 107685, 118485, 130485, 143785, 158485, 174685, 192485, 211985, 233285, 256485, 281685, 309085, 338885, 371285, 406485, 444685, 486085, 530885, 579285, 631485, 687685, 748085, 812885, 882285, 956485, 1035685, 1120385, 1211085, 1308285, 1412485, 1524185, 1643885, 1772085, 1909285, 2055985, 2212685, 2380385, 2560085, 2752785, 2959485, 3181185, 3418885, 3673585, 3946285, 4237985, 4549685, 4883385, 5241085, 5624785, 6036485, 6478185, 6954885, 7471585, 8033285, 8644985, 9311685, 10038385, 10830085, 11691785, 12628485, 13645185, 14746885, 15938585, 17225285, 18611985, 20108685, 21725385, 23472085, 25358785]

class ItemLore extends React.Component {
  render() {
    const mclore = this.props.lore.map((row, index) => {
      return (
        <div key={index}>
          <McText>{row}</McText>
        </div>
      )
    })
    return (mclore)
  }
}

class ArmorViewer extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    var armor = []
    if (this.props.armorInventory.value){
      const armorSection = this.props.armorInventory.value.i.value
      const armorNames = ["Boots", "Leggings", "Chestplate", "Helmet"]
      armor = armorNames.map((row, i) => {
        var lore = [""] // needs to be an array for ItemLore class
        var name = ""
        var id = ""
        if (armorSection[i].tag){
          lore = armorSection[i].tag.value.display.value.Lore.value
          name = armorSection[i].tag.value.display.value.Name.value
          id = armorSection[i].tag.value.ExtraAttributes.value.id.value
        }
        return (
          <table key={i}>
            <thead>
              <tr>
                <th>{row}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Lore</th>
                <td><ItemLore lore={lore}/></td>
              </tr>
              <tr>
                <th>Name</th>
                <td><McText>{name}</McText></td>
              </tr>
              <tr>
                <th>ID</th>
                <td><McText>{id}</McText></td>
              </tr>
            </tbody>
          </table>
        )
      })
    }
    return (
      <div className="ArmorViewer">
        {armor.reverse()}
      </div>
    )
  }
}



class SkillViewer extends React.Component {

  render() {
    const experienceTable = this.props.experienceSkills.map((row, index) => {
      var level = 50 // If the xp points are not in the xp table, the level is max 50
      for (var i=0; i<XPTable.length-1; i++){
        if (!row.value){
          level = 0
        }
        else if (XPTable[i][1] <= row.value && row.value < XPTable[i+1][1]){
          level = i
          break
        }
      }

      return (
        <tr key={index}>
          <th>{row.title}</th>
          <td>{level}</td>
        </tr>
      )
    })

    return (
      <div className="SkillViewer">
        <table>
          <thead>
            <tr>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {experienceTable}
          </tbody>
        </table>
      </div>
    )
  }
}

class PetsViewer extends React.Component {
  state = {
    petList: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.petList !== this.props.petList){
      this.sortPetsList()
    }
  }

  sortPetsList() {
    const legendary = this.props.petList.filter((pet) => pet.tier === "LEGENDARY").sort((a, b) => a.exp - b.exp)
    const epic = this.props.petList.filter((pet) => pet.tier === "EPIC").sort((a, b) => a.exp - b.exp)
    const rare = this.props.petList.filter((pet) => pet.tier === "RARE").sort((a, b) => a.exp - b.exp)
    const uncommon = this.props.petList.filter((pet) => pet.tier === "UNCOMMON").sort((a, b) => a.exp - b.exp)
    const common = this.props.petList.filter((pet) => pet.tier === "COMMON").sort((a, b) => a.exp - b.exp)
    const pets = legendary.concat(epic).concat(rare).concat(uncommon).concat(common)

    this.setState({
      petList: pets
    })
  }

  render() {
    const petsTable = this.state.petList.map((row, index) => {
      var level = 1

      for (var i=0; i<PetsTable.length-1; i++){
        if (PetsTable[i] <= row.exp && row.exp < PetsTable[i+1]){
          level = i+1
        }
      }

      if (row.tier == "LEGENDARY"){
        level -= 19
      }else if (row.tier == "EPIC"){
        level -= 15
      }else if (row.tier == "RARE"){
        level -= 10
      }else if (row.tier == "UNCOMMON"){
        level -= 5
      }

      if (level > 100){
        level = 100
      }
      if (level < 1){
        level = 1
      }

      return (
        <tr key={row.uuid}>
          <th>{row.type}</th>
          <td>{row.tier}</td>
          <td>{level}</td>
          /*Pet Item*/
        </tr>
      )
    })

    return (
      <div className="PetsViewer">
        <table>
          <thead>
            <tr>
              <th>Pets</th>
            </tr>
          </thead>
          <tbody>
            {petsTable}
          </tbody>
        </table>
      </div>
    )
  }

}

class SlayerViewer extends React.Component{
  render() {
    const zombieT1 = !this.props.slayerBosses.zombie.boss_kills_tier_0  ? 0 : this.props.slayerBosses.zombie.boss_kills_tier_0
    const zombieT2 = !this.props.slayerBosses.zombie.boss_kills_tier_1  ? 0 : this.props.slayerBosses.zombie.boss_kills_tier_1
    const zombieT3 = !this.props.slayerBosses.zombie.boss_kills_tier_2  ? 0 : this.props.slayerBosses.zombie.boss_kills_tier_2
    const zombieT4 = !this.props.slayerBosses.zombie.boss_kills_tier_3  ? 0 : this.props.slayerBosses.zombie.boss_kills_tier_3

    const spiderT1 = !this.props.slayerBosses.spider.boss_kills_tier_0  ? 0 : this.props.slayerBosses.spider.boss_kills_tier_0
    const spiderT2 = !this.props.slayerBosses.spider.boss_kills_tier_1  ? 0 : this.props.slayerBosses.spider.boss_kills_tier_1
    const spiderT3 = !this.props.slayerBosses.spider.boss_kills_tier_2  ? 0 : this.props.slayerBosses.spider.boss_kills_tier_2
    const spiderT4 = !this.props.slayerBosses.spider.boss_kills_tier_3  ? 0 : this.props.slayerBosses.spider.boss_kills_tier_3

    const wolfT1 = !this.props.slayerBosses.wolf.boss_kills_tier_0  ? 0 : this.props.slayerBosses.wolf.boss_kills_tier_0
    const wolfT2 = !this.props.slayerBosses.wolf.boss_kills_tier_1  ? 0 : this.props.slayerBosses.wolf.boss_kills_tier_1
    const wolfT3 = !this.props.slayerBosses.wolf.boss_kills_tier_2  ? 0 : this.props.slayerBosses.wolf.boss_kills_tier_2
    const wolfT4 = !this.props.slayerBosses.wolf.boss_kills_tier_3  ? 0 : this.props.slayerBosses.wolf.boss_kills_tier_3

    return (
      <div className="SlayerViewer">
        <table>
          <thead>
            <tr>
              <th>Slayer</th>
              <th>T1 Kills</th>
              <th>T2 Kills</th>
              <th>T3 Kills</th>
              <th>T4 Kills</th>
              <th>Slayer XP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Zombie</th>
              <tr>{zombieT1}</tr>
              <tr>{zombieT2}</tr>
              <tr>{zombieT3}</tr>
              <tr>{zombieT4}</tr>
              <tr>{!this.props.slayerBosses.zombie.xp ? 0 : this.props.slayerBosses.zombie.xp}</tr>
            </tr>
            <tr>
              <th>Spider</th>
              <tr>{spiderT1}</tr>
              <tr>{spiderT2}</tr>
              <tr>{spiderT3}</tr>
              <tr>{spiderT4}</tr>
              <tr>{!this.props.slayerBosses.spider.xp ? 0 : this.props.slayerBosses.spider.xp}</tr>
            </tr>
            <tr>
              <th>Wolf</th>
              <tr>{wolfT1}</tr>
              <tr>{wolfT2}</tr>
              <tr>{wolfT3}</tr>
              <tr>{wolfT4}</tr>
              <tr>{!this.props.slayerBosses.wolf.xp ? 0 : this.props.slayerBosses.wolf.xp}</tr>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export {ArmorViewer, SkillViewer, PetsViewer, SlayerViewer}
