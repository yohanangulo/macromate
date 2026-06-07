import { globalStyles } from '@/common/style/globals'
import MacroGrid from '@/components/home/macro-grid'
import RecentMeals from '@/components/home/recent-meals'
import CopyButton from '@/components/meals/copy-button'
import ShareButton from '@/components/meals/share-button'
import { ScrollView, Text, View } from 'react-native'
import HomeHeader from '../../components/home/home-header'

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>MacroZone</Text>
        <ShareButton />
      </View>
      <HomeHeader />
      <MacroGrid />
      <CopyButton />
      <RecentMeals />
    </ScrollView>
  )
}
