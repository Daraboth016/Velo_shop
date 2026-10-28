import shimano105Img from "../assets/Shimano_105_R7100_Groupset-removebg-preview.png";
import sramLevelTlmImg from "../assets/SRAM_Level_TLM_Brake_Set-removebg-preview.png";
import maxxisRekonRaceImg from "../assets/Maxxis_Rekon_Race_Pair-removebg-preview.png";
import rockShoxSidImg from "../assets/RockShox_SID_Select_Fork-removebg-preview.png";
import fsaEnergyStemImg from "../assets/FSA_Energy_Stem-removebg-preview.png";
import campagnoloZondaImg from "../assets/Campagnolo_Super_Record_Chainset-removebg-preview.png";

const saleProducts = [
  {
    id: 101,
    brand: "Shimano",
    category: "Drivetrain",
    name: "Shimano 105 R7100 Groupset",
    price: 599,
    originalPrice: 749,
    color: "#2a2a2a",
    icon: "105",
    image: shimano105Img,
  },
  {
    id: 102,
    brand: "SRAM",
    category: "Brakes",
    name: "SRAM Level TLM Brake Set",
    price: 199,
    originalPrice: 249,
    color: "#1a1a2e",
    icon: "DISC",
    image: sramLevelTlmImg,
  },
  {
    id: 103,
    brand: "Maxxis",
    category: "Tires",
    name: "Maxxis Rekon Race Pair",
    price: 118,
    originalPrice: 148,
    color: "#151515",
    icon: "TIRE",
    image: maxxisRekonRaceImg,
  },
  {
    id: 104,
    brand: "RockShox",
    category: "Suspension",
    name: "RockShox SID Select Fork",
    price: 549,
    originalPrice: 699,
    color: "#21140d",
    icon: "FORK",
    image: rockShoxSidImg,
  },
  {
    id: 105,
    brand: "FSA",
    category: "Cockpit",
    name: "FSA Energy Stem",
    price: 79,
    originalPrice: 99,
    color: "#102018",
    icon: "STEM",
    image: fsaEnergyStemImg,
  },
  {
    id: 106,
    brand: "Campagnolo",
    category: "Wheels",
    name: "Campagnolo Zonda Wheelset",
    price: 449,
    originalPrice: 529,
    color: "#221111",
    icon: "RIM",
    image: campagnoloZondaImg,
  },
];

export default saleProducts;
