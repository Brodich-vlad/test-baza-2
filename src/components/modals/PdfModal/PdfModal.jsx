import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/src/components/shared/PdfViewer/PdfViewer"), {
  ssr: false
});

export default function PdfModal() {
  return (
  <div>
    <PDFViewer/>
  </div>)
}