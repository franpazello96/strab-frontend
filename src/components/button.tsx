import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading=false, ...rest }: Props) {
  return (
    <TouchableOpacity 
    disabled={isLoading} 
    activeOpacity={0.7}
    className="bg-orange-500 items-center justify-center 
    rounded-lg p-2" {...rest} >
      {
      isLoading ? (<ActivityIndicator className="text-green-950"/>)
      : (
        <Text className="text-gray-900 text-lg font-bold uppercase">
        {title}
        </Text>
      )}

    </TouchableOpacity>
  )
}
