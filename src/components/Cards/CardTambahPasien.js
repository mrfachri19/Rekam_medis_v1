import React, { useState } from "react";
import PropTypes from "prop-types";
import { addPasien } from "../../api";
import { useHistory } from "react-router-dom";
import { Messaege } from "../../helper/helper";
import Select from "react-dropdown-select";
export default function CardTable({ color }) {
  const [namaPasien, setnamaPasien] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [td, setTd] = useState("");
  const [diagnosa, setDiagnosa] = useState("");
  const [bagian, setbagian] = useState("");
  const [succes, setSuccsess] = useState(false);
  const history = useHistory();

  const gender = ["Pria", "Wanita"];
  const items = gender?.map((item) => {
    const data = {};
    data.label = item;
    data.value = item;
    return data;
  });

  const TambahPasien = async (e) => {
    if (
      namaPasien === "" ||
      jenisKelamin === "" ||
      umur === "" ||
      alamat === "" ||
      td === "" ||
      diagnosa === "" ||
      bagian === ""
    ) {
      Messaege("Failed", `please filled data complately`, "error");
    } else {
      try {
        e.preventDefault();
        const response = await addPasien({
          kode_rm: "KPAS" + "-" + generateString(5),
          nama_pasien: namaPasien,
          jenis_kelamin: jenisKelamin.value,
          umur: umur,
          alamat: alamat,
          td: td,
          diagnosa: diagnosa,
          bagian: bagian,
        });
        localStorage.setItem("idPasienRegis", response.data.data.id);
        Messaege("Succes", "Success add data", "success");
        setSuccsess(true);
      } catch (error) {
        Messaege("Failed", `${error}`, "error");
      }
    }
  };

  function generateString(length) {
    const result = Math.random()
      .toString(36)
      .substring(2, length + 2);
    return result;
  }

  const next = () => {
    history.push("/admin/datapasien");
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 text-white")
        }
      >
        <div className=" mb-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-slate-700" : "text-white")
              }
            >
              Tambah pasien
            </h3>
          </div>
          {succes ? (
            <div className="block mb-4">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                Username pasien: {localStorage.getItem("idPasienRegis")}
              </h3>
              <p className="font-semibold text-base text-slate-500">
                <span className="text-red-700">*</span>Silahkan Register dengan
                username pasien
              </p>
            </div>
          ) : (
            <></>
          )}

          <button
            className="mt-4 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-auto"
            type="button"
            onClick={next}
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-10 bg-slate-700">
        <form className="mt-9">
          <div className="flex flex-wrap pt-10">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="nama"
                >
                  Nama
                </label>
                <input
                  id="nama"
                  type="nama"
                  placeholder="nama"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  onChange={(e) => setnamaPasien(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="jeniskelamin"
                >
                  Jenis Kelamin
                </label>
                <Select
                  placeholder="Select gender"
                  className="bg-white text-slate-600 font-normal text-sm"
                  options={items}
                  hideSelectedOptions={false}
                  onChange={(selected) => setJenisKelamin(selected[0])}
                />
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="td"
                >
                  TB
                </label>
                <input
                  id="td"
                  type="text"
                  placeholder="Tinggi/Berat"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  onChange={(e) => setTd(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="umur"
                >
                  Umur
                </label>
                <input
                  id="umur"
                  type="text"
                  placeholder="umur"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  onChange={(e) => setUmur(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="alamat"
                >
                  Alamat
                </label>
                <input
                  id="alamat"
                  type="text"
                  placeholder="alamat"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="Diagnosa"
                >
                  Diagnosa
                </label>
                <input
                  id="diagnosa"
                  type="email"
                  placeholder="Diagnosa"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  onChange={(e) => setDiagnosa(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="bagian"
                >
                  Bagian
                </label>
                <input
                  id="bagian"
                  type="text"
                  placeholder="bagian"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  onChange={(e) => setbagian(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            className="mt-5 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-auto"
            type="button"
            onClick={TambahPasien}
          >
            Tambah
          </button>
        </form>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
