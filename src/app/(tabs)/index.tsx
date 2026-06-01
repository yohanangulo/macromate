import { globalStyles } from '@/common/style/globals'
import MacroGrid from '@/components/home/macro-grid'
import RecentMeals from '@/components/home/recent-meals'
import { ScrollView, Text } from 'react-native'
import HomeHeader from '../../components/home/home-header'

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
      <MacroGrid />
      <RecentMeals />
    </ScrollView>
  )
}
