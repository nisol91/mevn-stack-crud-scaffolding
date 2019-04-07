import Api from '@/services/Api'

export default {
  getToDos () {
    return Api().get('todo')
  },
  addTodo (todo) {
    return Api().push('addTodo', {
      todo: todo // add our data to the request body
    })
  },
  deleteTodo (todoID) {
    return Api().post('deleteTodo', {
      todoID: todoID // add our data to the request body
    })
  }
}
