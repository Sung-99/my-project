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
        img.onload = async () => {
            // Load models
            await models();

            // Detect faces using the img element
            const fullFaceDescriptions = await faceapi.detectAllFaces(img, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptors();

            // Check if any faces were detected
            if (fullFaceDescriptions.length > 0) {
                // Set canvas size
                overlay.width = img.width;
                overlay.height = img.height;

                // Clear previous drawings
                const ctx = overlay.getContext('2d');
                ctx.clearRect(0, 0, overlay.width, overlay.height);
                const resizedDetections = faceapi.resizeResults(fullFaceDescriptions, {
                width: img.width,
                height: img.height
            });

                // Draw detections
                faceapi.draw.drawDetections(overlay, resizedDetections);
            } else {
                console.log('No faces detected.');
            }
        };
    }
});
      







        
