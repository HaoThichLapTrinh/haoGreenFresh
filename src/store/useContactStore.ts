import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  reply?: string;
}

interface ContactStore {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, "id" | "reply">) => void;
  addReply: (id: number, reply: string) => void;
  deleteContact: (id: number) => void;
}

// ✅ Thêm persist để lưu vào localStorage
export const useContactStore = create<ContactStore>()(
  persist(
    (set) => ({
      contacts: [],
      addContact: (contact) =>
        set((state) => ({
          contacts: [
            ...state.contacts,
            { ...contact, id: Date.now(), reply: "" },
          ],
        })),
      addReply: (id, reply) =>
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === id ? { ...c, reply } : c
          ),
        })),
      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
        })),
    }),
    { name: "contact-storage" } // 👈 lưu vào localStorage key "contact-storage"
  )
);
