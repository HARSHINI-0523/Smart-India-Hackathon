document.querySelectorAll('.faq-button').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        answer.classList.toggle('visible');
    });
});

function uploadFromGallery(fileName) {
    if (!currentUser) {
        alert('Please login first to upload files.');
        return;
    }

    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    if (!uploadedFiles.includes(fileName)) {
        uploadedFiles.push(fileName);
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
        addUploadedFileToCurrentUser(fileName); 
        alert('File uploaded to your portal successfully!');
    } else {
        alert('This file is already uploaded.');
    }
}

function loadCertificates() {
    const certificatesList = document.getElementById('certificates-list');
    certificatesList.innerHTML = '';
    if (currentUser && currentUser.certificates) {
        for (const folderName in currentUser.certificates) {
            const folderItem = document.createElement('li');
            folderItem.innerHTML = `<strong>Folder: ${folderName}</strong>`;
            certificatesList.appendChild(folderItem);
            
            currentUser.certificates[folderName].forEach((cert, index) => {
                const certItem = document.createElement('li');
                certItem.innerHTML = `
                    ${cert.name}: 
                    <a href="${cert.filePath}" target="_blank">View</a> 
                    | <a href="${cert.filePath}" download>Download</a> 
                    | <button onclick="deleteCertificate('${folderName}', ${index})">Delete</button>`;
                certificatesList.appendChild(certItem);
            });
        }
    }
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    currentUser = users.find(user => user.email === email && user.password === password);
    if (currentUser) {
 
        loadCertificates();
        document.querySelector('.auth-section').style.display = 'none';
        document.getElementById('upload-section').style.display = 'block';
        document.getElementById('logout').style.display = 'inline-block';
    } else {
        alert('Invalid credentials.');
    }
});
