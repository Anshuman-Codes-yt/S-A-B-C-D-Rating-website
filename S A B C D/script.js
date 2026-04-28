const imageLoader = document.getElementById('imageLoader');
const pool = document.getElementById('pool');
const dropZones = document.querySelectorAll('.drop-zone, .image-pool');

// 1. Handle File Imports
imageLoader.addEventListener('change', function(e) {
    const files = e.target.files;
    
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.classList.add('draggable-img');
            img.draggable = true;
            
            // Add Drag Start Event
            img.addEventListener('dragstart', (e) => {
                img.classList.add('dragging');
            });

            img.addEventListener('dragend', () => {
                img.classList.remove('dragging');
            });

            pool.appendChild(img);
        }
        reader.readAsDataURL(files[i]);
    }
});

// 2. Handle Drop Logic
dropZones.forEach(zone => {
    zone.addEventListener('dragover', e => {
        e.preventDefault(); // Necessary to allow a drop
    });

    zone.addEventListener('drop', e => {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        if (draggingItem) {
            zone.appendChild(draggingItem);
        }
    });
});