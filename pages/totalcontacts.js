import React, { useState } from "react";
import DashboardIcon from "../components/dashboard-icon";
import DeleteIcon from "../components/delete-icon";
import LogOutIcon from "../components/log-out-icon";
import NewContactIcon from "../components/new-contact-icon";
import SearchIcon from "../components/search-icon";
import {
  getAllContacts,
  getUserApi,
  logout,
  searchAPI,
  searchApi,
} from "../services/api.service";
import { useAuthStore } from "../services/store.service";
import NewContactAdd from "./newcontactadd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AsyncSelect from "react-select/async";
import { isObject } from "lodash";

export default function TotalContacts({ children, onChange, search }) {
  const [newContact, setNewContact] = useState(false);
  const router = useRouter();
  const bears = useAuthStore();
  const [allContacts, setAllContacts] = useState(null);
  const [myData, setMyData] = useState(null);

  const handleShowContact = async () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      bears.setAuthToken(authToken);
    }

    const me = await getUserApi();
    localStorage.setItem("user", JSON.stringify(me));
    setMyData(me);
    const id = me.id;
    if (id) {
      const allcontacts = await getAllContacts(id);
      setAllContacts(allcontacts);
    }
  };

  useEffect(() => {
    return () => {
      handleShowContact();
    };
  }, []);

  const handleSearchOptions = async (inputValue) => {
    console.log(inputValue, "inputvalue");
    if (inputValue.length > 1) {
      const response = await searchAPI(inputValue);
      console.log(response, "totalresponse");
      return response?.data ? response.data : response;
    }

    return [];
  };

  const [selectedContact, setSelectedContact] = useState(null);
  return (
    <>
      {children}
      <div className="total-contact">
        <div className="left-sidebar">
          <div className="logo-dashboard">
            <h1>Logo</h1>
            <span className="dashboard">
              <DashboardIcon /> Dashboard
            </span>
            <div className="total">Total contacts</div>
          </div>
          <div
            className="log-out"
            onClick={() => {
              logout();
              localStorage.clear();
              router.push("/");
            }}
          >
            <LogOutIcon /> Log out
          </div>
        </div>

        <div className="right-sidebar">
          <div className="nav-bar">
            <h1 className="title-total">Total Contacts</h1>
            <div className="search-bar" onChange={onChange}>
              <SearchIcon />
              <AsyncSelect
                isClearable={true}
                loadOptions={handleSearchOptions}
                getOptionLabel={(o) => {
                  console.log(o, "oooo");
                  return <span>{o?.name}</span>;
                }}
                onChange={(value) => {
                  {
                    setSelectedContact(value), onChange(value);
                  }
                }}
                isOptionSelected={(o) => {
                  if (isObject(o) && o.hasOwnProperty("id")) {
                    return o.id === selectedContact?.id;
                  }

                  return false;
                }}
              />

              {/* <input
                className="search"
                placeholder="Search by Email Id....."
              ></input> */}
            </div>
            <div className="user-account-logo"></div>
          </div>

          <div className="dropdown">
            {newContact ? (
              <div className="bg-gray-100 h-5/6 ">
                <NewContactAdd user={myData} />
              </div>
            ) : (
              <>
                <div className="content">
                  <div className="new-contact-wrap">
                    <button
                      className="new-contact-btn"
                      onClick={() => setNewContact(true)}
                      // onClick={() => {
                      //   router.push("/newcontactadd"), setNewContact(true);
                      // }}
                    >
                      <NewContactIcon /> New Contact
                    </button>

                    <div className="btns">
                      <button className="delete-btn">
                        <DeleteIcon /> Delete
                      </button>

                      {/* <button
                      className="contact-list"
                      onClick={() => handleShowContact()}
                    >
                      Show Contact List
                    </button> */}
                    </div>
                  </div>

                  {/* <pre>{JSON.stringify(myobj, null, 2)}</pre> */}
                </div>

                <div>
                  {allContacts &&
                    allContacts.data.map((contact) => {
                      return <li>{contact.name.toString()}</li>;
                    })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
