import React, { ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useCountries, useToggle } from "./hooks/useCounties";

function App() {
  const { countries, mapUser, onFilter } = useCountries();
  const { sets, toggle } = useToggle();

  function onChange(v: ChangeEvent<HTMLSelectElement>) {
    onFilter(v.target.value);
  }
  return (
    <div className="App">
      <div style={{ display: "flex", margin: "20px 0", gap: "20px" }}>
        <div>Filter By Gender</div>
        <select onChange={onChange}>
          <option value={"all"}>all</option>
          <option value={"male"}>male</option>
          <option value={"female"}>female</option>
        </select>
      </div>
      <div className="list">
        {countries.map((contry) => (
          <>
            <div onClick={() => toggle(contry)}>
              {contry} - {mapUser[contry]?.length} users
            </div>
            <ul
              style={{
                height: !!sets[contry] ? "auto" : "0px",
              }}
              key={contry}
              className="list-country"
            >
              {mapUser[contry]?.map((user) => (
                <li className="list-user">
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {user.name.title} {user.name.first} {user.name.last}
                  </div>
                  <div>gender: {user.gender}</div>
                  <div>city: {user.location.city}</div>
                  <div>state: {user.location.state}</div>
                  <div>registered: {user.registered.date}</div>
                </li>
              ))}
            </ul>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
