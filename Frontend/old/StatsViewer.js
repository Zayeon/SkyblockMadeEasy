import React from "react"
import {ArmorViewer, SkillViewer, PetsViewer, SlayerViewer} from "./InventoryViewer.js"

class StatsViewer extends React.Component {
  state = {
      chosenProfile: 0,
      armorInventory: [],
      accessoryBag: [],
    }

  constructor(props) {
    super(props);

    this.updateInventories()
  }

  updateInventories(){
    const personalStats = this.props.statsData.profiles[this.state.chosenProfile].members[this.props.uuid]
    // Decoding armor
    fetch("/decodeData", {
      method: 'POST',
      body: JSON.stringify({"data": personalStats.inv_armor.data}),
      headers: {
      'Content-Type': 'application/json'
    },
    }).then((result) => result.json())
      .then((result) => {
        this.setState({
          armorInventory: result,
        })
      })

    // Decoding accessories
    // fetch("/decodeData", {
    //   method: 'POST',
    //   body: JSON.stringify({"data": personalStats.talisman_bag.data}),
    //   headers: {
    //   'Content-Type': 'application/json'
    // },
    // }).then((result) => result.json())
    //   .then((result) => {
    //     this.setState({
    //       accessoryBag: result,
    //     })
    //   })

  }

  onProfileSelect(event, id){
    this.setState({
      chosenProfile: id
    }, this.updateInventories)
    // We need to once again decode all the inventories
  }


  render () {
    const personalStats = this.props.statsData.profiles[this.state.chosenProfile].members[this.props.uuid]
    const fairySouls = personalStats.fairy_souls
    const fairySoulsCollected = personalStats.fairy_souls_collected
    const fairyExchanges = personalStats.fairy_exchanges
    const generalStats = personalStats.stats
    const accessoryBag = personalStats.talisman_bag

    const profiles = this.props.statsData.profiles.map(p => p.cute_name)

    const buttons = profiles.map((row, index) => {
      return (
        <button onClick={(e) => this.onProfileSelect(e, index)} key={index}>{row}</button>
      )
    })

    const experienceTable = [
      {
        "title": "Farming",
        "value": personalStats.experience_skill_farming
      },
      {
        "title": "Mining",
        "value": personalStats.experience_skill_mining
      },
      {
        "title": "Combat",
        "value": personalStats.experience_skill_combat
      },
      {
        "title": "Foraging",
        "value": personalStats.experience_skill_foraging
      },
      {
        "title": "Fishing",
        "value": personalStats.experience_skill_fishing
      },
      {
        "title": "Enchanting",
        "value": personalStats.experience_skill_enchanting
      },
      {
        "title": "Alchemy",
        "value": personalStats.experience_skill_alchemy
      },
      {
        "title": "Taming",
        "value": personalStats.experience_skill_taming
      },
      {
        "title": "Runecrafting",
        "value": personalStats.experience_skill_runecrafting
      },
      {
        "title": "Carpentry",
        "value": personalStats.experience_skill_carpentry
      },
    ]


    return (
      <div className="StatsViewer">

        <div>{buttons}</div>

        <br/>
        <SlayerViewer slayerBosses={personalStats.slayer_bosses}/>
        <br/>
        <PetsViewer petList={personalStats.pets}/>
        <br/>
        <SkillViewer experienceSkills={experienceTable} />
        <br/>
        <ArmorViewer armorInventory={this.state.armorInventory}/>

      </div>
    )
  }
}


export default StatsViewer
