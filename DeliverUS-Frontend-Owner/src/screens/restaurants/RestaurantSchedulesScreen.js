import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { getRestaurantSchedules, removeSchedule } from '../../api/RestaurantEndpoints'
import DeleteModal from '../../components/DeleteModal'
import { useNavigation } from '@react-navigation/native'

const RestaurantSchedulesScreen = ({ route }) => {
  const { restaurantId } = route.params
  const [schedules, setSchedules] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedScheduleId, setSelectedScheduleId] = useState(null)
  const navigation = useNavigation()

  useEffect(() => {
    getRestaurantSchedules(restaurantId).then(setSchedules)
  }, [])

  const confirmDelete = id => {
    setSelectedScheduleId(id)
    setModalVisible(true)
  }

  const deleteSchedule = () => {
    removeSchedule(restaurantId, selectedScheduleId).then(() => {
      getRestaurantSchedules(restaurantId).then(setSchedules)
      navigation.navigate('RestaurantDetailScreen', { restaurantId })
    })
    setModalVisible(false)
  }

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>{item.startTime} - {item.endTime}</Text>
      <Text>{item.products.length} productos</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditScheduleScreen', { restaurantId, schedule: item })}>
        <Text>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmDelete(item.id)}>
        <Text>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View>
      <FlatList
        data={schedules}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <DeleteModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={deleteSchedule}
      />
    </View>
  )
}

export default RestaurantSchedulesScreen
