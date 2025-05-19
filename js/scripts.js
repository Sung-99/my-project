/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

 async function models( ) {
      
   const MODEL_URL = './weights'

      await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
      await faceapi.loadFaceLandmarkModel(MODEL_URL);
      await faceapi.loadFaceRecognitionModel(MODEL_URL);         
}



document.getElementById('fileid').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const img = document.getElementById('preview');
    const overlay = document.getElementById('overlay');
  
    if (file) {
        img.src = URL.createObjectURL(file);
         
        var reader = new FileReader();
       
        img.onload = async () => {
           
        
            var ctx = overlay.getContext('2d');
            overlay.width = img.width;
            overlay.height = img.height;
            ctx.drawImage(img, 0, 0);
               


            // Load models
            await models();

            // Detect faces
            let fullFaceDescriptions = await faceapi.detectAllFaces(file).withFaceLandmarks().withFaceDescriptors()
            fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions)      
            // Set canvas size
            overlay.width = img.width;
            overlay.height = img.height;
           

            // Draw detections
           faceapi.draw.drawDetections(overlay, fullFaceDescriptions)
        };
    }
});
      







        
