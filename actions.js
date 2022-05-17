export const SET_USER_OBJECT = 'SET_USER_OBJECT'
export const SET_USER_UID = 'SET_USER_UID'
export const SET_USER_USERNAME = 'SET_USER_USERNAME'
export const SET_USER_COUNTRY = 'SET_USER_COUNTRY'
export const SET_USER_POR = 'SET_USER_POR'
export const SET_USER_DOCUMENT_TYPE = 'SET_USER_DOCUMENT'
export const SET_USER_DOB = 'SET_USER_DOB'
export const SET_USER_GENDER = 'SET_USER_GENDER'
export const SET_USER_APPOINTMENT = 'SET_USER_APPOINTMENT'
export const SET_USER_CLICK_TRAVEL_HUB = 'SET_USER_CLICK_TRAVEL_HUB'
export const SET_USER_DOC = 'SET_USER_DOC'
export const SET_USER_APPOINTMENT_TYPE = 'SET_USER_APPOINTMENT_TYPE'
export const setUser = user => dispatch => {
    dispatch({
        type:SET_USER_OBJECT,
        payload:user
    })
}
export const setUID = uid => dispatch => {
    dispatch({
        type:SET_USER_UID,
        payload:uid
    })
}
export const setUsername = username => dispatch => {
    dispatch({
        type:SET_USER_USERNAME,
        payload:username
    })
}
export const setCountry = country => dispatch => {
    dispatch({
        type:SET_USER_COUNTRY,
        payload:country
    })
}
export const setPOR = POR => dispatch => {
    dispatch({
        type:SET_USER_POR,
        payload:POR
    })
}
export const setDoc = doc => dispatch => {
    dispatch({
        type:SET_USER_DOCUMENT_TYPE,
        payload:doc
    })
}
export const setDOB = dob => dispatch => {
    dispatch({
        type:SET_USER_DOB,
        payload:dob
    })
}

export const setGender = gender => dispatch => {
    dispatch({
        type:SET_USER_GENDER,
        payload:gender
    })
}
export const setBookAppointment = appt => dispatch => {
    dispatch({
        type:SET_USER_APPOINTMENT,
        payload:appt
    })
}
export const setTravelHub = travel => dispatch => {
    dispatch({
        type:SET_USER_CLICK_TRAVEL_HUB,
        payload:travel
    })
}
export const setUserDoc = d => dispatch => {
    dispatch({
        type:SET_USER_DOC,
        payload:d
    })
}
export const setAppointmentType = types => dispatch => {
    dispatch({
        type:SET_USER_APPOINTMENT_TYPE,
        payload:types
    })
}