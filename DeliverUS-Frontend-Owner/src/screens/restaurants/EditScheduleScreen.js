import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { updateSchedule } from '../../api/RestaurantEndpoints'
import { useNavigation } from '@react-navigation/native'

const EditScheduleScreen = ({ route }) => {
  const { restaurantId, schedule } = route.params
  const [startTime, setStartTime] = useState(schedule.startTime)
  const [endTime, setEndTime] = useState(schedule.endTime)
  const navigation = useNavigation()

  const handleSave = () => {
    updateSchedule(restaurantId, schedule.id, { startTime, stopTime: endTime }).then(() => {
      navigation.navigate('RestaurantDetailScreen', { restaurantId })
    })
  }

  return (
    <View>
      <TextInput value={startTime} onChangeText={setStartTime} placeholder="HH:mm:ss" />
      <TextInput value={endTime} onChangeText={setEndTime} placeholder="HH:mm:ss" />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  )
}

export default EditScheduleScreen
