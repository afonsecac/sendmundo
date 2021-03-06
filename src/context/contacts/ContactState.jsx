import React, { useReducer, useMemo, useCallback } from "react";
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
import { useSnackbar } from "notistack";
import ContactReducer from "context/contacts/ContactReducer";
import ContactContext from "context/contacts/ContactContext";
import axios from "axios-or";

export default function ContactState({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  const initialState = useMemo(
    () => ({
      loadingContacts: false,
      contacts: [],
      loadingDeleteContact: false,
      selectedContact: {},
      params: {
        limit: 4,
        page: 1,
        name: "",
      },
      loadingUpdateContact: false,
      loadingCreate: false,
    }),
    []
  );

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const getContacts = useCallback(async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const resp = await axios.get("/contact", {
        params: state.params,
      });
      console.log(state.params);
      dispatch({ type: GET_CONTACTS, payload: resp.data });
    } catch (error) {
      dispatch({ type: GET_CONTACTS_FAIL });
      enqueueSnackbar("Ops algo ha ido mal :(", {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, state.params]);

  const deleteContact = useCallback(
    async (contact, handleClose, params) => {
      try {
        dispatch({ type: LOADING_DELETE_CONTACT, payload: true });
        await axios.delete(`/contact/${contact.id}`);
        dispatch({ type: CONTACT_DELETE });
        getContacts(state.params);
        handleClose();
        enqueueSnackbar(
          `El contacto ${contact.name} fue eliminado correctamente`,
          {
            variant: "success",
          }
        );
      } catch (error) {
        dispatch({ type: CONTACT_DELETE_FAIL });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, getContacts, state.params]
  );

  const selectContact = (contact) => {
    dispatch({ type: SELECT_CONTACT, payload: contact });
  };

  const updateContact = useCallback(
    async (contact, payload, resetForm) => {
      try {
        dispatch({ type: LOADING_UPDATE_CONTACT, payload: true });
        await axios.put(`/contact/${contact.id}`, payload);
        dispatch({ type: UPDATE_CONTACT });
        dispatch({ type: CLEAR_SELECTED_CONTACT });
        resetForm();
        enqueueSnackbar(
          `El contacto ${contact.name} fue actualizado correctamente`,
          {
            variant: "success",
          }
        );
        getContacts(state.params);
      } catch (error) {
        dispatch({ type: UPDATE_CONTACT_FAIL });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, getContacts, state.params]
  );

  const createContact = useCallback(
    async (payload, resetForm) => {
      try {
        dispatch({ type: LOADING_CREATE_CONTACT, payload: true });
        await axios.post("/contact", payload);
        dispatch({ type: CREATE_CONTACT });
        if (resetForm) resetForm();
        enqueueSnackbar(`El contacto fue creado correctamente`, {
          variant: "success",
        });
        getContacts(state.params);
      } catch (error) {
        dispatch({ type: CREATE_CONTACT_FAIL });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, getContacts, state.params]
  );

  const clearSelectedContact = useCallback(() => {
    dispatch({ type: CLEAR_SELECTED_CONTACT });
  }, []);

  const handlePageChange = useCallback((event, newPage) => {
    dispatch({ type: SET_FILTERS, payload: newPage + 1, event: "page" });
  }, []);

  const handleParamsChange = useCallback((event) => {
    const { name, value } = event.target;
    dispatch({ type: SET_FILTERS, payload: value, event: name });
  }, []);

  const handleClearParamsChange = useCallback((event) => {
    dispatch({ type: CLEAR_FILTERS });
  }, []);

  return (
    <ContactContext.Provider
      value={{
        loadingContacts: state.loadingContacts,
        loadingDeleteContact: state.loadingDeleteContact,
        contacts: state.contacts,
        selectedContact: state.selectedContact,
        loadingUpdateContact: state.loadingUpdateContact,
        loadingCreate: state.loadingCreate,
        params: state.params,
        getContacts,
        deleteContact,
        selectContact,
        updateContact,
        createContact,
        clearSelectedContact,
        handlePageChange,
        handleParamsChange,
        handleClearParamsChange,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}
