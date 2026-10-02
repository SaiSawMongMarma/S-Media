import { auth } from "@clerk/nextjs/server";
import { createHash } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Authentication required" }, { status: 401 });

  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) return Response.json({ error: "CLOUDINARY_URL is not configured" }, { status: 500 });

  let cloudName: string;
  let apiKey: string;
  let apiSecret: string;
  try {
    const parsed = new URL(cloudinaryUrl);
    cloudName = parsed.hostname;
    apiKey = decodeURIComponent(parsed.username);
    apiSecret = decodeURIComponent(parsed.password);
  } catch {
    return Response.json({ error: "CLOUDINARY_URL is invalid" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return Response.json({ error: "Please select an image file" }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ error: "Image must be smaller than 10 MB" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createHash("sha1").update(`timestamp=${timestamp}${apiSecret}`).digest("hex");
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", apiKey);
  uploadData.append("timestamp", timestamp);
  uploadData.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: uploadData,
  });
  const result = (await response.json()) as { secure_url?: string; error?: { message?: string } };
  if (!response.ok || !result.secure_url) {
    console.error("Cloudinary upload failed", result.error?.message || response.statusText);
    return Response.json({ error: result.error?.message || "Cloudinary upload failed" }, { status: 502 });
  }

  return Response.json({ url: result.secure_url });
}
