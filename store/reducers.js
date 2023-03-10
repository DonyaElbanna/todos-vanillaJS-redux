// Reducer function
function todosReducer(state=[], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo :
                Object.assign({}, todo, {complete: !todo.complete}));
        default:
            return state;
    }
}

function goalsReducer (state=[], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id);
        default:
            return state;
    }
}