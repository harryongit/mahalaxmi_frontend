"use client";

import { useState } from "react";
import { useAdmin } from "../admin-context";
import { Head, Card, Field, AddBtn } from "../admin-ui";
import { HiOutlineTrash } from "react-icons/hi";

export default function GalleryAdminPage() {
  const { s, setS } = useAdmin();
  const [url, setUrl] = useState("");

  return (
    <>
      <Head title="Gallery" sub="Add or remove photographs shown on the public gallery wall." />
      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[260px] flex-1">
            <Field label="Image URL" value={url} onChange={setUrl} />
          </div>
          <AddBtn
            onClick={() => {
              if (!url.trim()) return;
              setS((p) => ({ ...p, gallery: [url.trim(), ...p.gallery] }));
              setUrl("");
            }}
          >
            Add photo
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
              onClick={() => setS((p) => ({ ...p, gallery: p.gallery.filter((_, j) => j !== i) }))}
              className="absolute right-2 top-2 grid size-9 place-items-center rounded-full glass-dark text-white opacity-0 transition-opacity group-hover:opacity-100"
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
