function scrollGallery(direction) {
  const track = document.getElementById('galleryTrack');
  const scrollAmount = 310;
  track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

let currentScale = 1;
let isDragging = false;
let startX = 0, startY = 0, translateX = 0, translateY = 0;

document.querySelectorAll('.gallery-card img').forEach(img => {
  img.addEventListener('click', function() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    lightbox.style.display = 'flex';
    lightboxImg.src = this.src;
    
    resetZoom();
  });
});

const lightboxImg = document.getElementById('lightboxImg');

if (lightboxImg) {
  lightboxImg.addEventListener('click', function(e) {
    e.stopPropagation(); 
    if (currentScale === 1) {
      currentScale = 2.5;
      lightboxImg.style.cursor = 'zoom-out';
    } else {
      resetZoom();
    }
    updateTransform();
  });

  lightboxImg.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      currentScale = Math.min(currentScale + 0.3, 4); 
    } else {
      currentScale = Math.max(currentScale - 0.3, 1);
    }
    if (currentScale === 1) resetZoom();
    updateTransform();
  });

  lightboxImg.addEventListener('mousedown', function(e) {
    if (currentScale > 1) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      lightboxImg.style.cursor = 'grabbing';
    }
  });

  window.addEventListener('mousemove', function(e) {
    if (isDragging && currentScale > 1) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    }
  });

  window.addEventListener('mouseup', function() {
    isDragging = false;
    if (lightboxImg && currentScale > 1) {
      lightboxImg.style.cursor = 'grab';
    }
  });
}

function updateTransform() {
  if (lightboxImg) {
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
  }
}

function resetZoom() {
  currentScale = 1;
  translateX = 0;
  translateY = 0;
  if (lightboxImg) {
    lightboxImg.style.cursor = 'zoom-in';
    updateTransform();
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    resetZoom();
  }
}