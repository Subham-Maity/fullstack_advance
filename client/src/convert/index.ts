/** image onto base64 */
/**
this code allows a user to upload a file, converts the file to a Base64 string,
and stores the Base64 string in the state for further use in the application.
This can be useful in scenarios where you need to send the file to a server
as a string instead of a file, or when you want to display the uploaded file
(if it’s an image) directly from the Base64 string.
*/

export default function convertToBase64(file: Blob) {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
