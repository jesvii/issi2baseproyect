import { get, post, put, destroy } from './helpers/ApiRequestsHelper'

function getByRestaurant (restaurantId) {
  return get(`schedules/restaurant/${restaurantId}`)
}

function create (data) {
  return post('schedules', data)
}

function update (id, data) {
  return put(`schedules/${id}`, data)
}

function remove (id) {
  return destroy(`schedules/${id}`)
}

export { getByRestaurant, create, update, remove }
