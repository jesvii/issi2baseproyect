import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getRestaurantDetail } from '../../api/RestaurantEndpoints'

const RestaurantDetailScreen = ({ route }) => {
  const { restaurantId } = route.params
  const [products, setProducts] = useState([])

  useEffect(() => {
    getRestaurantDetail(restaurantId).then(data => {
      setProducts(data.products)
    })
  }, [])

  const renderItem = ({ item }) => {
    const schedule = item.schedule
    const horarioTexto = schedule ? `${schedule.startTime} - ${schedule.endTime}` : 'Not scheduled'

    return (
      <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="timetable" size={20} />
          <Text style={{ marginLeft: 5 }}>{horarioTexto}</Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  )
}

export default RestaurantDetailScreen
