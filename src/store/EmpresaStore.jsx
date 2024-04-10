import { create } from "zustand";
import { MostrarEmpresa, supabase } from "../index";


export const useEmpresaStore = create((set, get) => ({
    dataempresa:[],
    mostrarEmpresa: async(p)=>{
        const response = await MostrarEmpresa(p);
        set({dataempresa: response });
        return response;
    },
}));