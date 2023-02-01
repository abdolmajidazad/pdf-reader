import React, { useEffect, useState } from "react";
import {  PDFDocument, rgb, StandardFonts } from "pdf-lib";
import JpgUrl from './138.jpg'
export default function App() {
  const [iframeSrc, setIframeSrc] = useState("");
  const [pdfDocData, setPdfDoc] = useState("");


  useEffect(()=>{
      Object.keys(window).forEach(key => {
          // console.log("keykeykeykey", /^on/.test(key),key)
          if (/^on/.test(key)) {
              window.addEventListener(key.slice(2), event => {
                  // console.log(key.slice(2), event);
              });
          }
      });
      var iframe = document.getElementById("pdf");
      var doc = iframe.contentDocument || iframe.contentWindow.document;
      // Object.keys(doc).forEach(key => {
      //     console.log("keykeykeykey", /^on/.test(key),key)
      //     if (/^on/.test(key)) {
      //         window.addEventListener(key.slice(2), event => {
      //             // console.log(key.slice(2), event);
      //         });
      //     }
      // });
      // console.log("docddd",doc.getElementsByTagName('html')[0])
      // var handler = function() {
      //     alert("yo!");
      // }
      // doc.getElementsByTagName('html')[0].addEventListener('click',handler);

      // let newNode = container.children[0].cloneNode(true);


  },[])
  async function createForm() {
    // const pdfDoc = await PDFDocument.create()
    const pdfDoc = pdfDocData

    // const page = pdfDoc.addPage([900, 750])
    const page = pdfDoc.getPage(0)
console.log("page===>", page, pdfDoc, pdfDoc.getPages())
    const form = pdfDoc.getForm()

    page.drawText('Enter your favorite superhero:', { x: 50, y: 700, size: 20 })

    const superheroField = form.createTextField('favorite.superhero')
    superheroField.setText('One Punch Man')
    superheroField.addToPage(page, { x: 55, y: 640 })
    //
    // page.drawText('Select your favorite rocket:', { x: 50, y: 600, size: 20 })
    //
    // page.drawText('Falcon Heavy', { x: 120, y: 560, size: 18 })
    // page.drawText('Saturn IV', { x: 120, y: 500, size: 18 })
    // page.drawText('Delta IV Heavy', { x: 340, y: 560, size: 18 })
    // page.drawText('Space Launch System', { x: 340, y: 500, size: 18 })
    //
    // const rocketField = form.createRadioGroup('favorite.rocket')
    // rocketField.addOptionToPage('Falcon Heavy', page, { x: 55, y: 540 })
    // rocketField.addOptionToPage('Saturn IV', page, { x: 55, y: 480 })
    // rocketField.addOptionToPage('Delta IV Heavy', page, { x: 275, y: 540 })
    // rocketField.addOptionToPage('Space Launch System', page, { x: 275, y: 480 })
    // rocketField.select('Saturn IV')
    //
    // page.drawText('Select your favorite gundams:', { x: 50, y: 440, size: 20 })
    //
    // page.drawText('Exia', { x: 120, y: 400, size: 18 })
    // page.drawText('Kyrios', { x: 120, y: 340, size: 18 })
    // page.drawText('Virtue', { x: 340, y: 400, size: 18 })
    // page.drawText('Dynames', { x: 340, y: 340, size: 18 })
    //
    // const exiaField = form.createCheckBox('gundam.exia')
    // const kyriosField = form.createCheckBox('gundam.kyrios')
    // const virtueField = form.createCheckBox('gundam.virtue')
    // const dynamesField = form.createCheckBox('gundam.dynames')

    // exiaField.addToPage(page, { x: 55, y: 380 })
    // kyriosField.addToPage(page, { x: 55, y: 320 })
    // virtueField.addToPage(page, { x: 275, y: 380 })
    // dynamesField.addToPage(page, { x: 275, y: 320 })
    //
    // exiaField.check()
    // dynamesField.check()

    // page.drawText('Select your favorite planet*:', { x: 50, y: 280, size: 20 })
    //
    // const planetsField = form.createDropdown('favorite.planet')
    // planetsField.addOptions(['Venus', 'Earth', 'Mars', 'Pluto'])
    // planetsField.select('Pluto')
    // planetsField.addToPage(page, { x: 55, y: 220 })
    //
    // page.drawText('Select your favorite person:', { x: 50, y: 180, size: 18 })
    //
    // const personField = form.createOptionList('favorite.person')
    // personField.addOptions([
    //   'Julius Caesar',
    //   'Ada Lovelace',
    //   'Cleopatra',
    //   'Aaron Burr',
    //   'Mark Antony',
    // ])
    // personField.select('Ada Lovelace')
    // personField.addToPage(page, { x: 55, y: 70 })
    //
    // page.drawText(`* Pluto should be a planet too!`, { x: 15, y: 15, size: 15 })
    //

    // const pdfBytes = await pdfDoc.save()
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    setIframeSrc(pdfDataUri);
  }
  async function modifyPdf() {
    // const jpgUrl = './138.jpg";
    const jpgImageBytes = await fetch(JpgUrl).then((res) => res.arrayBuffer());

    const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    setPdfDoc(pdfDoc)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    console.log("page",{ pages });
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    console.log({ width, height });
    // firstPage.drawText("This text was added with JavaScript!", {
    //   x: 5,
    //   y: height / 2 + 100,
    //   size: 10,
    //   font: helveticaFont,
    //   color: rgb(0.95, 0.1, 0.1)
    // });
    //
    // // const pdfBytes = await pdfDoc.save();
    // console.log("pdfDoc",pdfDoc)
    // const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    // // const jpgDims = jpgImage.scale(0.5);
    // console.log("jpgImage",jpgImage)
    // firstPage.drawImage(jpgImage, {
    //   x: 150,
    //   y: 300,
    //   width: 50,
    //   height: 30
    // });

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    setIframeSrc(pdfDataUri);
  }

  useEffect(() => {
    modifyPdf();
  }, []);

  // console.log("iframeSrc", iframeSrc)
  return (
      <div>

          <button onClick={createForm}>createForm</button>
        <iframe
            title="image-pdf"
            id="pdf"
            style={{ width: "100%", height: "100vh" }}
            src={iframeSrc}
        ></iframe>
      </div>
  );
}

