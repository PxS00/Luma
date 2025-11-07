/// <reference types="vite/client" />

// Definições de tipo para VLibras
interface VLibrasWidget {
  new (baseUrl: string): void;
}

interface VLibras {
  Widget: VLibrasWidget;
}

interface Window {
  VLibras?: VLibras;
}
