/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import CategoriesPage from "../Container/CategoriesPage";
import CustomDrawerContainer from "../Container/CustomDrawerContainer";
import DeleteAccountCompleteScreen from "../Container/DeleteAccountCompleteContainer";
import DeleteAccountPasswordScreen from "../Container/DeleteAccountPasswordScreenContainer";
import DeleteAccountFirstScreen from "../Container/DeleteAccountScreenContainer/DeleteAccountFirstScreen";
import DeleteAccountScreen from "../Container/DeleteAccountScreenContainer/DeleteAccountScreen";
import HomeScreenContainer from "../Container/HomeScreenContainer/HomeScreenContainer";
import ProductListingContainer from "../Container/ProductListingContainer/ProductListingContainer";
import ProfileScreenContainer from "../Container/ProfileScreenContainer/ProfileScreenContainer";
import colors from "../Themes/Colors";
import CategoryTabIcon from "./../Images/bottombarIcon/category.svg";
import CategoryTabIconBlack from "./../Images/bottombarIcon/categoryBlack.svg";
import HomeTabIcon from "./../Images/bottombarIcon/home.svg";
import HomeTabIconBlack from "./../Images/bottombarIcon/homeBlack.svg";
import ProfileTabIcon from "./../Images/bottombarIcon/profile.svg";
import ProfileTabIconBlack from "./../Images/bottombarIcon/profileBlack.svg";

const HomeStack = createDrawerNavigator();

function Home() {
  return (
    <HomeStack.Navigator
      drawerContent={props => <CustomDrawerContainer {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false, drawerLabelStyle: { color: colors.white }, drawerStyle: { backgroundColor: colors.black, width: "100%" } }}
    >
      <HomeStack.Screen name="Home" component={HomeScreenContainer} />
      <HomeStack.Screen name="ProductsListing" component={ProductListingContainer} />
    </HomeStack.Navigator>
  );
}

const SettingStack = createDrawerNavigator();

function Category() {
  return (
    <SettingStack.Navigator
      drawerContent={props => <CustomDrawerContainer {...props} />}
      initialRouteName="Categories"
      screenOptions={{ headerShown: false, drawerLabelStyle: { color: colors.white }, drawerStyle: { backgroundColor: colors.black, width: "100%" } }}
    >
      <SettingStack.Screen name="Categories" component={CategoriesPage} />
    </SettingStack.Navigator>
  );
}

const MyProfileStack = createDrawerNavigator();

function MyProfile() {
  return (
    <MyProfileStack.Navigator
      drawerContent={props => <CustomDrawerContainer {...props} />}
      initialRouteName="My Profile"
      screenOptions={{ headerShown: false, drawerLabelStyle: { color: colors.white }, drawerStyle: { backgroundColor: colors.black, width: "100%" } }}
    >
      <MyProfileStack.Screen name="My Profile" component={ProfileScreenContainer} />
      <MyProfileStack.Screen name="DeleteAccountContainer" component={DeleteAccount} />
    </MyProfileStack.Navigator>
  );
}

const DeleteAccountStack = createStackNavigator();

function DeleteAccount() {
  return (
    <DeleteAccountStack.Navigator headerMode="none">
      <DeleteAccountStack.Screen name="DeleteAcFirstScreen" component={DeleteAccountFirstScreen} />
      <DeleteAccountStack.Screen name="DeletePassAc" component={DeleteAccountPasswordScreen} />
      <DeleteAccountStack.Screen name="DeleteAc" component={DeleteAccountScreen} />
      <DeleteAccountStack.Screen name="DeleteAcComplete" component={DeleteAccountCompleteScreen} />
    </DeleteAccountStack.Navigator>
  );
}
/**
 * This navigator contains all possible screens from bottom bar navigation of app
 */
const DashboardTab = createBottomTabNavigator();
function DashboardTabNav() {
  const { t } = useTranslation();
  const getDashboardTabs = () => {
    return (
      <>
        <DashboardTab.Screen
          name="HomeScreenContainer"
          component={Home}
          options={{
            tabBarIcon: ({ size, focused, color }) => (focused ? <HomeTabIconBlack /> : <HomeTabIcon />),
          }}
        />
        <DashboardTab.Screen
          name="CategoriContainer"
          component={Category}
          options={{
            tabBarIcon: ({ size, focused, color }) => (focused ? <CategoryTabIconBlack /> : <CategoryTabIcon />),
          }}
        />
        <DashboardTab.Screen
          name="My Profile"
          component={MyProfile}
          options={{
            tabBarIcon: ({ size, focused, color }) => (focused ? <ProfileTabIconBlack /> : <ProfileTabIcon />),
          }}
        />
      </>
    );
  };

  return (
    <DashboardTab.Navigator
      initialRouteName="HomeScreenContainer"
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        return {
          headerShown: false,
          tabBarHideOnKeyboard: Platform.OS === "android",
          tabBarLabel:
            route.name === "HomeScreenContainer"
              ? t("home")
              : route.name === "CategoriContainer"
              ? t("categories")
              : route.name === "My Profile"
              ? t("profile")
              : route.name,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: colors.darkBlue,
          tabBarInactiveTintColor: colors.darkGrey,
          tabBarStyle: routeName === "ProductsListing" ? { display: "none" } : { display: "flex" },
        };
      }}
    >
      {getDashboardTabs()}
    </DashboardTab.Navigator>
  );
}

const PrimaryStack = createStackNavigator();

function PrimaryNav() {
  return (
    <PrimaryStack.Navigator initialRouteName="Dashboard" headerMode={"none"}>
      <PrimaryStack.Screen name="HomeScreen" component={Home} />
      <PrimaryStack.Screen name="ProductsListing" component={ProductListingContainer} />
      <PrimaryStack.Screen name="Categories" component={Category} />
      <PrimaryStack.Screen name="ProfileContainer" component={MyProfile} />
      <PrimaryStack.Screen name="DeleteAccountContainer" component={DeleteAccount} />
      <PrimaryStack.Screen name="Dashboard" component={DashboardTabNav} />
    </PrimaryStack.Navigator>
  );
}

export default PrimaryNav;
