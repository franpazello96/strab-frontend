import { useState } from "react";
import { Header } from "@/components/header";
import { StatusBar, View, Text, ScrollView , TouchableOpacity, Alert, Modal} 
from "react-native";
import {Credential} from "@/components/credential"; 
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "@/components/button";
import  * as ImagePicker from "expo-image-picker";
import { QRCode } from "@/components/qrcode";
import {useBadgeStore} from '@/store/badge-store';
import { Redirect } from "expo-router"; 
export default function Ticket() {
  
  //const [image, setImage] = useState("");
  const [showQRCode, setShowQRCode] = useState(false)
  const badgeStore = useBadgeStore()

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })
      if (result.assets) {
        //setImage(result.assets[0].uri)
        badgeStore.updateAvatar(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao selecionar imagem");
    }
  }

  if(!badgeStore.data?.checkInUrl){
    return <Redirect href="/"/>
  }

  return (
    <View className="flex-1 bg-green-950">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />
      <ScrollView className="-mt-28 -z-10" 
      contentContainerClassName="px-8 pb-8"
      showsVerticalScrollIndicator={false}>

        <Credential 
       // image={image} 

        data={badgeStore.data}
        onChangeAvatar={handleSelectImage}
        onShowQRCode={() => setShowQRCode(true)}/>

        <FontAwesome name="angle-double-down" 
        size={24} 
        color="white" 
        className="self-center my-6"/>
        
        {/* <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar Credencial</Text> */}

        {/* <Text className="text-white font-regular text-base mt-1 mb-6">
        Compartilhar Credencial do evento {badgeStore.data.eventTitle}</Text> */}

        {/* <Button title="Compartilhar" /> */}

        <TouchableOpacity 
        activeOpacity={0.9} 
        className="mt-10"
        onPress={() => badgeStore.remove()}>
          <Text className="text-white font-bold text-base text-center">
            Remover Ingresso</Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal visible={showQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity activeOpacity={0.7} 
          onPress={()=>setShowQRCode(false)}
            >
            <QRCode value="https://www.pucpr.com.br" size={300} />
            <Text className="text-base text-orange-500 
            font-bold text-center mt-10">Fechar QRCode</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        
    </View>

  )
}