import { View, Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import {Feather} from "@expo/vector-icons";
import { QRCode } from "@/components/qrcode";
import  { BadgeStore } from "@/store/badge-store";

type Props = {
  data: BadgeStore;
  image?: string;
  onChangeAvatar?: () => void;
  onShowQRCode?: () => void;
}

export function Credential({data, onChangeAvatar, onShowQRCode}: Props) {
  return (
    <View className="fw-full self-stretch items-center">
      <Image source={require ("@/assets/ticket/band.png")} 
      className="w-24 h-52 z-10"/>

      <View className="bg-black/20 self-stretch items-center pb-6 
      border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground 
        source={require ("@/assets/ticket/header.png")}
        className="px-6 py-8 h-40 items-center self-stretch border-b 
        border-white/10 overflow-hidden">
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">  
             {data.eventTitle}</Text>
            <Text className="text-zinc-50 text-sm font-bold">
             #{data.id}</Text>         
          </View>
          <View className="w-40  h-40 bg-black rounded-full"/>
        </ImageBackground>
        
       { data.image ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <Image source={{uri: data.image}}
          className="w-36 h-36 rounded-full -mt-24 bg-gray-400"
          />
          </TouchableOpacity>
        ):(
        <TouchableOpacity 
        activeOpacity={0.7} 
        className="w-36 h-36 rounded-full -mt-24 bg-gray-400 
        items-center 
        justify-center" 
        onPress={onChangeAvatar}
        >
         <Feather name="camera" size={24} color="black"/>
        </TouchableOpacity>
        )}

        <Text className="text-zinc-50 text-2xl font-bold mt-4">  
        {data.name}</Text>
        <Text className="text-zinc-300 font-regular text-base mb-4">  
          {data.email} </Text>
        
        <QRCode value={data.checkInUrl} size={120} />

          <TouchableOpacity 
          activeOpacity={0.9} 
          className="mt-6" 
          onPress={onShowQRCode}>

          <Text className="font-body text-orange-500 text-sm">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>


      </View>
    </View>
  )
}