import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { storage } from "../firebase";

export const uploadFile = async (imageUpload, stateObj) => {
  if (imageUpload === null) return null;

  const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

  return await (async function () {
    const snap = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snap.ref);
    try {
      console.log(stateObj.username);
      //   console.log(url);
      axios.post("http://localhost:3333/auth/newimage/", {
        username: stateObj.username,
        url: url,
      });
      return url;
    } catch (e) {
      console.log(e);
    }
  })();
};
