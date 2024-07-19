import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
    employees: []
};

// Create a slice of the store
const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees(state, action) {
            state.employees = action.payload;
        },
        addEmployee(state, action) {
            state.employees.push(action.payload);
        }
    }
});

// Extract the action creators and reducer
export const { setEmployees, addEmployee } = employeeSlice.actions;
const employeeReducer = employeeSlice.reducer;

// Configure the store
const store = configureStore({
    reducer: {
        employees: employeeReducer
    }
});

export default store;
