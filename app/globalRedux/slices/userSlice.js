import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_id: '',
        user_email: '',
        first_name: '',
        last_name: '',
        agency: '',
        phone_number: Number,
        },
    reducers: {
        setUserId: (state, action) => {state.user_id = action.payload},
        setEmail: (state, action) => { state.user_email = action.payload },
        setFirstName:( state, action ) => {state.first_name = action.payload},
        setLastName: ( state, action ) => { state.last_name = action.payload},
        setAgency: ( state, action ) => { state.agency = action.payload},
        setPhoneNumber: ( state, action ) => { state.phone_number = action.payload },
        logoutUser: (state) => {state.user_id = '', state.user_email = '', state.first_name = '', state.last_name = '',state.agency = '', state.phone_number = ''},
    }
});

export const { setUserId, setEmail, setFirstName, setLastName, setAgency, setPhoneNumber, logoutUser } = userSlice.actions;

export default userSlice.reducer;