import axios from "axios";

let running = false;

const interval = 60 * 1000;

const getRelease = async () => {
  running = true;
  await axios.get("/release.json").then(
    ({ data }) => {
      if (data && data.buildId) {
        setTimeout(() => {
          postMessage(data.buildId);
        }, interval);
      }
    },
    () => {}
  );
  setTimeout(getRelease, interval);
};
onmessage = ({ data }) => {
  if (data === "getRelease" && !running) {
    getRelease();
  }
};

export default getRelease;
