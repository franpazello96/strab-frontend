import "@/styles/global.css";

import {Slot} from "expo-router";

import { Loading  } from '@/components/loading';

import {useFonts,Roboto_700Bold,Roboto_400Regular,Roboto_500Medium,
} from "@expo-google-fonts/roboto";

export default function Layout(){
const [fontsLoading] = useFonts({
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_500Medium
});


if (!fontsLoading) {
  return <Loading/>
}

  return  (
   <Slot/>
  )
}

