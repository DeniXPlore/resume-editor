declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: Record<string, string | number | boolean>;
    jsPDF?: { unit?: string; format?: string | number[]; orientation?: string };
  }

  interface Html2Pdf {
    from: (element: HTMLElement | string) => {
      set: (options: Html2PdfOptions) => Html2Pdf;
      save: (filename?: string) => void;
      outputPdf: () => Promise<Blob>;
    };
  }

  const html2pdf: Html2Pdf & (() => Html2Pdf);
  export default html2pdf;
}
