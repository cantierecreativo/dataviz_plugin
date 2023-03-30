import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { defaultConfig } from "./constants";
import { MatrixType } from "../sharedTypes";

let store = (set: any) => ({
  data: 0,
  chart: null,
  config: defaultConfig,
  rawData: null,
  setConfig: (value: object) => set(() => ({ config: value })),
  setChart: (value: string) => set(() => ({ chart: value })),
  setRawData: (value: any) => set(() => ({ rawData: value })),
  setData: (value: MatrixType) => set(() => ({ data: value })),
  setAll: (value: any) =>
    set(() => ({
      chart: value.chart,
      config: value.config,
      data: value.data,
    })),
});

const useStoreState = create(
  devtools(store, { name: "MyStore", trace: false })
);
export default useStoreState;
