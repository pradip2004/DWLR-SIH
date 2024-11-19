import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const router=useRouter();

  return (
    <View>
<Redirect href={'/Alert'}/>

    </View>
    
  );
}
