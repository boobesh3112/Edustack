import { supabaseAdmin } from "./supabaseAdmin";

const BUCKET = "course-materials";

export async function createSignedUploadUrl(path: string) {
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUploadUrl(path);
  if (error) throw error;
  return data; // { signedUrl, path, token }
}

export function getPublicUrl(path: string) {
  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
