import axios from "axios";
const LocalURL = "";

/* eslint-disable import/no-anonymous-default-export */
export default {
  url: LocalURL,
  headers(fileupload = false) {
    const token = localStorage.getItem("token");

    let header = {};
  
    if (fileupload) {
      header["Content-type"] = "multipart/form-data";
      header["Accept"] = "application/json";
    } else {
      header["Content-type"] = "application/json";
      header["Accept"] = "application/json";
      header["Access-Control-Allow-Origin"] = "*";
      
    }
    if (token && token !== undefined) {
      header["Authorization"]='Bearer ' + token
    }
    return header;
  },

  
  
};
