import React, { useEffect, useState } from 'react'
import { View, TextInput, Button, Picker } from 'react-native'
import { getRestaurantSchedules, updateProduct } from '../../api/RestaurantEndpoints'
import { useNavigation } from '@react-navigation/native'

const EditProductScreen = ({ route }) => {
  const { restaurantId, product } = route.params
  const [schedules, setSchedules] = useState([])
  const [scheduleId, setScheduleId] = useState(product.schedule ? product.schedule.id : null)
  const navigation = useNavigation()

  useEffect(() => {
    getRestaurantSchedules(restaurantId).then(setSchedules)
  }, [])

  const handleSave = () => {
    const updated = {
      name: product.name,
      description: product.description,
      price: product.price,
      order: product.order,
      productCategoryId: product.productCategoryId,
      availability: product.availability,
      scheduleId
    }
    updateProduct(product.id, updated).then(() => {
      navigation.navigate('RestaurantDetailScreen', { restaurantId })
    })
  }

  return (
    <View>
      <TextInput value={product.name} editable={false} />
      <Picker selectedValue={scheduleId} onValueChange={value => setScheduleId(value)}>
        <Picker.Item label="No asignado" value={null} />
        {schedules.map(schedule => (
          <Picker.Item
            key={schedule.id}
            label={`${schedule.startTime} - ${schedule.endTime}`}
            value={schedule.id}
          />
        ))}
      </Picker>
      <Button title="Guardar" onPress={handleSave} />
    </View>
  )
}

export default EditProductScreen
