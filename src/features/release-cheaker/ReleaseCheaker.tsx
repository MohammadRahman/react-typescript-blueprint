import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ReleaseChecker = () => {
  const [buildId, setBuildId] = useState<string | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL("./release.worker.ts", import.meta.url));

    worker.onmessage = e => {
      setBuildId(e.data); // Update the buildId state when a new buildId is received
    };

    worker.postMessage("getRelease"); // Start the worker

    return () => {
      worker.terminate(); // Clean up the worker on component unmount
    };
  }, []);

  return toast.success(`Current Build ID: {buildId}`);
};

export default ReleaseChecker;
