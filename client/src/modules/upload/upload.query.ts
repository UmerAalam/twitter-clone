import { client } from "../../lib/client";

export const uploadImageToS3 = async (file: File) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const res = await client.api.upload.$get(
      {
        query: { fileName: file.name, contentType: file.type },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API request failed: ${errorText}`);
    }

    const { uploadUrl, fileUrl } = await res.json();
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error("Upload failed");
    }

    return fileUrl;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
