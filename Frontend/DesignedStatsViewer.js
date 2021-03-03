import React from 'react';
import McText from 'mctext-react'

import indexedFurfSky from "./util/indexedFurfSky.json"
import indexedFaithful from "./util/indexedFaithful.json"
import {get_skill_data} from "./util/skills.js"
import {process_pet_data} from "./util/pets.js"
import {capitalise_first_letter, round, roundKMB} from "./util/misc.js"

import NavBar from './NavBar.js';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Image from 'react-bootstrap/Image'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import golden_hoe from "./images/golden_hoe.png"
import diamond_pickaxe from "./images/diamond_pickaxe.png"
import diamond_sword from "./images/diamond_sword.png"
import iron_axe from "./images/iron_axe.png"
import fishing_rod from "./images/fishing_rod.png"
import experience_bottle from "./images/experience_bottle.png"
import potion from "./images/potion.png"
import bone from "./images/bone.png"
import magma_cream from "./images/magma_cream.png"

class DesignedStatsViewer extends React.Component{
  state = {
    data: null,
    selectedProfile: "",
    chosenProfile: 0,
  }

  constructor(props) {
    super(props)
    this.setState({playerName: this.props.match.params.playerName})
  }

  getUUID(username) {
    fetch("/uuid", {
      method: 'POST',
      body: JSON.stringify({"player": username}),
      headers: {
      'Content-Type': 'application/json'
    },
    })
    .then((result) => result.json())
      .then((result) => {
        this.setState({
          uuid: result.id,
          playerName: result.name,
        }, this.getSkyblockStats)
      })

  }

  getSkyblockStats() {
    fetch("/sbs", {
      method: 'POST',
      body: JSON.stringify({"uuid": this.state.uuid}),
      headers: {
      'Content-Type': 'application/json'
      },
      })
      .then((result) => result.json())
        .then((result) => {
          this.setState({
            data: result,
          }, function() {
            this.setState({selectedProfile: this.state.data.profiles[0].cute_name})
            this.updateInventories()
          })
        })
  }

  componentDidMount () {
    this.getUUID(this.props.match.params.playerName)
  }

  changeValue(text) {
    const index = this.state.data.profiles.findIndex((e) => {
      return e.cute_name === text})
    this.setState({selectedProfile: text,
      chosenProfile: index}, this.updateInventories)
  }

  updateInventories(){
    const personalStats = this.state.data.profiles[this.state.chosenProfile].members[this.state.uuid]
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

  }

  onProfileSelect(event, id){
    this.setState({
      chosenProfile: id
    }, this.updateInventories)
    // We need to once again decode all the inventories
  }

  render () {
    const personalStats = this.state.data ? this.state.data.profiles[this.state.chosenProfile].members[this.state.uuid] : {}

    const profileButtons = this.state.data ? this.state.data.profiles.map((row, index) => {
      return (
        <Dropdown.Item as="button" onClick={(e) => this.changeValue(e.target.textContent)}>{row.cute_name}</Dropdown.Item>
      )
    }) : <div />

    return (
      <div className="DesignedStatsViewer">
        <NavBar />  
        <Container fluid>
          <Row>
            <Col/>
            <Col xs={8} className='MainCol'>
              <br/><br/>
              <h3>Showing stats for <b>{this.state.playerName}</b> on</h3>
              <DropdownButton className="d-inline-block" id="dropdown-item-button" title={this.state.selectedProfile} variant="secondary">
                {profileButtons}
              </DropdownButton>
              <br/><br/>
              <h3>Skills</h3>
              <SkillsViewer personalStats={personalStats}/>
              <br/><br/>
              <h3>Armor</h3>
              <ArmorViewer armorInventory={this.state.armorInventory}/>
              <br/><br/>
              <h3>Pets</h3>
              <PetsViewer pets={personalStats.pets}/>
              <br/><br/>
              <h3>Slayers</h3>
              <SlayerViewer slayerBosses={personalStats.slayer_bosses}/>
            </Col>
            <Col/>
          </Row>

        </Container>
      </div>
    )
  }
}

class SkillsViewer extends React.Component{

  render () {

    // Defining data for each skill
    const farmingData = get_skill_data(this.props.personalStats.experience_skill_farming, "farming")
    const farmingLevel = farmingData[0]
    const farmingPercentage = farmingData[1] * 100 / farmingData [2]

    const miningData = get_skill_data(this.props.personalStats.experience_skill_mining,  "mining")
    const miningLevel = miningData[0]
    const miningPercentage = miningData[1] * 100 / miningData [2]

    const combatData = get_skill_data(this.props.personalStats.experience_skill_combat, "combat")
    const combatLevel = combatData[0]
    const combatPercentage = combatData[1] * 100 / combatData [2]

    const foragingData = get_skill_data(this.props.personalStats.experience_skill_foraging, "foraging")
    const foragingLevel = foragingData[0]
    const foragingPercentage = foragingData[1] * 100 / foragingData [2]

    const fishingData = get_skill_data(this.props.personalStats.experience_skill_fishing, "fishing")
    const fishingLevel = fishingData[0]
    const fishingPercentage = fishingData[1] * 100 / fishingData [2]

    const enchantingData = get_skill_data(this.props.personalStats.experience_skill_enchanting, "enchanting")
    const enchantingLevel = enchantingData[0]
    const enchantingPercentage = enchantingData[1] * 100 / enchantingData [2]

    const alchemyData = get_skill_data(this.props.personalStats.experience_skill_alchemy, "alchemy")
    const alchemyLevel = alchemyData[0]
    const alchemyPercentage = alchemyData[1] * 100 / alchemyData [2]

    const tamingData = get_skill_data(this.props.personalStats.experience_skill_taming, "taming")
    const tamingLevel = tamingData[0]
    const tamingPercentage = tamingData[1] * 100 / tamingData [2]

    const runecraftingData = get_skill_data(this.props.personalStats.experience_skill_runecrafting, "runecrafting")
    const runecraftingLevel = runecraftingData[0]
    const runecraftingPercentage = runecraftingData[1] * 100 / runecraftingData [2]

    return (
      <div className="SkillsViewer">
      <Container fluid>
        <Row>
          <Col xs={1}><Image src={golden_hoe} roundedCircle /></Col>
          <Col>
            <span>Farming {farmingLevel} </span>
            <ProgressBar variant="danger" now={farmingPercentage} />
            <span >{roundKMB(farmingData[1]) + ' / ' + roundKMB(farmingData[2]) + ' XP'}</span>
          </Col>
          <Col xs={1}><Image src={diamond_pickaxe} roundedCircle /></Col>
          <Col>
            <span>Mining {miningLevel} </span>
            <ProgressBar variant="danger" now={miningPercentage} />
            <span >{roundKMB(miningData[1]) + ' / ' + roundKMB(miningData[2]) + ' XP'}</span>
          </Col>
          <Col xs={1}><Image src={diamond_sword} roundedCircle /></Col>
          <Col>
          <span>Combat {combatLevel} </span>
          <ProgressBar variant="danger" now={combatPercentage} />
          <span >{roundKMB(combatData[1]) + ' / ' + roundKMB(combatData[2]) + ' XP'}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={1}><Image src={iron_axe} roundedCircle /></Col>
          <Col>
            <span>Foraging {foragingLevel} </span>
            <ProgressBar variant="danger" now={foragingPercentage} />
            <span >{roundKMB(foragingData[1]) + ' / ' + roundKMB(foragingData[2]) + ' XP'}</span>
          </Col>
          <Col xs={1}><Image src={fishing_rod} roundedCircle /></Col>
          <Col>
            <span>Fishing {fishingLevel} </span>
            <ProgressBar variant="danger" now={fishingPercentage} />
            <span >{roundKMB(fishingData[1]) + ' / ' + roundKMB(fishingData[2]) + ' XP'}</span>
          </Col>
          <Col xs={1}><Image src={experience_bottle} roundedCircle /></Col>
          <Col>
            <span>Enchanting {enchantingLevel} </span>
            <ProgressBar variant="danger" now={enchantingPercentage} />
            <span >{roundKMB(enchantingData[1]) + ' / ' + roundKMB(enchantingData[2]) + ' XP'}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={1}><Image src={potion} roundedCircle /></Col>
          <Col>
            <span>Alchemy {alchemyLevel} </span>
            <ProgressBar variant="danger" now={alchemyPercentage} />
            <span >{roundKMB(alchemyData[1]) + ' / ' + roundKMB(alchemyData[2]) + ' XP'}</span>
          </Col>
          <Col xs={1}><Image src={bone} roundedCircle /></Col>
          <Col>
            <span>Taming {tamingLevel} </span>
            <ProgressBar variant="danger" now={tamingPercentage} />
            <span >{roundKMB(tamingData[1]) + ' / ' + roundKMB(tamingData[2]) + ' XP'}</span>
          </Col>
          <Col xs={1}><Image src={magma_cream} roundedCircle /></Col>
          <Col>
            <span>Runecrafting {runecraftingLevel} </span>
            <ProgressBar variant="danger" now={runecraftingPercentage} />
            <span >{roundKMB(runecraftingData[1]) + ' / ' + roundKMB(runecraftingData[2]) + ' XP'}</span>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
}

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
  // §aMiner's Outfit Boots Miner's Outfit
  constructor(props) {
    super(props)
  }

  getTexture(itemID, itemDamage, name) {
    if ( !(itemID in indexedFurfSky && itemDamage in indexedFurfSky[itemID]) ){
      return
    }

    for (var i=0; i < indexedFurfSky[itemID][itemDamage].length; i++) {
      const item = indexedFurfSky[itemID][itemDamage][i]
      if (name.includes(item.pattern)){
        return item.texture
      }
    }

  }

  getVanillaTexture (itemID) {
    return indexedFaithful[itemID]
  }


  getArmorComponent(piece, i) {
    const armorSection = this.props.armorInventory.value.i.value

    var lore = [] // needs to be an array for ItemLore class
    var name;
    var itemID;
    var itemDamage;
    var imagePath;
    var popover;

    if (armorSection[i].tag){
      // Extracting relevant information for each armor piece
      lore = armorSection[i].tag.value.display.value.Lore.value
      name = armorSection[i].tag.value.display.value.Name.value
      itemID = armorSection[i].id.value
      itemDamage = armorSection[i].Damage.value


      if (armorSection[i].tag.value.SkullOwner) {
        // Try and find a custom texture for it
        imagePath = this.getTexture(itemID, itemDamage, name)

        if (!imagePath) { // If one wasn't found
          const encoded = armorSection[i].tag.value.SkullOwner.value.Properties.value.textures.value[0].Value.value
          imagePath = "skullB64/" + encoded
        }
      }
      else { // Means piece is not a helmet or has no skin
        imagePath = this.getTexture(itemID, itemDamage, name)
      }

      // If we still haven't found a texture we can try dyed leather
      if (!imagePath) {
        if (armorSection[i].tag.value.ExtraAttributes.value.color){ // If leather need dye
          const color = armorSection[i].tag.value.ExtraAttributes.value.color.value
          imagePath = "leather/" + piece + "/" + color
        }
        else  { // We can try a vanilla texture
          imagePath = this.getVanillaTexture(itemID)
        }
      }

      popover = (
        <Tooltip style={{backgroundColor: '#000'}}>
          <McText>{name}</McText>
          <ItemLore lore={lore}/>
        </Tooltip>
      );

    }
    // No armor in slot
    else {
      imagePath = "Faithful/empty_armor_slot_" + piece + ".png"
      popover = (
      <Tooltip style={{backgroundColor: '#000'}}>
        No Armor!
      </Tooltip>
      )
    }


    return (
      <OverlayTrigger trigger="hover" placement="bottom" overlay={popover} key={i}>
        <Image className="ArmorPiece" src={"/" + imagePath} rounded/>
      </OverlayTrigger>
    )
  }

  render () {
    var armor = [];
    if (this.props.armorInventory){

      // Creating components for each armor piece
      armor[0] = this.getArmorComponent("helmet", 3)
      armor[1] = this.getArmorComponent("chestplate", 2)
      armor[2] = this.getArmorComponent("leggings", 1)
      armor[3] = this.getArmorComponent("boots", 0)
    }


    return (
      <div className="ArmorViewer">
      {armor}

      </div>
    )
  }
}

class PetsViewer extends React.Component {
  state = {
    pets: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pets !== this.props.pets){
      this.sort_pets_list()
    }
  }

  sort_pets_list() {
    // Ordering pets by rarity then by xp
    const legendary = this.props.pets.filter((pet) => pet.tier === "LEGENDARY").sort((a, b) => b.exp - a.exp)
    const epic = this.props.pets.filter((pet) => pet.tier === "EPIC").sort((a, b) => b.exp - a.exp)
    const rare = this.props.pets.filter((pet) => pet.tier === "RARE").sort((a, b) => b.exp - a.exp)
    const uncommon = this.props.pets.filter((pet) => pet.tier === "UNCOMMON").sort((a, b) => b.exp - a.exp)
    const common = this.props.pets.filter((pet) => pet.tier === "COMMON").sort((a, b) => b.exp - a.exp)
    const pets = legendary.concat(epic).concat(rare).concat(uncommon).concat(common)

    this.setState({
      pets: pets
    })
  }

  render() {

    var pets;
    if (this.state.pets.length === 0) {
      pets = <p>It seems this person has no pets</p>
    }
    else {
      pets = this.state.pets.map((pet, index) => {
        const pet_data = process_pet_data(pet)



        const tooltip = (
        <Tooltip style={{backgroundColor: '#000'}}>
          <h6 style={{color: pet_data.color}}><b>[LVL {pet_data.level}] {pet_data.name}</b></h6>
          <p style={{color: "#BBB"}}>{capitalise_first_letter(pet_data.type)} Pet</p>
          <p>
            Progress to level {pet_data.level+1}: <span style={{color:"#0F0"}}>{round(pet_data.progress, 1)}%</span>
            <br/>
            {roundKMB(pet_data.current_xp)} / {roundKMB(pet_data.xp_for_next) }
            <br/>
            <McText>{pet_data.item_desc}</McText>
          </p>
        </Tooltip>
        )

        return (
          <OverlayTrigger trigger="hover" placement="left" overlay={tooltip} key={index}>
            <Image className="PetImg" src={pet_data.texture} rounded/>
          </OverlayTrigger>
        )

      })

  }


    return (
      <div className="PetsViewer">
        {pets}
      </div>
    )
  }
}

class SlayerViewer extends React.Component {
  render () {
    var zombieT1;
    var zombieT2;
    var zombieT3;
    var zombieT4;

    var spiderT1;
    var spiderT2;
    var spiderT3;
    var spiderT4;

    var wolfT1;
    var wolfT2;
    var wolfT3;
    var wolfT4;

    if (this.props.slayerBosses){
      zombieT1 = !this.props.slayerBosses.zombie.boss_kills_tier_0  ? 0 : this.props.slayerBosses.zombie.boss_kills_tier_0
      zombieT2 = !this.props.slayerBosses.zombie.boss_kills_tier_1  ? 0 : this.props.slayerBosses.zombie.boss_kills_tier_1
      zombieT3 = !this.props.slayerBosses.zombie.boss_kills_tier_2  ? 0 : this.props.slayerBosses.zombie.boss_kills_tier_2
      zombieT4 = !this.props.slayerBosses.zombie.boss_kills_tier_3  ? 0 : this.props.slayerBosses.zombie.boss_kills_tier_3

      spiderT1 = !this.props.slayerBosses.spider.boss_kills_tier_0  ? 0 : this.props.slayerBosses.spider.boss_kills_tier_0
      spiderT2 = !this.props.slayerBosses.spider.boss_kills_tier_1  ? 0 : this.props.slayerBosses.spider.boss_kills_tier_1
      spiderT3 = !this.props.slayerBosses.spider.boss_kills_tier_2  ? 0 : this.props.slayerBosses.spider.boss_kills_tier_2
      spiderT4 = !this.props.slayerBosses.spider.boss_kills_tier_3  ? 0 : this.props.slayerBosses.spider.boss_kills_tier_3

      wolfT1 = !this.props.slayerBosses.wolf.boss_kills_tier_0  ? 0 : this.props.slayerBosses.wolf.boss_kills_tier_0
      wolfT2 = !this.props.slayerBosses.wolf.boss_kills_tier_1  ? 0 : this.props.slayerBosses.wolf.boss_kills_tier_1
      wolfT3 = !this.props.slayerBosses.wolf.boss_kills_tier_2  ? 0 : this.props.slayerBosses.wolf.boss_kills_tier_2
      wolfT4 = !this.props.slayerBosses.wolf.boss_kills_tier_3  ? 0 : this.props.slayerBosses.wolf.boss_kills_tier_3
    }

    return (
      <div className="SlayerViewer">
        <div className="SlayerTab">
          <h6>Revenant Horror</h6>
          <span>Tier I: {zombieT1} </span>
          <span>Tier II: {zombieT2} </span>
          <span>Tier III: {zombieT3} </span>
          <span>Tier IV: {zombieT4} </span>

          <p>Slain {zombieT1 + zombieT2 + zombieT3 + zombieT4} in total</p>
        </div>
        <div className="SlayerTab">
          <h6>Tarantula Broodfather</h6>
          <span>Tier I: {spiderT1} </span>
          <span>Tier II: {spiderT2} </span>
          <span>Tier III: {spiderT3} </span>
          <span>Tier IV: {spiderT4} </span>

          <p>Slain {spiderT1 + spiderT2 + spiderT3 + spiderT4} in total</p>
        </div>
        <div className="SlayerTab">
          <h6>Sven Packmaster</h6>
          <span>Tier I: {wolfT1} </span>
          <span>Tier II: {wolfT2} </span>
          <span>Tier III: {wolfT3} </span>
          <span>Tier IV: {wolfT4} </span>

          <p>Slain {wolfT1 + wolfT2 + wolfT3 + wolfT4} in total</p>
        </div>
      </div>
    )
  }
}

export default DesignedStatsViewer
