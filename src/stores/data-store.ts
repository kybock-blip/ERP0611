import { create } from "zustand";
import type { Customer, Project, Schedule } from "@/lib/types";
import {
  mockCustomers,
  mockProjects,
  mockSchedules,
} from "@/lib/mock/seed";

interface DataState {
  customers: Customer[];
  projects: Project[];
  schedules: Schedule[];
  addCustomer: (customer: Omit<Customer, "id" | "createdAt" | "organizationId">) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addProject: (project: Omit<Project, "id" | "createdAt" | "organizationId">) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  addSchedule: (schedule: Omit<Schedule, "id" | "organizationId">) => void;
  updateSchedule: (id: string, data: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
}

const genId = () => crypto.randomUUID();

export const useDataStore = create<DataState>()((set) => ({
  customers: [...mockCustomers],
  projects: [...mockProjects],
  schedules: [...mockSchedules],

  addCustomer: (data) =>
    set((s) => ({
      customers: [
        { ...data, id: genId(), organizationId: "org-001", createdAt: new Date().toISOString().split("T")[0] },
        ...s.customers,
      ],
    })),

  updateCustomer: (id, data) =>
    set((s) => ({
      customers: s.customers.map((c) => (c.id === id ? { ...c, ...data } : c)),
    })),

  deleteCustomer: (id) =>
    set((s) => ({ customers: s.customers.filter((c) => c.id !== id) })),

  addProject: (data) =>
    set((s) => ({
      projects: [
        { ...data, id: genId(), organizationId: "org-001", createdAt: new Date().toISOString().split("T")[0] },
        ...s.projects,
      ],
    })),

  updateProject: (id, data) =>
    set((s) => ({
      projects: s.projects.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),

  addSchedule: (data) =>
    set((s) => ({
      schedules: [{ ...data, id: genId(), organizationId: "org-001" }, ...s.schedules],
    })),

  updateSchedule: (id, data) =>
    set((s) => ({
      schedules: s.schedules.map((sc) => (sc.id === id ? { ...sc, ...data } : sc)),
    })),

  deleteSchedule: (id) =>
    set((s) => ({ schedules: s.schedules.filter((sc) => sc.id !== id) })),
}));
