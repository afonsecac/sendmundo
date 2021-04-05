import {
  SET_LOADING,
  GET_CONTACTS,
  GET_CONTACTS_FAIL,
  LOADING_DELETE_CONTACT,
  CONTACT_DELETE,
  CONTACT_DELETE_FAIL,
  SELECT_CONTACT,
  LOADING_UPDATE_CONTACT,
  UPDATE_CONTACT,
  UPDATE_CONTACT_FAIL,
  LOADING_CREATE_CONTACT,
  CREATE_CONTACT,
  CREATE_CONTACT_FAIL,
  CLEAR_SELECTED_CONTACT,
  SET_FILTERS,
  CLEAR_FILTERS,
} from "context/contacts/types";

export default function ContactsReducer(state, action) {
  const { payload, type, event } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loadingContacts: payload,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loadingContacts: false,
      };
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        loadingContacts: false,
      };
    case LOADING_DELETE_CONTACT:
      return {
        ...state,
        loadingDeleteContact: payload,
      };
    case CONTACT_DELETE:
      return {
        ...state,
        loadingDeleteContact: false,
      };
    case CONTACT_DELETE_FAIL:
      return {
        ...state,
        loadingDeleteContact: false,
      };
    case SELECT_CONTACT:
      return {
        ...state,
        selectedContact: payload,
      };
    case LOADING_UPDATE_CONTACT:
      return {
        ...state,
        loadingUpdateContact: payload,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        loadingUpdateContact: false,
      };
    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        loadingUpdateContact: false,
      };
    case LOADING_CREATE_CONTACT:
      return {
        ...state,
        loadingCreate: payload,
      };
    case CREATE_CONTACT:
      return {
        ...state,
        loadingCreate: false,
      };
    case CREATE_CONTACT_FAIL:
      return {
        ...state,
        loadingCreate: false,
      };
    case CLEAR_SELECTED_CONTACT:
      return {
        ...state,
        selectedContact: {},
      };
    case SET_FILTERS:
      return {
        ...state,
        params: {
          ...state.params,
          [event]: payload,
        },
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        params: {
          limit: state.params.limit,
          page: state.params.page,
          name: "",
        },
      };

    default:
      return state;
  }
}
