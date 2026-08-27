"use client";

import { useState } from "react";
import { useAdmin, uid } from "../admin-context";
import { Head, Card, Field, AddBtn, DelBtn, upd, del } from "../admin-ui";
import { adminContentApi } from "@/src/lib/api";
import { Loader2, Plus, Trash2, Edit, Image as ImageIcon, UploadCloud } from "lucide-react";
import { useRef } from "react";

function ImageUploader({ value, onChange, placeholder }: any) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await adminContentApi.uploadImage(file);
      onChange(res.url);
    } catch (err) {
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Image URL or Upload..."}
        className="flex-1 px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500"
      />
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className="shrink-0 px-3 py-2 rounded-xl bg-stone-100 border border-stone-300 text-stone-600 hover:bg-stone-200 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
      >
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
      </button>
    </div>
  );
}

function ArrayEditor({ title, items, setItems, newItemTemplate, renderItem }: any) {
  return (
    <div className="border border-stone-200 rounded-xl p-4 bg-stone-50 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-stone-700 text-sm">{title}</h4>
        <button 
          onClick={() => setItems([...(items || []), newItemTemplate()])} 
          type="button" 
          className="text-amber-700 hover:text-amber-900 flex items-center gap-1 text-[11px] font-bold bg-amber-100 px-2 py-1 rounded cursor-pointer"
        >
          <Plus className="size-3" /> Add Item
        </button>
      </div>
      <div className="space-y-3">
        {(items || []).map((item: any, i: number) => (
          <div key={i} className="flex gap-2 items-start bg-white p-3 rounded-lg border border-stone-200">
            <div className="flex-1 space-y-2">
              {renderItem(item, (updatedItem: any) => {
                const newItems = [...items];
                newItems[i] = updatedItem;
                setItems(newItems);
              })}
            </div>
            <button 
              onClick={() => setItems(items.filter((_: any, idx: number) => idx !== i))}
              type="button" 
              className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceModal({ service, onClose, onSave }: any) {
  const [data, setData] = useState<any>({
    title: "", subtitle: "", price: 551, time: "", deity: "", image: "",
    description: "", tag: "", icon: "", benefits: [], process: [], gallery: [],
    reviews: [], faqs: [], is_active: true, slug: "", category_id: 1, ...service
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(data);
      onClose();
    } catch (e) {
      alert("Failed to save service.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-serif text-xl font-bold text-amber-950">
            {service?.id ? "Edit Puja Seva" : "Add New Puja Seva"}
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 font-bold text-sm">Close ✕</button>
        </div>
        
        <div className="p-6 space-y-6 text-xs">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Slug *</label>
              <input type="text" required value={data.slug} onChange={e => setData({...data, slug: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500" placeholder="lakshmi-puja" />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Title *</label>
              <input type="text" required value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Dakshina Amount (₹) *</label>
              <input type="number" required value={data.price} onChange={e => setData({...data, price: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Subtitle</label>
              <input type="text" value={data.subtitle || ""} onChange={e => setData({...data, subtitle: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Schedule / Time</label>
              <input type="text" value={data.time || ""} onChange={e => setData({...data, time: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Main Image</label>
              <ImageUploader 
                value={data.image} 
                onChange={(url: string) => setData({...data, image: url})} 
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Deity</label>
              <input type="text" value={data.deity || ""} onChange={e => setData({...data, deity: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Category ID</label>
              <input type="number" value={data.category_id} onChange={e => setData({...data, category_id: parseInt(e.target.value) || 1})} className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Overview Description</label>
            <textarea rows={3} value={data.description || ""} onChange={e => setData({...data, description: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500" />
          </div>

          {/* Dynamic Arrays */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ArrayEditor 
              title="Benefits" 
              items={data.benefits} 
              setItems={(b: any) => setData({...data, benefits: b})}
              newItemTemplate={() => ({ title: "", desc: "" })}
              renderItem={(item: any, updateItem: any) => (
                <>
                  <input type="text" placeholder="Benefit Title" value={item.title} onChange={e => updateItem({...item, title: e.target.value})} className="w-full px-2 py-1 border rounded" />
                  <textarea placeholder="Description" rows={2} value={item.desc} onChange={e => updateItem({...item, desc: e.target.value})} className="w-full px-2 py-1 border rounded mt-1" />
                </>
              )}
            />

            <ArrayEditor 
              title="Ritual Process Steps" 
              items={data.process} 
              setItems={(p: any) => setData({...data, process: p})}
              newItemTemplate={() => ({ step: (data.process?.length || 0) + 1, title: "", desc: "" })}
              renderItem={(item: any, updateItem: any) => (
                <>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Step" value={item.step} onChange={e => updateItem({...item, step: parseInt(e.target.value) || 1})} className="w-16 px-2 py-1 border rounded" />
                    <input type="text" placeholder="Process Title" value={item.title} onChange={e => updateItem({...item, title: e.target.value})} className="flex-1 px-2 py-1 border rounded" />
                  </div>
                  <textarea placeholder="Process Description" rows={2} value={item.desc} onChange={e => updateItem({...item, desc: e.target.value})} className="w-full px-2 py-1 border rounded mt-1" />
                </>
              )}
            />

            <ArrayEditor 
              title="FAQs" 
              items={data.faqs} 
              setItems={(f: any) => setData({...data, faqs: f})}
              newItemTemplate={() => ({ q: "", a: "" })}
              renderItem={(item: any, updateItem: any) => (
                <>
                  <input type="text" placeholder="Question" value={item.q} onChange={e => updateItem({...item, q: e.target.value})} className="w-full px-2 py-1 border rounded" />
                  <textarea placeholder="Answer" rows={2} value={item.a} onChange={e => updateItem({...item, a: e.target.value})} className="w-full px-2 py-1 border rounded mt-1" />
                </>
              )}
            />

            <ArrayEditor 
              title="Reviews" 
              items={data.reviews} 
              setItems={(r: any) => setData({...data, reviews: r})}
              newItemTemplate={() => ({ name: "", rating: 5, text: "" })}
              renderItem={(item: any, updateItem: any) => (
                <>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Reviewer Name" value={item.name} onChange={e => updateItem({...item, name: e.target.value})} className="flex-1 px-2 py-1 border rounded" />
                    <input type="number" placeholder="Rating" value={item.rating} onChange={e => updateItem({...item, rating: parseInt(e.target.value) || 5})} className="w-16 px-2 py-1 border rounded" min={1} max={5} />
                  </div>
                  <textarea placeholder="Review Text" rows={2} value={item.text} onChange={e => updateItem({...item, text: e.target.value})} className="w-full px-2 py-1 border rounded mt-1" />
                </>
              )}
            />

            <ArrayEditor 
              title="Gallery Images" 
              items={data.gallery} 
              setItems={(g: any) => setData({...data, gallery: g})}
              newItemTemplate={() => ""}
              renderItem={(item: string, updateItem: any) => (
                <ImageUploader 
                  value={item} 
                  onChange={(url: string) => updateItem(url)} 
                />
              )}
            />
          </div>

        </div>

        <div className="sticky bottom-0 bg-white border-t border-stone-200 px-6 py-4 flex items-center justify-end gap-3 z-10">
          <button onClick={onClose} className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-600">Cancel</button>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="px-6 py-2 bg-amber-800 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-amber-900 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : "Save Puja Seva"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RitualsAdminPage() {
  const { s, setS } = useAdmin();
  const [editingService, setEditingService] = useState<any>(null);
  
  // Note: we are managing `s.services` now!
  const services = s.services || [];

  const saveService = async (serviceData: any) => {
    if (serviceData.id) {
      const updated = await adminContentApi.updateService(serviceData.id, serviceData);
      setS((p) => ({
        ...p,
        services: p.services.map((svc: any) => svc.id === updated.id ? updated : svc)
      }));
    } else {
      const created = await adminContentApi.createService(serviceData);
      setS((p) => ({
        ...p,
        services: [...(p.services || []), created]
      }));
    }
  };

  const deleteService = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this Puja Seva?")) {
      try {
        await adminContentApi.deleteService(id);
        setS((p) => ({ ...p, services: p.services.filter((svc: any) => svc.id !== id) }));
      } catch (err) {
        alert("Failed to delete service.");
      }
    }
  };

  return (
    <div className="space-y-8">
      <Head
        title="Manage Puja Sevas & Details"
        sub="Fully control Overview, Benefits, Process, Gallery, Reviews, and FAQs for each ritual dynamically."
        action={
          <AddBtn onClick={() => setEditingService({ slug: uid() })}>
            + Add New Puja Seva
          </AddBtn>
        }
      />

      {editingService && (
        <ServiceModal 
          service={editingService} 
          onClose={() => setEditingService(null)} 
          onSave={saveService} 
        />
      )}

      {/* Published Rituals & Puja Sevas List */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-stone-900">Active Puja Sevas ({services.length})</h3>

        {services.map((r: any) => (
          <Card key={r.id}>
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4 flex-1">
                <img src={r.image || "https://placehold.co/100x100"} alt="puja" className="size-12 rounded-lg object-cover border border-amber-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{r.title}</h4>
                  <p className="text-xs text-stone-500">₹{r.price} • {r.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEditingService(r)}
                  className="bg-amber-100 text-amber-900 font-bold text-[11px] px-3 py-2 rounded-xl flex items-center gap-1.5 hover:bg-amber-200 transition-colors shadow-sm cursor-pointer"
                >
                  <Edit className="size-3.5" /> Edit Details
                </button>
                <button 
                  onClick={() => deleteService(r.id)}
                  className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-xl cursor-pointer transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
