import React, { useState } from "react";
import DashboardIcon from "../components/dashboard-icon";
import DeleteIcon from "../components/delete-icon";
import LogOutIcon from "../components/log-out-icon";
import NewContactIcon from "../components/new-contact-icon";
import SearchIcon from "../components/search-icon";
import { getAllContacts, getUserApi, logout } from "../services/api.service";
import { useAuthStore } from "../services/store.service";
import NewContactAdd from "./newcontactadd";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TotalContacts() {
  const [newContact, setNewContact] = useState(false);
  const router = useRouter();
  const bears = useAuthStore();
  const [allContacts, setAllContacts] = useState(null);
  const [myData, setMyData] = useState(null)

  const handleShowContact = async () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      bears.setAuthToken(authToken);
    }

    const me = await getUserApi();
    localStorage.setItem("user", JSON.stringify(me));
    setMyData(me)
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

  return (
    <>
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
            <div className="search-bar">
              <SearchIcon />
              <input
                className="search"
                placeholder="Search by Email Id....."
              ></input>
            </div>
            <div className="user-account-logo"></div>
          </div>

          {newContact ? (
            <div className="bg-gray-100 h-5/6 ">
              <NewContactAdd user={myData}/>
            </div>
          ) : (
            <>
              <div className="content">
                <div className="new-contact-wrap">
                  <button
                    className="new-contact-btn"
                    onClick={() => setNewContact(true)}
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
    </>
  );
}
