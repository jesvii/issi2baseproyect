import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import ApiHelper from "../../api/helpers/ApiRequestsHelper";
import { AppContext } from "../../context/AppContext";

export default function ProductScheduleScreen() {
  const { currentRestaurant } = useContext(AppContext);
  const [schedules, setSchedules] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const fetchSchedules = async () => {
    const data = await ApiHelper.get(`/schedules/restaurant/${currentRestaurant.id}`);
    setSchedules(data);
  };

  const createSchedule = async () => {
    await ApiHelper.post("/schedules", {
      startTime, endTime, restaurantId: currentRestaurant.id
    });
    fetchSchedules();
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <View>
      <Text>Horarios del Restaurante</Text>
      <TextInput placeholder="Hora Inicio (HH:mm:ss)" onChangeText={setStartTime} value={startTime} />
      <TextInput placeholder="Hora Fin (HH:mm:ss)" onChangeText={setEndTime} value={endTime} />
      <Button title="Crear Horario" onPress={createSchedule} />
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.startTime} - {item.endTime}</Text>
        )}
      />
    </View>
  );
}
