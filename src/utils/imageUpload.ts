async function base64ToImage(base64Data: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = base64Data;
  });
}

async function uploadBase64ImageToS3(base64Data: string, fileName: string) {
  try {
    const image = await base64ToImage(base64Data);
    console.log(image.src);
    const blob = await fetch(image.src).then((response) => response.blob());

    // const result = await Storage.put(fileName, blob, {
    //   contentType: "image/png", // Replace with the appropriate image type if needed
    //   level: "public", // Adjust the access level according to your requirements
    // });

    // return result.key; // The S3 object key of the uploaded image
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
}

export default uploadBase64ImageToS3;
