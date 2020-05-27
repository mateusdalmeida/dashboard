export const imgToBase64 = function(img) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
