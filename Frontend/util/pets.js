import {capitalise_first_letter} from "./misc.js"

const rarity_offset = {
  COMMON: 0,
  UNCOMMON: 6,
  RARE: 11,
  EPIC: 16,
  LEGENDARY: 20
}
const pet_xp = [0, 100, 210, 330, 460, 605, 765, 940, 1130, 1340, 1570, 1820, 2095, 2395, 2725, 3085, 3485, 3925, 4415, 4955, 5555, 6215, 6945, 7745, 8625, 9585, 10635, 11785, 13045, 14425, 15935, 17585, 19385, 21345, 23475, 25785, 28285, 30985, 33905, 37065, 40485, 44185, 48185, 52535, 57285, 62485, 68185, 74485, 81485, 89285, 97985, 107685, 118485, 130485, 143785, 158485, 174685, 192485, 211985, 233285, 256485, 281685, 309085, 338885, 371285, 406485, 444685, 486085, 530885, 579285, 631485, 687685, 748085, 812885, 882285, 956485, 1035685, 1120385, 1211085, 1308285, 1412485, 1524185, 1643885, 1772085, 1909285, 2055985, 2212685, 2380385, 2560085, 2752785, 2959485, 3181185, 3418885, 3673585, 3946285, 4237985, 4549685, 4883385, 5241085, 5624785, 6036485, 6478185, 6954885, 7471585, 8033285, 8644985, 9311685, 10038385, 10830085, 11691785, 12628485, 13645185, 14746885, 15938585, 17225285, 18611985, 20108685, 21725385, 23472085, 25358785]

// Taken from https://github.com/LeaPhant/skyblock-stats/blob/master/src/constants/pets.js
const pet_items = {
        PET_ITEM_ALL_SKILLS_BOOST_COMMON: {
            description: "§7Gives +§a10% §7pet exp for all skills"
        },
        PET_ITEM_BIG_TEETH_COMMON: {
            description: "§7Increases §9Crit Chance §7by §a5%"
        },
        PET_ITEM_IRON_CLAWS_COMMON: {
            description: "§7Increases the pet's §9Crit Damage §7by §a40% §7and §9Crit Chance §7by §a40%"
        },
        PET_ITEM_SHARPENED_CLAWS_UNCOMMON: {
            description: "§7Increases §9Crit Damage §7by §a15%"
        },
        PET_ITEM_HARDENED_SCALES_UNCOMMON: {
            description: "§7Increases §aDefense §7by §a25"
        },
        PET_ITEM_BUBBLEGUM: {
            description: "§7Your pet fuses its power with placed §aOrbs §7to give them §a2x §7duration"
        },
        PET_ITEM_LUCKY_CLOVER: {
            description: "§7Increases §bMagic Find §7by §a7"
        },
        PET_ITEM_TEXTBOOK: {
            description: "§7Increases the pet's §bIntelligence §7by §a100%"
        },
        PET_ITEM_SADDLE: {
            description: "§7Increase horse speed by §a50% §7 and jump boost by §a100%"
        },
        PET_ITEM_EXP_SHARE: {
            description: "§7While unequipped this pet gains §a25% §7of the equipped pet's xp, this is §7split between all pets holding the item."
        },
        PET_ITEM_TIER_BOOST: {
            description: "§7Boosts the §ararity §7of your pet by 1 tier!"
        },
        PET_ITEM_COMBAT_SKILL_BOOST_COMMON: {
            description: "§7Gives +§a20% §7pet exp for Combat"
        },
        PET_ITEM_COMBAT_SKILL_BOOST_UNCOMMON: {
            description: "§7Gives +§a30% §7pet exp for Combat"
        },
        PET_ITEM_COMBAT_SKILL_BOOST_RARE: {
            description: "§7Gives +§a40% §7pet exp for Combat"
        },
        PET_ITEM_COMBAT_SKILL_BOOST_EPIC: {
            description: "§7Gives +§a50% §7pet exp for Combat"
        },
        PET_ITEM_FISHING_SKILL_BOOST_COMMON: {
            description: "§7Gives +§a20% §7pet exp for Fishing"
        },
        PET_ITEM_FISHING_SKILL_BOOST_UNCOMMON: {
            description: "§7Gives +§a30% §7pet exp for Fishing"
        },
        PET_ITEM_FISHING_SKILL_BOOST_RARE: {
            description: "§7Gives +§a40% §7pet exp for Fishing"
        },
        PET_ITEM_FISHING_SKILL_BOOST_EPIC: {
            description: "§7Gives +§a50% §7pet exp for Fishing"
        },
        PET_ITEM_FORAGING_SKILL_BOOST_COMMON: {
            description: "§7Gives +§a20% §7pet exp for Foraging"
        },
        PET_ITEM_FORAGING_SKILL_BOOST_UNCOMMON: {
            description: "§7Gives +§a30% §7pet exp for Foraging"
        },
        PET_ITEM_FORAGING_SKILL_BOOST_RARE: {
            description: "§7Gives +§a40% §7pet exp for Foraging"
        },
        PET_ITEM_FORAGING_SKILL_BOOST_EPIC: {
            description: "§7Gives +§a50% §7pet exp for Foraging"
        },
        PET_ITEM_MINING_SKILL_BOOST_COMMON: {
            description: "§7Gives +§a20% §7pet exp for Mining"
        },
        PET_ITEM_MINING_SKILL_BOOST_UNCOMMON: {
            description: "§7Gives +§a30% §7pet exp for Mining"
        },
        PET_ITEM_MINING_SKILL_BOOST_RARE: {
            description: "§7Gives +§a40% §7pet exp for Mining"
        },
        PET_ITEM_MINING_SKILL_BOOST_EPIC: {
            description: "§7Gives +§a50% §7pet exp for Mining"
        },
        PET_ITEM_FARMING_SKILL_BOOST_COMMON: {
            description: "§7Gives +§a20% §7pet exp for Farming"
        },
        PET_ITEM_FARMING_SKILL_BOOST_UNCOMMON: {
            description: "§7Gives +§a30% §7pet exp for Farming"
        },
        PET_ITEM_FARMING_SKILL_BOOST_RARE: {
            description: "§7Gives +§a40% §7pet exp for Farming"
        },
        PET_ITEM_FARMING_SKILL_BOOST_EPIC: {
            description: "§7Gives +§a50% §7pet exp for Farming"
        }
    }

const pets_data = {
            "BAT": {
                head: "/skull/382fc3f71b41769376a9e92fe3adbaac3772b999b219c9d6b4680ba9983e527",
                type: "mining"
            },
            "BLAZE": {
                head: "/skull/b78ef2e4cf2c41a2d14bfde9caff10219f5b1bf5b35a49eb51c6467882cb5f0",
                type: "combat"
            },
            "CHICKEN": {
                head: "/skull/7f37d524c3eed171ce149887ea1dee4ed399904727d521865688ece3bac75e",
                type: "farming"
            },
            "HORSE": {
                head: "/skull/36fcd3ec3bc84bafb4123ea479471f9d2f42d8fb9c5f11cf5f4e0d93226",
                type: "combat"
            },
            "JERRY": {
                head: "/skull/822d8e751c8f2fd4c8942c44bdb2f5ca4d8ae8e575ed3eb34c18a86e93b",
                type: "combat"
            },
            "OCELOT": {
                head: "/skull/5657cd5c2989ff97570fec4ddcdc6926a68a3393250c1be1f0b114a1db1",
                type: "foraging"
            },
            "PIGMAN": {
                head: "/skull/63d9cb6513f2072e5d4e426d70a5557bc398554c880d4e7b7ec8ef4945eb02f2",
                type: "combat"
            },
            "RABBIT": {
                head: "/skull/117bffc1972acd7f3b4a8f43b5b6c7534695b8fd62677e0306b2831574b",
                type: "farming"
            },
            "SHEEP": {
                head: "/skull/64e22a46047d272e89a1cfa13e9734b7e12827e235c2012c1a95962874da0",
                type: "alchemy"
            },
            "SILVERFISH": {
                head: "/skull/da91dab8391af5fda54acd2c0b18fbd819b865e1a8f1d623813fa761e924540",
                type: "mining"
            },
            "WITHER_SKELETON": {
                head: "/skull/f5ec964645a8efac76be2f160d7c9956362f32b6517390c59c3085034f050cff",
                type: "mining"
            },
            "SKELETON_HORSE": {
                head: "/skull/47effce35132c86ff72bcae77dfbb1d22587e94df3cbc2570ed17cf8973a",
                type: "combat"
            },
            "WOLF": {
                head: "/skull/dc3dd984bb659849bd52994046964c22725f717e986b12d548fd169367d494",
                type: "combat"
            },
            "ENDERMAN": {
                head: "/skull/6eab75eaa5c9f2c43a0d23cfdce35f4df632e9815001850377385f7b2f039ce1",
                type: "combat"
            },
            "PHOENIX": {
                head: "/skull/23aaf7b1a778949696cb99d4f04ad1aa518ceee256c72e5ed65bfa5c2d88d9e",
                type: "combat"
            },
            "MAGMA_CUBE": {
                head: "/skull/38957d5023c937c4c41aa2412d43410bda23cf79a9f6ab36b76fef2d7c429",
                type: "combat"
            },
            "FLYING_FISH": {
                head: "/skull/40cd71fbbbbb66c7baf7881f415c64fa84f6504958a57ccdb8589252647ea",
                type: "fishing"
            },
            "BLUE_WHALE": {
                head: "/skull/dab779bbccc849f88273d844e8ca2f3a67a1699cb216c0a11b44326ce2cc20",
                type: "fishing"
            },
            "TIGER": {
                head: "/skull/fc42638744922b5fcf62cd9bf27eeab91b2e72d6c70e86cc5aa3883993e9d84",
                type: "combat"
            },
            "LION": {
                head: "/skull/38ff473bd52b4db2c06f1ac87fe1367bce7574fac330ffac7956229f82efba1",
                type: "foraging"
            },
            "PARROT": {
                head: "/skull/5df4b3401a4d06ad66ac8b5c4d189618ae617f9c143071c8ac39a563cf4e4208",
                type: "alchemy"
            },
            "SNOWMAN": {
                head: "/skull/11136616d8c4a87a54ce78a97b551610c2b2c8f6d410bc38b858f974b113b208",
                type: "combat"
            },
            "TURTLE": {
                head: "/skull/212b58c841b394863dbcc54de1c2ad2648af8f03e648988c1f9cef0bc20ee23c",
                type: "combat"
            },
            "BEE": {
                head: "/skull/7e941987e825a24ea7baafab9819344b6c247c75c54a691987cd296bc163c263",
                type: "farming"
            },
            "ENDER_DRAGON": {
                head: "/skull/aec3ff563290b13ff3bcc36898af7eaa988b6cc18dc254147f58374afe9b21b9",
                type: "combat"
            },
            "GUARDIAN": {
                head: "/skull/221025434045bda7025b3e514b316a4b770c6faa4ba9adb4be3809526db77f9d",
                type: "combat"
            },
            "SQUID": {
                head: "/skull/01433be242366af126da434b8735df1eb5b3cb2cede39145974e9c483607bac",
                type: "fishing"
            },
            "GIRAFFE": {
                head: "/skull/176b4e390f2ecdb8a78dc611789ca0af1e7e09229319c3a7aa8209b63b9",
                type: "foraging"
            },
            "ELEPHANT": {
                head: "/skull/7071a76f669db5ed6d32b48bb2dba55d5317d7f45225cb3267ec435cfa514",
                type: "farming"
            },
            "MONKEY": {
                head: "/skull/13cf8db84807c471d7c6922302261ac1b5a179f96d1191156ecf3e1b1d3ca",
                type: "foraging"
            },
            "SPIDER": {
                head: "/skull/cd541541daaff50896cd258bdbdd4cf80c3ba816735726078bfe393927e57f1",
                type: "combat"
            },
            "ENDERMITE": {
                head: "/skull/5a1a0831aa03afb4212adcbb24e5dfaa7f476a1173fce259ef75a85855",
                type: "mining"
            },
            "GHOUL": {
                head: "/skull/87934565bf522f6f4726cdfe127137be11d37c310db34d8c70253392b5ff5b",
                type: "combat"
            },
            "JELLYFISH": {
                head: "/skull/913f086ccb56323f238ba3489ff2a1a34c0fdceeafc483acff0e5488cfd6c2f1",
                type: "alchemy"
            },
            "PIG": {
                head: "/skull/621668ef7cb79dd9c22ce3d1f3f4cb6e2559893b6df4a469514e667c16aa4",
                type: "farming"
            },
            "ROCK": {
                head: "/skull/cb2b5d48e57577563aca31735519cb622219bc058b1f34648b67b8e71bc0fa",
                type: "mining"
            },
            "SKELETON": {
                head: "/skull/fca445749251bdd898fb83f667844e38a1dff79a1529f79a42447a0599310ea4",
                type: "combat"
            },
            "ZOMBIE": {
                head: "/skull/56fc854bb84cf4b7697297973e02b79bc10698460b51a639c60e5e417734e11",
                type: "combat"
            },
            "DOLPHIN": {
                head: "/skull/cefe7d803a45aa2af1993df2544a28df849a762663719bfefc58bf389ab7f5",
                type: "fishing"
            },
            "BABY_YETI": {
                head: "/skull/ab126814fc3fa846dad934c349628a7a1de5b415021a03ef4211d62514d5",
                type: "fishing"
            },
            "GOLEM": {
                head: "/skull/89091d79ea0f59ef7ef94d7bba6e5f17f2f7d4572c44f90f76c4819a714",
                type: "combat"
            },
            "HOUND": {
                head: "/skull/b7c8bef6beb77e29af8627ecdc38d86aa2fea7ccd163dc73c00f9f258f9a1457",
                type: "combat"
            },
            "TARANTULA": {
                head: "/skull/8300986ed0a04ea79904f6ae53f49ed3a0ff5b1df62bba622ecbd3777f156df8",
                type: "combat"
            },
            "BLACK_CAT": {
                head: "/skull/e4b45cbaa19fe3d68c856cd3846c03b5f59de81a480eec921ab4fa3cd81317",
                type: "combat"
            },
            "SPIRIT": {
                head: "/skull/8d9ccc670677d0cebaad4058d6aaf9acfab09abea5d86379a059902f2fe22655",
                type: "combat"
            },
            "GRIFFIN": {
                head: "/skull/4c27e3cb52a64968e60c861ef1ab84e0a0cb5f07be103ac78da67761731f00c8",
                type: "combat"
            },
            "MEGALODON": {
                head: "/skull/a94ae433b301c7fb7c68cba625b0bd36b0b14190f20e34a7c8ee0d9de06d53b9",
                type: "fishing"
            }
        }

const pet_colors = {
  LEGENDARY: "#FFAA00",
  EPIC: "#AA00AA",
  RARE: "#5555FF",
  UNCOMMON: "#55FF55",
  COMMON: "#AAAAAA"
}

var process_pet_data = function(pet) {

  var pet_data = {max_level: pet_xp.length-1}
  var pet_level;

  // Keep adding 1 to the pet level and see if it fits
  for(pet_level=1; pet_level < pet_xp.length; pet_level++) {
    if (pet_xp[pet_level-1] <= pet.exp && pet.exp < pet_xp[pet_level]) {
      break
    }
  }

  // Calculate data for pet
  pet_data.level = Math.max(pet_level - rarity_offset[pet.tier], 1)
  pet_data.current_xp = pet.exp - pet_xp[pet_level-1]
  pet_data.xp_for_next = pet_xp[pet_level] - pet_xp[pet_level-1]
  pet_data.progress = pet_data.current_xp * 100 / pet_data.xp_for_next

  pet_data.texture = pets_data[pet.type].head
  if (pet.heldItem && pet_items[pet.heldItem]) {
    pet_data.item_desc = pet_items[pet.heldItem].description
  }
  else {
    pet_data.item_desc = "§8This pet does not have an item"
  }
  pet_data.type = pets_data[pet.type].type

  pet_data.color = pet_colors[pet.tier]

  if (pet.type.includes("_")) {
    const pet_words = pet.type.split("_").map((name, i) => {
      return capitalise_first_letter(name)
    })
    pet_data.name = pet_words.join(" ")
  }

  else {
    pet_data.name = capitalise_first_letter(pet.type)
  }

  return pet_data

}



export {process_pet_data}
