import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Animated } from "react-native";
import { faX, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RunningShoeIcon from "../../assets/icons/running-shoe.svg";
import DressIcon from "../../assets/icons/dress.svg";
import AccessoriesIcon from "../../assets/icons/sunglasses.svg";
import BlazerIcon from "../../assets/icons/blazer.svg";
import HoodieIcon from "../../assets/icons/hoodie.svg";
import SweatshirtIcon from "../../assets/icons/sweatshirt.svg";
import RaincoatIcon from "../../assets/icons/raincoat.svg";
import SkirtIcon from "../../assets/icons/skirt.svg";
import PantIcon from "../../assets/icons/pant.svg";
import JacketIcon from "../../assets/icons/jacket.svg";
import TrouserIcon from "../../assets/icons/trouser.svg";
import KnitwearIcon from "../../assets/icons/knitwear.svg";
import JeansIcon from "../../assets/icons/jeans.svg";
import BlouseIcon from "../../assets/icons/blouse.svg";
import TankIcon from "../../assets/icons/tank-top.svg";
import ShirtIcon from "../../assets/icons/t-shirt.svg";
import TopIcon from "../../assets/icons/crop-top.svg";
import WatchIcon from "../../assets/icons/watch.svg";
import CapIcon from "../../assets/icons/cap.svg";
import UbrellaIcon from "../../assets/icons/umbrella.svg";
import BagIcon from "../../assets/icons/handbag.svg";
import JewellryIcon from "../../assets/icons/diamond-ring.svg";
import ScarfIcon from "../../assets/icons/scarf.svg";
import BeltIcon from "../../assets/icons/belt.svg";
import WalletIcon from "../../assets/icons/wallet.svg";
import GlovesIcon from "../../assets/icons/gloves.svg";
import SneakersIcon from "../../assets/icons/shoes.svg";
import LoafersIcon from "../../assets/icons/loafers.svg";
import HighHeelsIcon from "../../assets/icons/high-heels.svg";
import BallerinaIcon from "../../assets/icons/ballerina.svg";
import SlippersIcon from "../../assets/icons/slippers.svg";
import FlatShoesIcon from "../../assets/icons/ballets-flats.svg";
import BootsIcon from "../../assets/icons/boots.svg";
import RainbootsIcon from "../../assets/icons/wellington.svg";
import RightArrowIcon from "../../assets/icons/right-arrow.svg";
import PartyIcon from "../../assets/icons/confetti.svg";
import FestivalIcon from "../../assets/icons/music.svg";
import HikingIcon from "../../assets/icons/hiking.svg";
import SkiingIcon from "../../assets/icons/ski.svg";
import SwimmingIcon from "../../assets/icons/swim.svg";
import TennisIcon from "../../assets/icons/tennis.svg";
import CyclingIcon from "../../assets/icons/cycling.svg";
import YogaIcon from "../../assets/icons/yoga.svg";
import GolfIcon from "../../assets/icons/golfing.svg";
import GymIcon from "../../assets/icons/weightlifting.svg";
import RunningIcon from "../../assets/icons/running-shoes.svg";
import WeddingIcon from "../../assets/icons/wedding-rings.svg";
import BeachIcon from "../../assets/icons/vacations.svg";
import CottageCoreIcon from "../../assets/icons/wooden-house.svg";
import WalkmanIcon from "../../assets/icons/walkman.svg";
import DiscoballIcon from "../../assets/icons/disco-ball.svg";
import IpodIcon from "../../assets/icons/ipod.svg";
import MobileIcon from "../../assets/icons/mobile-phone.svg";
import HippieIcon from "../../assets/icons/hippie.svg";
import PunkIcon from "../../assets/icons/punk.svg";
import BusinessCasualIcon from "../../assets/icons/suit.svg";
import HomeIcon from "../../assets/icons/home.svg";
import StreetwearIcon from "../../assets/icons/streetwear.svg";
import SportIcon from "../../assets/icons/sport.svg";
import BohemianIcon from "../../assets/icons/bohemian-dress.svg";
import OldMoneyIcon from "../../assets/icons/dress-2.svg";
import PreppyIcon from "../../assets/icons/preppy.svg";
import VintageIcon from "../../assets/icons/trench-coat.svg";
import SummerIcon from "../../assets/icons/vacations.svg";
import SpringIcon from "../../assets/icons/flowers.svg";
import AutumnIcon from "../../assets/icons/leaf-fall.svg";
import WinterIcon from "../../assets/icons/snow.svg";
import RuralIcon from "../../assets/icons/field.svg";
import CityIcon from "../../assets/icons/cityscape.svg";
import MountainIcon from "../../assets/icons/mountain.svg";
import ForestIcon from "../../assets/icons/forest.svg";
import CoastIcon from "../../assets/icons/coast.svg";
import SunsetIcon from "../../assets/icons/sunset.svg";
import GinghamIcon from "../../assets/icons/gingham.svg";
import ArgyleIcon from "../../assets/icons/argyle.svg";
import HoundstoothIcon from "../../assets/icons/houndstooth.svg";
import FloralIcon from "../../assets/icons/floral-design.svg";
import GeometricIcon from "../../assets/icons/abstract-shape.svg";
import PolkaDotsIcon from "../../assets/icons/menu.svg";
import StripesIcon from "../../assets/icons/stripes.svg";
import PaisleyIcon from "../../assets/icons/paisley.svg";
import CheckedIcon from "../../assets/icons/checked.svg";
import CheckMarkIcon from "../../assets/icons/check-mark.svg";

interface SearchFilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  setPosts: any;
}

const SearchFilterModal: React.FC<SearchFilterModalProps> = ({
  isVisible,
  onClose,
  setPosts,
}) => {
  const { width } = Dimensions.get("window");

  const [modalStack, setModalStack] = useState(["main"]);
  const [currentSlideAnim] = useState(new Animated.Value(0));
  const [newSlideAnim] = useState(new Animated.Value(width));
  const [styleFilter, setStyleFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const [decadeFilter, setDecadeFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [patternFilter, setPatternFilter] = useState("");
  const [sportsFilter, setSportsFilter] = useState("");
  const [filterCounter, setFilterCounter] = useState(0);

  const [dressesFilter, setDressesFilter] = useState(false);
  const [topsFilter, setTopsFilter] = useState(false);
  const [tanksFilter, setTanksFilter] = useState(false);
  const [shirtsFilter, setShirtsFilter] = useState(false);
  const [blousesFilter, setBlousesFilter] = useState(false);
  const [jeansFilter, setJeansFilter] = useState(false);
  const [knitwearFilter, setKnitwearFilter] = useState(false);
  const [trousersFilter, setTrousersFilter] = useState(false);
  const [jacketsFilter, setJacketsFilter] = useState(false);
  const [skirtsFilter, setSkirtsFilter] = useState(false);
  const [raincoatsFilter, setRaincoatsFilter] = useState(false);
  const [sweatshirtsFilter, setSweatshirtsFilter] = useState(false);
  const [hoodiesFilter, setHoodiesFilter] = useState(false);
  const [blazersFilter, setBlazersFilter] = useState(false);
  const [cargosFilter, setCargosFilter] = useState(false);
  const [sneakersFilter, setSneakersFilter] = useState(false);
  const [loafersFilter, setLoafersFilter] = useState(false);
  const [highHeelsFilter, setHighHeelsFilter] = useState(false);
  const [ballerinaFilter, setBallerinaFilter] = useState(false);
  const [slippersFilter, setSlippersFilter] = useState(false);
  const [flatShoesFilter, setFlatShoesFilter] = useState(false);
  const [bootsFilter, setBootsFilter] = useState(false);
  const [rainbootsFilter, setRainbootsFilter] = useState(false);
  const [watchFilter, setWatchFilter] = useState(false);
  const [capFilter, setCapFilter] = useState(false);
  const [umbrellaFilter, setUmbrellaFilter] = useState(false);
  const [bagFilter, setBagFilter] = useState(false);
  const [jewellryFilter, setJewellryFilter] = useState(false);
  const [scarfFilter, setScarfFilter] = useState(false);
  const [beltFilter, setBeltFilter] = useState(false);
  const [walletFilter, setWalletFilter] = useState(false);
  const [glovesFilter, setGlovesFilter] = useState(false);
  const [sunglassesFilter, setSunglassesFilter] = useState(false);

  const [currentApparel, setCurrentApparel] = useState("");

  const clearSelections = () => {
    setStyleFilter("");
    setActivityFilter("");
    setDecadeFilter("");
    setSeasonFilter("");
    setLocationFilter("");
    setColorFilter("");
    setPatternFilter("");
    setSportsFilter("");
    setBootsFilter(false);
    setRainbootsFilter(false);
    setWatchFilter(false);
    setCapFilter(false);
    setUmbrellaFilter(false);
    setBagFilter(false);
    setJewellryFilter(false);
    setScarfFilter(false);
    setBeltFilter(false);
    setWalletFilter(false);
    setGlovesFilter(false);
    setSunglassesFilter(false);
    setDressesFilter(false);
    setTopsFilter(false);
    setTanksFilter(false);
    setShirtsFilter(false);
    setBlousesFilter(false);
    setJeansFilter(false);
    setKnitwearFilter(false);
    setTrousersFilter(false);
    setJacketsFilter(false);
    setSkirtsFilter(false);
    setRaincoatsFilter(false);
    setSweatshirtsFilter(false);
    setHoodiesFilter(false);
    setBlazersFilter(false);
    setCargosFilter(false);
    setSneakersFilter(false);
    setLoafersFilter(false);
    setHighHeelsFilter(false);
    setBallerinaFilter(false);
    setSlippersFilter(false);
    setFlatShoesFilter(false);

    setCurrentApparel("");
    setFilterCounter(0);
  };

  const clearApparelSelections = () => {
    setDressesFilter(false);
    setTopsFilter(false);
    setTanksFilter(false);
    setShirtsFilter(false);
    setBlousesFilter(false);
    setJeansFilter(false);
    setKnitwearFilter(false);
    setTrousersFilter(false);
    setJacketsFilter(false);
    setSkirtsFilter(false);
    setRaincoatsFilter(false);
    setSweatshirtsFilter(false);
    setHoodiesFilter(false);
    setBlazersFilter(false);
    setCargosFilter(false);
    setSneakersFilter(false);
    setLoafersFilter(false);
    setHighHeelsFilter(false);
    setBallerinaFilter(false);
    setSlippersFilter(false);
    setFlatShoesFilter(false);
    setWatchFilter(false);
    setCapFilter(false);
    setUmbrellaFilter(false);
    setBagFilter(false);
    setJewellryFilter(false);
    setScarfFilter(false);
    setBeltFilter(false);
    setWalletFilter(false);
    setGlovesFilter(false);
    setSunglassesFilter(false);
  };

  const selectApparel = (
    apparel: any,
    apparelFilter: any,
    setApparelFilter: any
  ) => {
    if (currentApparel === "") {
      setCurrentApparel(apparel);
      setFilterCounter(filterCounter + 1);
    } else if (currentApparel === apparel) {
      setCurrentApparel("");
      setFilterCounter(filterCounter - 1);
    } else {
      clearApparelSelections();
      setCurrentApparel(apparel);
    }
    setApparelFilter(!apparelFilter);
  };

  const selectStyle = (style: any) => {
    if (styleFilter === "") {
      setFilterCounter(filterCounter + 1);
    }

    if (styleFilter === style) {
      setStyleFilter("");
      setFilterCounter(filterCounter - 1);
    } else {
      setStyleFilter(style);
    }
  };
  const selectActivity = (activity: any) => {
    if (activityFilter === "") {
      setFilterCounter(filterCounter + 1);
    }

    if (activityFilter === activity) {
      setActivityFilter("");
      setFilterCounter(filterCounter - 1);
    } else {
      setActivityFilter(activity);
    }
  };

  const selectSports = (sport: any) => {
    if (sportsFilter === "") {
      setFilterCounter(filterCounter + 1);
    }

    if (sportsFilter === sport) {
      setSportsFilter("");
      setFilterCounter(filterCounter - 1);
    } else {
      setSportsFilter(sport);
    }
  };

  const selectDecade = (decade: any) => {
    if (decadeFilter === "") {
      setFilterCounter(filterCounter + 1);
    }

    if (decadeFilter === decade) {
      setDecadeFilter("");
      setFilterCounter(filterCounter - 1);
    } else {
      setDecadeFilter(decade);
    }
  };

  const selectSeason = (season: any) => {
    if (seasonFilter === "") {
      setFilterCounter(filterCounter + 1);
    }
    if (seasonFilter === season) {
      setSeasonFilter("");
      setFilterCounter(filterCounter - 1);
    } else {
      setSeasonFilter(season);
    }
  };

  const selectLocation = (location: any) => {
    if (locationFilter === "") {
      setFilterCounter(filterCounter + 1);
    }
    if (locationFilter === location) {
      setLocationFilter("");
      setFilterCounter(filterCounter - 1);
    } else {
      setLocationFilter(location);
    }
  };

  const selectPattern = (pattern: any) => {
    if (patternFilter === "") {
      setFilterCounter(filterCounter + 1);
    }
    if (patternFilter === pattern) {
      setPatternFilter("");
      setFilterCounter(filterCounter - 1);
    } else {
      setPatternFilter(pattern);
    }
  };

  const selectColor = (color: any) => {
    if (colorFilter === "") {
      setFilterCounter(filterCounter + 1);
    }
    if (colorFilter === color) {
      setColorFilter("");
      setFilterCounter(filterCounter - 1);
    } else {
      setColorFilter(color);
    }
  };

  const pushToModalStack = (newView: any) => {
    Animated.timing(currentSlideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start();

    newSlideAnim.setValue(width);
    Animated.timing(newSlideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalStack([...modalStack, newView]);
      currentSlideAnim.setValue(0);
    });
  };

  const search = async () => {
    console.log("Searching for:", styleFilter);
    onClose();

    const searchQuery =
      styleFilter +
      " " +
      activityFilter +
      " " +
      decadeFilter +
      " " +
      seasonFilter +
      " " +
      locationFilter +
      " " +
      colorFilter +
      " " +
      patternFilter +
      " " +
      sportsFilter;

    try {
      const formData = new FormData();
      formData.append("search_text", searchQuery);

      const response = await axios.post(
        "http://localhost:3001/api/v1/search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fetchedPosts = response.data;

      const sortedPosts = fetchedPosts.sort(
        (a: any, b: any) => b.score - a.score
      );

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const popFromModalStack = () => {
    Animated.timing(currentSlideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(newSlideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalStack(modalStack.slice(0, -1));
      newSlideAnim.setValue(width);
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateX: currentSlideAnim }],
            },
          ]}
        >
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <TouchableOpacity onPress={onClose}>
              <FontAwesomeIcon icon={faX} size={20} style={{ marginTop: 1 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 23, marginTop: -2, marginLeft: 130 }}>
              Filter
            </Text>
            <TouchableOpacity onPress={clearSelections}>
              <Text style={{ fontSize: 20, marginTop: 1, marginLeft: 95 }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          {modalStack[modalStack.length - 1] === "main" && (
            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 15 }}>
                  <Text style={{ fontSize: 27, marginBottom: 10 }}>
                    Apparel
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => pushToModalStack("clothing")}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <DressIcon
                        width={40}
                        height={40}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={styles.modalButtonText}>Clothing</Text>
                    </View>
                    <RightArrowIcon width={18} height={18} />
                  </TouchableOpacity>

                  <View style={styles.separator} />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => pushToModalStack("shoes")}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <RunningShoeIcon
                        width={40}
                        height={40}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={styles.modalButtonText}>Shoes</Text>
                    </View>
                    <RightArrowIcon width={18} height={18} />
                  </TouchableOpacity>

                  <View style={styles.separator} />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => pushToModalStack("accessories")}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <AccessoriesIcon
                        width={40}
                        height={40}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={styles.modalButtonText}>Accessories</Text>
                    </View>
                    <RightArrowIcon width={18} height={18} />
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 27 }}>Colors</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "white"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("white")}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "black"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("black")}
                    >
                      <View
                        style={{
                          backgroundColor: "black",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "blue"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("blue")}
                    >
                      <View
                        style={{
                          backgroundColor: "blue",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "green"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("green")}
                    >
                      <View
                        style={{
                          backgroundColor: "green",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "yellow"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("yellow")}
                    >
                      <View
                        style={{
                          backgroundColor: "yellow",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "orange"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("orange")}
                    >
                      <View
                        style={{
                          backgroundColor: "orange",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "red"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("red")}
                    >
                      <View
                        style={{
                          backgroundColor: "red",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "pink"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("pink")}
                    >
                      <View
                        style={{
                          backgroundColor: "pink",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "beige"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("beige")}
                    >
                      <View
                        style={{
                          backgroundColor: "beige",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        colorFilter === "brown"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectColor("brown")}
                    >
                      <View
                        style={{
                          backgroundColor: "brown",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View style={{ marginTop: 0 }}>
                  <Text style={{ fontSize: 27 }}>Patterns</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "solid"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("solid")}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                        }}
                      ></View>
                      <Text style={{}}>Solid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "checked"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("checked")}
                    >
                      <CheckedIcon width={50} height={50} />
                      <Text style={{}}>Checked</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "stripes"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("stripes")}
                    >
                      <StripesIcon width={50} height={50} />
                      <Text style={{}}>Stripes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "polka dots"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("polka dots")}
                    >
                      <PolkaDotsIcon width={50} height={50} />
                      <Text style={{}}>Polka Dots</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "floral"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("floral")}
                    >
                      <FloralIcon width={50} height={50} />
                      <Text>Floral</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "houndstooth"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("houndstooth")}
                    >
                      <HoundstoothIcon width={50} height={50} />
                      <Text>Houndstooth</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "paisley"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("paisley")}
                    >
                      <PaisleyIcon width={50} height={50} />
                      <Text style={{}}>Paisley</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "geometric"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("geometric")}
                    >
                      <GeometricIcon width={50} height={50} />
                      <Text style={{}}>Geometric</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "argyle"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("argyle")}
                    >
                      <ArgyleIcon width={50} height={50} />
                      <Text style={{}}>Argyle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        patternFilter === "gingham"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectPattern("gingham")}
                    >
                      <GinghamIcon width={50} height={50} />
                      <Text>Gingham</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View>
                  <Text style={{ fontSize: 27 }}>Styles</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "business"
                          ? styles.selectedCategoryButton
                          : {},
                        { justifyContent: "center", alignItems: "center" }, // Add this line
                      ]}
                      onPress={() => selectStyle("business")}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center", // Corrected property
                        }}
                      >
                        <BusinessCasualIcon width={50} height={50} />
                        <Text>Business</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "streetwear"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectStyle("streetwear")}
                    >
                      <StreetwearIcon width={50} height={50} />
                      <Text>Streetwear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "old money"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectStyle("old money")}
                    >
                      <OldMoneyIcon width={50} height={50} />
                      <Text style={{}}>Old Money</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "preppy"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectStyle("preppy")}
                    >
                      <PreppyIcon width={50} height={50} />
                      <Text style={{}}>Preppy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "bohemian"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectStyle("bohemian")}
                    >
                      <BohemianIcon width={50} height={50} />
                      <Text style={{}}>Bohemian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "punk"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectStyle("punk")}
                    >
                      <PunkIcon width={50} height={50} />
                      <Text style={{}}>Punk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "vintage"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectStyle("vintage")}
                    >
                      <VintageIcon width={50} height={50} />
                      <Text style={{}}>Vintage</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "cottagecore"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectStyle("cottagecore")}
                    >
                      <CottageCoreIcon width={50} height={50} />
                      <Text style={{}}>Cottagecore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        styleFilter === "sporty"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectStyle("sporty")}
                    >
                      <SportIcon width={50} height={50} />
                      <Text style={{}}>Sporty</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Text style={{ fontSize: 27 }}>Activities</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        activityFilter === "party"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectActivity("party")}
                    >
                      <PartyIcon width={50} height={50} />
                      <Text>Party</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        activityFilter === "wedding"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectActivity("wedding")}
                    >
                      <WeddingIcon width={50} height={50} />
                      <Text>Wedding</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        activityFilter === "festival"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectActivity("festival")}
                    >
                      <FestivalIcon width={50} height={50} />
                      <Text>Festival</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        activityFilter === "beach"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectActivity("beach")}
                    >
                      <BeachIcon width={50} height={50} />
                      <Text>Beach</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        activityFilter === "home"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectActivity("home")}
                    >
                      <HomeIcon width={50} height={50} />
                      <Text>Home</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View>
                  <Text style={{ fontSize: 27 }}>Sports</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "running"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("running")}
                    >
                      <RunningIcon width={50} height={50} />
                      <Text style={{}}>Running</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "yoga"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("yoga")}
                    >
                      <YogaIcon width={50} height={50} />
                      <Text style={{}}>Yoga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "gym"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("gym")}
                    >
                      <GymIcon width={50} height={50} />
                      <Text style={{}}>Gym</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "cycling"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("cycling")}
                    >
                      <CyclingIcon width={50} height={50} />
                      <Text style={{}}>Cycling</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "swimming"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("swimming")}
                    >
                      <SwimmingIcon width={50} height={50} />
                      <Text style={{}}>Swimming</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "golf"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("golf")}
                    >
                      <GolfIcon width={50} height={50} />
                      <Text style={{}}>Golf</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "tennis"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("tennis")}
                    >
                      <TennisIcon width={50} height={50} />
                      <Text style={{}}>Tennis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "skiing"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("skiing")}
                    >
                      <SkiingIcon width={50} height={50} />
                      <Text style={{}}>Skiing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        sportsFilter === "hiking"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSports("hiking")}
                    >
                      <HikingIcon width={50} height={50} />
                      <Text style={{}}>Hiking</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View>
                  <Text style={{ fontSize: 27 }}>Seasons</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        seasonFilter === "spring"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSeason("spring")}
                    >
                      <SpringIcon width={50} height={50} />
                      <Text style={{}}>Spring</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        seasonFilter === "summer"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSeason("summer")}
                    >
                      <SummerIcon width={50} height={50} />
                      <Text style={{}}>Summer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        seasonFilter === "autumn"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSeason("autumn")}
                    >
                      <AutumnIcon width={50} height={50} />
                      <Text style={{}}>Autumn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        seasonFilter === "winter"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectSeason("winter")}
                    >
                      <WinterIcon width={50} height={50} />
                      <Text style={{}}>Winter</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View>
                  <Text style={{ fontSize: 27 }}>Location</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        locationFilter === "rural"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectLocation("rural")}
                    >
                      <RuralIcon width={50} height={50} />
                      <Text style={{}}>Rural</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        locationFilter === "city"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectLocation("city")}
                    >
                      <CityIcon width={50} height={50} />
                      <Text style={{}}>City</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        locationFilter === "mountain"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectLocation("mountain")}
                    >
                      <MountainIcon width={50} height={50} />
                      <Text style={{}}>Mountain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        locationFilter === "forest"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectLocation("forest")}
                    >
                      <ForestIcon width={50} height={50} />
                      <Text style={{}}>Forest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        locationFilter === "beach"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectLocation("beach")}
                    >
                      <SunsetIcon width={50} height={50} />
                      <Text style={{}}>Beach</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        locationFilter === "coast"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectLocation("coast")}
                    >
                      <CoastIcon width={50} height={50} />
                      <Text style={{}}>Coast</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View style={{ marginBottom: 70 }}>
                  <Text style={{ fontSize: 27 }}>Decade</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        decadeFilter === "00s"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectDecade("00s")}
                    >
                      <IpodIcon width={50} height={50} />
                      <Text style={{}}>00s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        decadeFilter === "90s"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectDecade("90s")}
                    >
                      <MobileIcon width={50} height={50} />
                      <Text style={{}}>90s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        decadeFilter === "80s"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectDecade("80s")}
                    >
                      <WalkmanIcon width={50} height={50} />
                      <Text style={{}}>80s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        decadeFilter === "70s"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectDecade("70s")}
                    >
                      <DiscoballIcon width={50} height={50} />
                      <Text style={{}}>70s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton,
                        decadeFilter === "60s"
                          ? styles.selectedCategoryButton
                          : {},
                      ]}
                      onPress={() => selectDecade("60s")}
                    >
                      <HippieIcon width={50} height={50} />
                      <Text style={{}}>60s</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </ScrollView>
              {filterCounter > 0 ? (
                <TouchableOpacity
                  style={styles.applyFilterButton}
                  onPress={search}
                >
                  <Text style={styles.applyFilterText}>
                    Apply Filter [{filterCounter}]
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          )}
        </Animated.View>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateX: newSlideAnim }],
              position: "absolute",
              top: 0,
              left: 0,
            },
          ]}
        >
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <TouchableOpacity onPress={popFromModalStack}>
              <FontAwesomeIcon icon={faArrowLeft} size={25} />
            </TouchableOpacity>
            <Text style={{ fontSize: 23, marginTop: -2, marginLeft: 130 }}>
              Filter
            </Text>
            <TouchableOpacity onPress={clearSelections}>
              <Text style={{ fontSize: 20, marginTop: 1, marginLeft: 95 }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          {modalStack[modalStack.length - 1] === "clothing" && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("dresses", dressesFilter, setDressesFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <DressIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Dresses</Text>
                </View>
                {dressesFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>

              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => selectApparel("tops", topsFilter, setTopsFilter)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TopIcon width={40} height={40} style={styles.productIcon} />
                  <Text style={styles.modalButtonText}>Tops</Text>
                </View>
                {topsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("tanks", tanksFilter, setTanksFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TankIcon width={40} height={40} style={styles.productIcon} />
                  <Text style={styles.modalButtonText}>Tanks</Text>
                </View>
                {tanksFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("blouses", blousesFilter, setBlousesFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BlouseIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Blouses</Text>
                </View>
                {blousesFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("shirts", shirtsFilter, setShirtsFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ShirtIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Shirts</Text>
                </View>
                {shirtsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("jeans", jeansFilter, setJeansFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <JeansIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Jeans</Text>
                </View>
                {jeansFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("trousers", trousersFilter, setTrousersFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TrouserIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Trousers</Text>
                </View>
                {trousersFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("knitwear", knitwearFilter, setKnitwearFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <KnitwearIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Knitwear</Text>
                </View>
                {knitwearFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("jackets", jacketsFilter, setJacketsFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <JacketIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Jackets</Text>
                </View>
                {jacketsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("blazers", blazersFilter, setBlazersFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BlazerIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Blazers</Text>
                </View>
                {blazersFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel(
                    "sweatshirts",
                    sweatshirtsFilter,
                    setSweatshirtsFilter
                  )
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SweatshirtIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Sweatshirts</Text>
                </View>
                {sweatshirtsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("hoodies", hoodiesFilter, setHoodiesFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <HoodieIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Hoodies</Text>
                </View>
                {hoodiesFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel(
                    "raincoats",
                    raincoatsFilter,
                    setRaincoatsFilter
                  )
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RaincoatIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Raincoats</Text>
                </View>
                {raincoatsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("cargos", cargosFilter, setCargosFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <PantIcon width={40} height={40} style={styles.productIcon} />
                  <Text style={styles.modalButtonText}>Cargos</Text>
                </View>
                {cargosFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("skirts", skirtsFilter, setSkirtsFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SkirtIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Skirts</Text>
                </View>
                {skirtsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
            </ScrollView>
          )}
          {modalStack[modalStack.length - 1] === "shoes" && (
            <ScrollView>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("sneakers", sneakersFilter, setSneakersFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SneakersIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Sneakers</Text>
                </View>
                {sneakersFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel(
                    "flatshoes",
                    flatShoesFilter,
                    setFlatShoesFilter
                  )
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FlatShoesIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Flat Shoes</Text>
                </View>
                {flatShoesFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("loafers", loafersFilter, setLoafersFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <LoafersIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Loafers</Text>
                </View>
                {loafersFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("boots", bootsFilter, setBootsFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BootsIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Boots</Text>
                </View>
                {bootsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel(
                    "high heels",
                    highHeelsFilter,
                    setHighHeelsFilter
                  )
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <HighHeelsIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>High Heels</Text>
                </View>
                {highHeelsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel(
                    "ballerina",
                    ballerinaFilter,
                    setBallerinaFilter
                  )
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BallerinaIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Ballerinas</Text>
                </View>
                {ballerinaFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel(
                    "rainboots",
                    rainbootsFilter,
                    setRainbootsFilter
                  )
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RainbootsIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Rainboots</Text>
                </View>
                {rainbootsFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("slippers", slippersFilter, setSlippersFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SlippersIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Slippers</Text>
                </View>
                {slippersFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
            </ScrollView>
          )}
          {modalStack[modalStack.length - 1] === "accessories" && (
            <ScrollView>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => selectApparel("bags", bagFilter, setBagFilter)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BagIcon width={40} height={40} style={styles.productIcon} />
                  <Text style={styles.modalButtonText}>Bags</Text>
                </View>
                {bagFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("jewellery", jewellryFilter, setJewellryFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <JewellryIcon
                    width={37}
                    height={37}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Jewellery</Text>
                </View>
                {jewellryFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel(
                    "sunglasses",
                    sunglassesFilter,
                    setSunglassesFilter
                  )
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AccessoriesIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Sunglasses</Text>
                </View>
                {sunglassesFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => selectApparel("caps", capFilter, setCapFilter)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CapIcon width={38} height={38} style={styles.productIcon} />
                  <Text style={styles.modalButtonText}>Hats</Text>
                </View>
                {capFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("scarf", scarfFilter, setScarfFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ScarfIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Scarves</Text>
                </View>
                {scarfFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => selectApparel("belt", beltFilter, setBeltFilter)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BeltIcon width={40} height={40} style={styles.productIcon} />
                  <Text style={styles.modalButtonText}>Belts</Text>
                </View>
                {beltFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("watch", watchFilter, setWatchFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <WatchIcon
                    width={38}
                    height={38}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Watches</Text>
                </View>
                {watchFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("wallet", walletFilter, setWalletFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <WalletIcon
                    width={37}
                    height={37}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Wallets</Text>
                </View>
                {walletFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("gloves", glovesFilter, setGlovesFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <GlovesIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Gloves</Text>
                </View>
                {glovesFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  selectApparel("umbrella", umbrellaFilter, setUmbrellaFilter)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <UbrellaIcon
                    width={40}
                    height={40}
                    style={styles.productIcon}
                  />
                  <Text style={styles.modalButtonText}>Umbrellas</Text>
                </View>
                {umbrellaFilter && <CheckMarkIcon width={25} height={25} />}
              </TouchableOpacity>
            </ScrollView>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SearchFilterModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
  },
  modalButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  horizontalScroll: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center", // Make sure this is included
    width: 90,
    height: 90,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 10,
    width: "95%",
  },
  modalButtonText: {
    fontSize: 25,
    color: "#333",
    textAlign: "center",
  },
  fullSeparator: {
    height: 2,
    backgroundColor: "black",
    marginHorizontal: 10,
    width: "100%",
  },
  applyFilterButton: {
    position: "absolute", // Keeps the button fixed at the bottom
    bottom: 40, // Position at the very bottom with a margin of 40
    height: 45, // Height of the button
    width: "95%", // Button takes up 95% of the screen width
    backgroundColor: "black", // Button color
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    alignSelf: "center", // Centers the button horizontally in the container
    borderRadius: 22.5, // Optional: adds rounded corners (half of height for full pill shape)
  },

  selectedCategoryButton: {
    width: 90,
    height: 90,
    backgroundColor: "#f2f2f2", // Example highlight color
    borderRadius: 10, // Circular shape if you like
    borderColor: "black", // Border color
    borderWidth: 1, // Border width
  },

  applyFilterText: {
    color: "white", // Text color
    fontSize: 18, // Text size
  },
  productIcon: {
    marginRight: 10,
  },
});
