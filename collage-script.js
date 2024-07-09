document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const gallery = document.getElementById('gallery');

    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const files = fileInput.files;
        const formData = new FormData();

        for (const file of files) {
            formData.append('files', file);
        }

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(filenames => {
            if (!filenames.message) { // Check if filenames is not an error message
                filenames.forEach(filename => {
                    const ext = filename.split('.').pop();
                    if (['jpeg', 'jpg', 'png', 'gif'].includes(ext)) {
                        const img = document.createElement('img');
                        img.src = `http://localhost:3000/${filename}`;
                        gallery.appendChild(img);
                    } else if (['mp4', 'mov'].includes(ext)) {
                        const video = document.createElement('video');
                        video.src = `http://localhost:3000/${filename}`;
                        video.controls = true;
                        gallery.appendChild(video);
                    }
                });
            } else {
                console.error('Upload Error:', filenames.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
