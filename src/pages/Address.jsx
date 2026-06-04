import { useEffect, useState } from "react";

import {
  getAddresses,
  createAddress,
  setDefaultAddress
} from "../services/addressService";

import { toast } from "react-toastify";

import "./Address.css";

import { State, City } from "country-state-city";

function Address() {

  const states = State.getStatesOfCountry("IN");

  const [selectedStateCode, setSelectedStateCode] = useState("");
  const cities = selectedStateCode
    ? City.getCitiesOfState("IN", selectedStateCode)
    : [];
  const [addresses, setAddresses] =
    useState([]);

  const [formData, setFormData] =
    useState({

      fullName: "",

      mobile: "",

      address: "",

      city: "",

      state: "",

      pincode: ""

    });

  const fetchAddresses =
    async () => {

      try {

        const response =
          await getAddresses();

        setAddresses(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchAddresses();

  }, []);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createAddress(
          formData
        );

        toast.success(
          "Address added successfully"
        );

        setFormData({

          fullName: "",

          mobile: "",

          address: "",

          city: "",

          state: "",

          pincode: ""

        });

        setSelectedStateCode("");

        fetchAddresses();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add address"
        );

      }

    };

  const handleDefault =
    async (id) => {

      try {

        await setDefaultAddress(
          id
        );

        toast.success(
          "Default address updated"
        );

        fetchAddresses();

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <div className="address-container">
      <h1>My Addresses</h1>

      <form className="address-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <select
          className="address-select"
          value={selectedStateCode}
          onChange={(e) => {
            const state = states.find((s) => s.isoCode === e.target.value);

            setSelectedStateCode(e.target.value);

            setFormData({
              ...formData,
              state: state.name,
              city: "",
            });
          }}
          required
        >
          <option value="">Select State</option>

          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>

        <select
          className="address-select"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="">Select City</option>

          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        <button type="submit" className="save-btn">
          Add Address
        </button>
      </form>

      <div className="address-list">
        {addresses.map((address) => (
          <div key={address.id} className="address-card">
            <h3>{address.fullName}</h3>

            <p>{address.mobile}</p>

            <p>{address.address}</p>

            <p>
              {address.city}, {address.state}
            </p>

            <p>{address.pincode}</p>

            {address.isDefault ? (
              <span className="default-badge">Default Address</span>
            ) : (
              <button
                className="default-btn"
                onClick={() => handleDefault(address.id)}
              >
                Set Default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

}

export default Address;