"use client";
import { useEffect, useState } from "react";
import styles from './PDFViewer.module.scss';
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "../loader/Loader";
import { createKey } from "@/src/lib/utils/createKey";
import downloadPdf from "@/src/lib/hooks/downloadPdf";
import clsx from "clsx";

import { browserName, isMobile } from 'react-device-detect';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function PDFViewer({file,onClose}) {

  const [pages, setPages] = useState(null);
  const [width, setWidth] = useState(0);

  function onDocumentLoadSuccess({ numPages }){
    const array = [];
    for (let index = 0; index < numPages; index++) {
      array.push(index+1)
    }
    //setNumPages(numPages);
    setPages(array);
  }
  useEffect(() => {
    const getWidth = () => {
      const windowInnerWidth = window.innerWidth
      if(windowInnerWidth > 1200){return 1000}
       else if(window.innerWidth <= 1200 && window.innerWidth > 768){return window.innerWidth - 130}else {return window.innerWidth - 60}
    }

    const handleResize = () => {
      setWidth(getWidth());
    };

    setWidth(getWidth());

    window.addEventListener('resize', handleResize);
    setWidth(getWidth());
 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onLoadError = () => {
    downloadPdf(file)
    onClose()
  }
  // try {

  //   return (
  //     <Document className={clsx(styles.document)}
  //       loading={<Loader />}
  //       file={file} 
  //       onLoadError={(err)=>onLoadError(err)}
  //       onLoadSuccess={onDocumentLoadSuccess}>
  
  //         {pages && pages.map((e)=>{
  //           return (
  //             <Page
  //             loading=''
  //             key={createKey()}
  //             pageNumber={e}
  //             renderAnnotationLayer={false}
  //             renderTextLayer={false}
  //             className={styles.page}
  //             width={width}
  //           />
  //           )
  //         })
  //       }
        
          
  
  //         {/* {numPages && Array.from(new Array(numPages), (_, index) => (
  //           <Page
  //             loading=''
  //             key={createKey()}
  //             pageNumber={index + 1}
  //             renderAnnotationLayer={false}
  //             renderTextLayer={false}
  //             className={styles.page}
  //             width={width}
  //           />
  //         ))} */}
  //     </Document>
  //   );
  
  // } catch (err) {
  
  //   return <h3>Помилка ваш брузер не підтримує файли пдф {err}</h3>
  
  // }
  return (
    <div>
      <h3>{`${isMobile}`}  {`${browserName ==='MIUI'}`}     Помилка ваш {browserName} брузер не підтримує перегляд файлів PDF</h3>
      <button type="button" onClick={onLoadError}>Download PDF document</button>
      <p>або скористайтесь іншим браузером Chrome/Opera/Firefox</p>
    </div>
    )

  if(isMobile && browserName ==='MIUI'){
    return (
    <div>
      <h3>Помилка ваш {browserName} брузер не підтримує перегляд файлів PDF</h3>
      <button type="button" onClick={onLoadError}>Download PDF document</button>
      <p>або скористайтесь іншим браузером Chrome/Opera/Firefox</p>
    </div>
    )
  }


  return (
    <Document className={clsx(styles.document)}
      loading={<Loader />}
      file={file} 
      onLoadError={(err)=>onLoadError(err)}
      onLoadSuccess={onDocumentLoadSuccess}>

        {/* <Page
          //loading=''
          key={createKey()}
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          className={clsx(styles.page)}
          width={width}
        /> */}


        {pages && pages.map((e)=>{
          return (
            <Page
            loading=''
            key={createKey()}
            pageNumber={e}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={styles.page}
            width={width}
          />
          )
        })
        }
      
        

        {/* {numPages && Array.from(new Array(numPages), (_, index) => (
  //         <Page
  //           loading=''
  //           key={createKey()}
  //           pageNumber={index + 1}
  //           renderAnnotationLayer={false}
  //           renderTextLayer={false}
  //           className={styles.page}
  //           width={width}
  //         />
       ))} */}
    </Document>
);
}
