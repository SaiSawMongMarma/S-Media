"use client";

import { ChangeEvent, ReactNode, useState } from "react";

const CloudinaryUpload = ({ onUploaded, children }: { onUploaded: (url: string) => void; children: ReactNode }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Upload failed");
      onUploaded(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return <div className="flex flex-col gap-1"><label className="cursor-pointer">{uploading ? "Uploading..." : children}<input type="file" accept="image/*" className="hidden" onChange={upload} disabled={uploading} /></label>{error && <span className="text-xs text-red-500">{error}</span>}</div>;
};

export default CloudinaryUpload;
