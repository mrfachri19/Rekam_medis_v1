import axios from "axios";
import CONFIG from "../config";

const fullURL = (path) => {
  return `${CONFIG.API_URL}/${path}`;
};

export const handleNetworkError = (error) => {
  if (error.message === "Network request failed") {
    alert(
      "Kesalahan Jaringan",
      "Silakan periksa koneksi Anda dan coba kembali.",
      "iconNoInet"
    );
  }
  throw error;
};

const post = (api) => async (data, token) => {
  return await axios.post(fullURL(api), data, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      // Authorization: `Bearer ${CONFIG.token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
  });
};

const patch = (api) => async (data, token) => {
  return await axios.patch(fullURL(api), data, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      // Authorization: `Bearer ${CONFIG.token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
  });
};

const get = (api) => async (param = "") => {
  try {
    return await axios(`${fullURL(api)}${param}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        // "X-Authorization": `bearer ${localStorage.getItem("acces_token")}`,
        // Authorization: `bearer ${localStorage.getItem("token_apim")}`
      }
    }, { handleNetworkError }
    );
  } catch (err) {
    console.log(err);
  }
};

// const getWithSlug = (api) => (slug, token) => {
//   return axios(
//     `${fullURL(api)}${slug}`,
//     {
//       method: "GET",
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//         // 'apikey': process.env.REACT_APP_API_KEY
//       },
//     },
//     { handleNetworkError }
//   ).catch((err) => {});
// };

// // export const socialMedia = post('social-media')
// export const getUserList = get("users");
// export const postUser = post("users");
// // export const getUserScore = getWithSlug('users')
// export const postRegisterAuth = post("users");

export const getAllPasien = get("pasien");
export const getAllDokter = get("dokter");
export const getAllAppointment = get("appointment");
export const getAppointmentByIdpasien = get("appointment");
export const getAllObat = get("obat");

// =============
export const loginAuth = post("auth/login")
export const loginPasien = post("authpasien/loginpasien")

// =============
export const addPasien = post("pasien/addPasien")
export const addDokter = post("dokter/addDokter")
export const addObat = post("obat/addObat")
export const addAppointment = post("appointment/addAppointment")
export const editAppointment = patch(`appointment/upadateAppointment/${localStorage.getItem("idappointment")}`)


const API = {
  addPasien,
  loginAuth,
  loginPasien,
  getAllPasien,
  getAllDokter,
  getAllAppointment,
  addAppointment,
  getAppointmentByIdpasien,
  getAllObat,
  addObat,
  editAppointment
};

export default API;
