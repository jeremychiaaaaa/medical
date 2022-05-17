import { SET_USER_CLICK_TRAVEL_HUB,SET_USER_DOC, SET_USER_APPOINTMENT_TYPE, SET_USER_COUNTRY,SET_USER_APPOINTMENT, SET_USER_DOCUMENT_TYPE, SET_USER_OBJECT, SET_USER_POR, SET_USER_UID, SET_USER_USERNAME, SET_USER_DOB,SET_USER_GENDER } from "./actions";


const initialState = {
    user:'',
    uid:'',
username:'',
    country:'',
    POR:'',
    doc:'',
    dob:'',
    gender:'',
    appt:'',
    travel:'',
    d:'',
    types:[]
}

export default function userReducer(state=initialState, action){
    switch(action.type){
        case SET_USER_OBJECT:
            return{...state, user:action.payload}
        case SET_USER_UID:
            return{...state, uid:action.payload}
        case SET_USER_USERNAME:
            return{...state, username:action.payload}
        case SET_USER_COUNTRY:
            return{...state, country: action.payload}
        case SET_USER_POR:
            return{...state, POR:action.payload}
            case SET_USER_DOCUMENT_TYPE:
                return{...state, doc:action.payload}
                case SET_USER_DOB:
                    return{...state, dob:action.payload}
                    case SET_USER_GENDER:
                        return{...state, gender:action.payload}
                        case SET_USER_APPOINTMENT:
                        return{...state, appt:action.payload}
                        case SET_USER_CLICK_TRAVEL_HUB:
                            return{...state, travel:action.payload}
                            case SET_USER_DOC:
                                return{...state, d:action.payload}
                            case SET_USER_APPOINTMENT_TYPE:
                                return{
                                    ...state, types:[...state.types,action.payload]
                                }
        default:
            return state
    }
}