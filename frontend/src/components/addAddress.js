import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Address from "../components/address"; 
import '../styles/addAddress.css';
import Profile from "./profile";

const AddAddress = ({ userId, fullName }) => {
  const [provinsiID, setProvinsiID] = useState("");
  const [provinsiName, setProvinsiName] = useState("");
  const [kabupatenID, setKabupatenID] = useState("");
  const [kabupatenName, setKabupatenName] = useState("");
  const [kecamatanID, setKecamatanID] = useState("");
  const [kecamatanName, setKecamatanName] = useState("");
  const [kelurahanID, setKelurahanID] = useState("");
  const [kelurahanName, setKelurahanName] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [kabupatens, setKabupatens] = useState([]); 
  const [kecamatans, setKecamatans] = useState([]); 
  const [kelurahans, setKelurahans] = useState([]); 

  const [detail, setDetail] = useState("");
  const [error, setError] = useState(null);
  const [showAddress, setShowAddress] = useState(true);
  const [showAddAddress, setShowAddAddress] = useState(true); 

  const handleBackClick = () => {
    setShowAddAddress(false);
    setShowAddress(false);
  };


  useEffect(() => {
    fetch(
      "https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProvinces(data);
        console.log("Data provinsi:", data);
      })
      .catch((error) => {
        console.error("Ada masalah dalam permintaan data:", error);
      });
  }, []);

  useEffect(() => {
    if (provinsiID) {
      fetch(
        `https://kanglerian.github.io/api-wilayah-indonesia/api/regencies/${provinsiID}.json`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setKabupatens(data);
          console.log("Data kabupaten:", data);
        })
        .catch((error) => {
          console.error("Ada masalah dalam permintaan data:", error);
        });
    }
  }, [provinsiID]);

  useEffect(() => {
    if (kabupatenID) {
      fetch(
        `https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${kabupatenID}.json`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setKecamatans(data);
          console.log("Data kecamatan:", data);
        })
        .catch((error) => {
          console.error("Ada masalah dalam permintaan data:", error);
        });
    }
  }, [kabupatenID]);

  useEffect(() => {
    if (kecamatanID) {
      fetch(
        `https://kanglerian.github.io/api-wilayah-indonesia/api/villages/${kecamatanID}.json`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setKelurahans(data);
          console.log("Data kelurahan:", data);
        })
        .catch((error) => {
          console.error("Ada masalah dalam permintaan data:", error);
        });
    }
  }, [kecamatanID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nama: fullName,
        kelurahan: kelurahanName,
        kecamatan: kecamatanName,
        kabupaten: kabupatenName,
        provinsi: provinsiName,
        detail,
        user: userId,
      };

      console.log("Data to send:", dataToSend);

      const response = await fetch(
        "http://localhost:3002/api/delivery-addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        setShowAddress(true);
      }
    } catch (error) {
      console.error("Failed to add address:", error);
      setError("Failed to add address. Please try again.");
    }
  };

  const handleProvinsiChange = (e) => {
    const selectedProvinceID = e.target.value;
    const selectedProvince = provinces.find(
      (province) => province.id === selectedProvinceID
    );
    setProvinsiID(selectedProvinceID);
    setProvinsiName(selectedProvince ? selectedProvince.name : "");
    console.log(
      "Provinsi dipilih:",
      selectedProvince ? selectedProvince.name : ""
    );
    console.log("Provinsi ID dipilih:", selectedProvinceID);
  };

  const handleKabupatenChange = (e) => {
    const selectedKabupatenID = e.target.value;
    const selectedKabupaten = kabupatens.find(
      (kabupaten) => kabupaten.id === selectedKabupatenID
    );
    setKabupatenID(selectedKabupatenID);
    setKabupatenName(selectedKabupaten ? selectedKabupaten.name : "");
    console.log(
      "Kabupaten dipilih:",
      selectedKabupaten ? selectedKabupaten.name : ""
    );
    console.log("Kabupaten ID dipilih:", selectedKabupatenID);
  };

  const handleKecamatanChange = (e) => {
    const selectedKecamatanID = e.target.value;
    const selectedKecamatan = kecamatans.find(
      (kecamatan) => kecamatan.id === selectedKecamatanID
    );
    setKecamatanID(selectedKecamatanID);
    setKecamatanName(selectedKecamatan ? selectedKecamatan.name : "");
    console.log(
      "Kecamatan dipilih:",
      selectedKecamatan ? selectedKecamatan.name : ""
    );
    console.log("Kecamatan ID dipilih:", selectedKecamatanID);
  };

  const handleKelurahanChange = (e) => {
    const selectedKelurahanID = e.target.value;
    const selectedKelurahan = kelurahans.find(
      (kelurahan) => kelurahan.id === selectedKelurahanID
    );
    setKelurahanID(selectedKelurahanID);
    setKelurahanName(selectedKelurahan ? selectedKelurahan.name : "");
    console.log(
      "Kelurahan dipilih:",
      selectedKelurahan ? selectedKelurahan.name : ""
    );
    console.log("Kelurahan ID dipilih:", selectedKelurahanID);
  };

  return (
    <div>
    {!showAddAddress && <Profile/> }
    {showAddAddress &&(
      <>
          <div className="address-container">
    <div className="container add-address">
      <h2 className="title">Add Address</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="provinsi">Provinsi</label>
          <select
            className="form-control"
            id="provinsi"
            value={provinsiID}
            onChange={handleProvinsiChange}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>

          <label htmlFor="kabupaten">Kabupaten</label>
          <select
            className="form-control"
            id="kabupaten"
            value={kabupatenID}
            onChange={handleKabupatenChange}
          >
            <option value="">Pilih Kabupaten</option>
            {kabupatens.map((kabupaten) => (
              <option key={kabupaten.id} value={kabupaten.id}>
                {kabupaten.name}
              </option>
            ))}
          </select>

          <label htmlFor="kecamatan">Kecamatan</label>
          <select
            className="form-control"
            id="kecamatan"
            value={kecamatanID}
            onChange={handleKecamatanChange}
          >
            <option value="">Pilih Kecamatan</option>
            {kecamatans.map((kecamatan) => (
              <option key={kecamatan.id} value={kecamatan.id}>
                {kecamatan.name}
              </option>
            ))}
          </select>

          <label htmlFor="kelurahan">Kelurahan</label>
          <select
            className="form-control"
            id="kelurahan"
            value={kelurahanID}
            onChange={handleKelurahanChange}
          >
            <option value="">Pilih Kelurahan</option>
            {kelurahans.map((kelurahan) => (
              <option key={kelurahan.id} value={kelurahan.id}>
                {kelurahan.name}
              </option>
            ))}
          </select>
          <label htmlFor="detail">Detail</label>
          <input
            type="text"
            className="form-control"
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <div className="form-group">
        </div>
        
        <button type="submit" className="btn submitAddAddress">
          Submit
        </button>
      </form>
    </div>
        
      {showAddress && <Address userId={userId} />}
     
        <button onClick={handleBackClick} className="btn back">
          Back
        </button>
    </div>
      </>
    )}
    </div>

  );
};

export default AddAddress;
