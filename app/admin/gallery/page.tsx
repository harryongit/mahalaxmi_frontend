"use client";

import { useState } from "react";
import { useAdmin } from "../admin-context";
import { Head, Card, Field, AddBtn } from "../admin-ui";
import { HiOutlineTrash } from "react-icons/hi";

import { contentApi, adminContentApi } from "@/src/lib/api";

export default function GalleryAdminPage() {
  const { s, setS } = useAdmin();
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const addPhoto = async () => {
    if (!url.trim()) return;
    const finalUrl = url.trim();
    setSaving(true);
    try {
      await adminContentApi.createGalleryImage({ url: finalUrl });
      setS((p) => ({ ...p, gallery: [finalUrl, ...p.gallery] }));
      setUrl("");
    } catch (e) {
      alert("Failed to add image to backend.");
    } finally {
      setSaving(false);
    }
  };

  const removePhoto = async (src: string, index: number) => {
    try {
      const allImages = await contentApi.getGallery();
      const match = allImages.find((img: any) => img.url === src);
      if (match && match.id) {
        await adminContentApi.deleteGalleryImage(match.id);
      }
    } catch(e) {
      console.error("Failed to delete from backend", e);
    }
    setS((p) => ({ ...p, gallery: p.gallery.filter((_, j) => j !== index) }));
  };

  return (
    <>
      <Head title="Gallery" sub="Add or remove photographs shown on the public gallery wall." />
      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[260px] flex-1">
            <Field label="Image URL" value={url} onChange={setUrl} />
          </div>
          <AddBtn onClick={addPhoto}>
            {saving ? "Saving..." : "Add photo"}
          </AddBtn>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {s.gallery.map((src, i) => (
          <div
            key={src + i}
            className="group relative overflow-hidden rounded-2xl border border-border"
          >
            <img
              src={src}
              alt={`Gallery item ${i + 1}`}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <button
              onClick={() => removePhoto(src, i)}
              className="absolute right-2 top-2 grid size-9 place-items-center rounded-full glass-dark text-white opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
              aria-label={`Remove image ${i + 1}`}
            >
              <HiOutlineTrash />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
