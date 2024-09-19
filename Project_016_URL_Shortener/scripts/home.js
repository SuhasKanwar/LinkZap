const modalDialog = document.querySelector("#share-dialog-box");
const closeButton = document.querySelector(".close-button");
const copyButton = document.querySelector(".copy-button");
const redirectButton = document.querySelector(".redirect-button");

function showUrlDetails(shortId) {
    const shortUrl = `http://localhost:5000/url/${shortId}`;
    document.querySelector("#copy-link-input").value = shortUrl;
    
    fetch(`/url/analytics/${shortId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("originalUrl").textContent = data.redirectURL;
            document.getElementById("clicks").textContent = data.totalClicks;
            document.getElementById("url-details").style.display = "block";
            modalDialog.showModal();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch URL details');
        });
}

function copyUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert("URL copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

closeButton.addEventListener("click", () => {
    modalDialog.close();
});

copyButton.addEventListener("click", () => {
    const copyInput = document.querySelector("#copy-link-input");
    copyUrl(copyInput.value);
    copyButton.textContent = "Copied!";
    setTimeout(() => {
        copyButton.textContent = "Copy";
    }, 2000);
});

redirectButton.addEventListener("click", () => {
    const url = document.querySelector("#copy-link-input").value;
    window.open(url, '_blank');
});

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const newId = urlParams.get('id');
    if (newId) {
        showUrlDetails(newId);
    }
};