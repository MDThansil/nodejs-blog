// post thubnail preview
const thumbnail = document.querySelector('#thumbnail');
const thumbPreview = document.querySelector('#thumbPreview');

thumbnail.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    thumbPreview.classList.remove('d-none');
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (event) => {
      thumbPreview.src = event.target.result;
    };
  } else {
    console.log('Image not selected');
  }
});
